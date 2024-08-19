import MainNav from "./MainNav";
import StoreSwitcher from "./StoreSwitcher";
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import db from "@/lib/db";

const Navbar = async () => {

    const { userId } = auth();
    if (!userId) {
        redirect("/sign-in");
    }

    const stores = await db.store.findMany({
        where: {
            userId
        }
    })

    return ( 
        <header className="border-b border-gray-500">
            <nav className="flex h-16 items-center px-4">
                <StoreSwitcher items={stores} />
                <MainNav className="mx-6" />
                <div className="ml-auto flex items-center space-x-4">
                    <UserButton afterSwitchSessionUrl="/" />
                </div>
            </nav>
        </header>
     );
}
 
export default Navbar;