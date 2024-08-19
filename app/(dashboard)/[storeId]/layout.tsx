import Navbar from "@/components/global/Navbar";
import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation";

const DashboardLayout = async ({ 
    children,
    params, 
} : {
    children: React.ReactNode,
    params: {storeId: string}
}) => {

    const { userId } = auth();
    if (!userId) {
        redirect("/sign-in");
    }

    const store = await db.store.findFirst({
        where: {
            id: params.storeId,
            userId
        }
    })

    if (!store) {
        redirect("/");
    }

  return (
    <>
        <Navbar />
        {children}
    </>
  )
}

export default DashboardLayout