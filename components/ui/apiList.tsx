"use client"

import { useOrigin } from "@/hooks/UseOrigin";
import { useParams } from "next/navigation";
import { ApiAlert } from "./apiAlert";

interface ApiListProps {
    namaIndikator: string;
    idIndikator: string;
}

export const ApiList: React.FC<ApiListProps> = ({ namaIndikator, idIndikator }) => {

    const params = useParams();
    const origin = useOrigin();

    const baseUrl = `${origin}/api/${params.storeId}`

  return (
    <>
        <ApiAlert
          title="GET"
          description={`${baseUrl}/${namaIndikator}`}
          variant="public"
        />
        <ApiAlert
          title="GET"
          description={`${baseUrl}/${namaIndikator}/{${idIndikator}}`}
          variant="public"
        />
        <ApiAlert
          title="POST"
          description={`${baseUrl}/${namaIndikator}`}
          variant="admin"
        />
        <ApiAlert
          title="PATCH"
          description={`${baseUrl}/${namaIndikator}/{${idIndikator}}`}
          variant="admin"
        />
        <ApiAlert
          title="DELETE"
          description={`${baseUrl}/${namaIndikator}/{${idIndikator}}`}
          variant="admin"
        />
    </>
  )
}
