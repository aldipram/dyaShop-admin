import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
    try {
        const body = await req.json();
        const { userId } = auth();
        const { name } = body;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        
        if (!name) {
            return new NextResponse("Tambahkan nama toko anda", { status: 400 });
        }

        const store = await db.store.create({
            data: {
                name,
                userId
            }
        })

        return NextResponse.json(store);
    } catch (error) {
        console.log("[STORES_POST] ", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}