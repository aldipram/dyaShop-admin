"use client"

import { AlertModal } from "@/components/modals/AlertModal";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Heading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Store } from "@prisma/client"
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ApiAlert } from "@/components/ui/apiAlert";
import { useOrigin } from "@/hooks/UseOrigin";
import toast from "react-hot-toast";
import axios from "axios";

interface SettingsFormProps {
    initialData: Store;
}

const formSchema = z.object({
    name: z.string().min(1)
})

type SettingsFormValues = z.infer<typeof formSchema>

export const SettingsForm: React.FC<SettingsFormProps> = ({ initialData }) => {

    const [ open, setOpen ] = useState(false);
    const [ loading, setLoading ] = useState(false);
    const params = useParams();
    const router = useRouter();
    const origin = useOrigin();

     const form = useForm<SettingsFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData,
     })

     const onSubmit = async (data: SettingsFormValues) => {
        try {
            setLoading(true);
            await axios.patch(`/api/stores/${params.storeId}`, data);
            router.refresh();
            toast.success("Toko berhasil diubah")
        } catch (error) {
            toast.error("Gagal menyimpan data");
        } finally {
            setLoading(false);
        }
     }

     const onDelete = async () => {
        try {
            setLoading(true);
            await axios.delete(`/api/stores/${params.storeId}`);
            router.refresh();
            router.push("/");
            toast.success("Toko berhasil dihapus");
        } catch (error) {
            toast.error("Gagal menghapus toko");
        } finally {
            setLoading(false);
            setOpen(false);
        }
     }

  return (
    <>
        <AlertModal isOpen={open} onClose={() => setOpen(false)}  onConfirm={() => onDelete()} loading={loading} />
        <div className="flex items-center justify-between">
            <Heading
                title="Settings"    
                description="Manage your store settings."
            />
            <Button
                disabled={loading}
                variant={"destructive"}
                size="sm"
                onClick={() => setOpen(true)}
            >
                <Trash className="h-4 w-4" />
            </Button>
        </div>

        <Separator />
        
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                <div className="grid grid-cols-3 gap-8">
                    <FormField 
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Nama Toko" disabled={loading} {...field}/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <Button
                    disabled={loading}
                    type="submit"
                >
                    Save
                </Button>
            </form>
        </Form>
        <Separator />
        <ApiAlert title="PUBLIC_API_URL" description={`${origin}/api/${params.storeId}`} variant="public" />
    </>
  )
}
