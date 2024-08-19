"use client"

import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { Plus } from "lucide-react" 
import { useParams, useRouter } from "next/navigation"
import { columns, ProductColumn } from "./columns"
import { DataTable } from "@/components/ui/dataTable"
import { ApiList } from "@/components/ui/apiList"

interface ProductClientProps {
    data: ProductColumn[];
}

export const ProductClient: React.FC<ProductClientProps> = ({data}) => {

    const router = useRouter();
    const params = useParams();

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Product (${data.length})`}
                    description="Atur product untuk toko"
                />
                <Button onClick={() => router.push(`/${params.storeId}/products/new`)} >
                    <Plus className="mr-2 h-4 w-4" />
                    Add New
                </Button>
            </div>
            <Separator />
            <DataTable data={data} columns={columns} searchKey="name" />
            <Heading title="API" description="API untuk products" />
            <Separator />
            <ApiList namaIndikator="products" idIndikator="productId" />
        </>
    )
}