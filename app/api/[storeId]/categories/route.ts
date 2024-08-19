import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const POST = async (req: Request, { params } : {params: {storeId: string}}) => {
    try {
        const body = await req.json();
        const { userId } = auth();
        const { name, bannerId } = body;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        };
        
        if (!name) {
            return new NextResponse("Tambahkan nama category anda", { status: 400 });
        };

        if (!bannerId) {
            return new NextResponse("Tambahkan bannerId anda", { status: 400 });
        };

        if (!params.storeId) {
            return new NextResponse("Store id url dibutuhkan")
        };

        const storeByUserId = await db.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        });

        if (!storeByUserId) {
            return new NextResponse("Unauthorized", { status: 401 });
        };

        const category = await db.category.create({
            data: {
                name,
                bannerId,
                storeId: params.storeId
            }
        });

        return NextResponse.json(category);
    } catch (error) {
        console.log("[CATEGORIES_POST] ", error);
        return new NextResponse("Internal error", { status: 500 }); 
    }
}

export const GET = async (req: Request, { params } : {params: {storeId: string}}) => {
    try {

        if (!params.storeId) {
            return new NextResponse("Store id url dibutuhkan")
        };

        const categories = await db.category.findMany({
            where: {
                storeId: params.storeId,
            }
        });

        return NextResponse.json(categories);
    } catch (error) {
        console.log("[CATEGORIES_GET] ", error);
        return new NextResponse("Internal error", { status: 500 }); 
    }
}