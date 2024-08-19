import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const POST = async (req: Request, { params } : {params: {storeId: string}}) => {
    try {
        const body = await req.json();
        const { userId } = auth();
        const { label, imageUrl } = body;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        };
        
        if (!label) {
            return new NextResponse("Tambahkan nama banner anda", { status: 400 });
        };

        if (!imageUrl) {
            return new NextResponse("Tambahkan image anda", { status: 400 });
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

        const banner = await db.banner.create({
            data: {
                label,
                imageUrl,
                storeId: params.storeId
            }
        });

        return NextResponse.json(banner);
    } catch (error) {
        console.log("[BANNERS_POST] ", error);
        return new NextResponse("Internal error", { status: 500 }); 
    }
}
export const GET = async (req: Request, { params } : {params: {storeId: string}}) => {
    try {

        if (!params.storeId) {
            return new NextResponse("Store id url dibutuhkan")
        };

        const banner = await db.banner.findMany({
            where: {
                storeId: params.storeId,
            }
        });

        return NextResponse.json(banner);
    } catch (error) {
        console.log("[BANNERS_GET] ", error);
        return new NextResponse("Internal error", { status: 500 }); 
    }
}