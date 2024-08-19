"use client"

import Modal from "../ui/modal"
import { useStoreModal } from "@/hooks/UseModal"
import { useForm } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export const StoreModal = () => {

    const storeModal = useStoreModal();
    const [ loading, setLoading ] = useState(false);
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        name: "",
      }
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
          setLoading(true);

          const apiUrl = process.env.NEXT_PUBLIC_API_URL;
          if (!apiUrl) {
            throw new Error("ERRORRRRR")
          }

          const response = await axios.post( apiUrl , values);
          
          toast.success("Toko berhasil dibuat")

          window.location.assign(`/${response.data.id}`)
        } catch (error) {
          toast.error("Gagal membuat toko")
        } finally {
          setLoading(false);
        }
        
    };

  return (
    <Modal
      title="Buat Store"
      description="Tambahkan Store untuk membuat produk dan kategori"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <div>
        <div className="space-y-4 py-2 pb-4">
          <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                  <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                              <FormLabel>Name</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Nama toko"
                                  {...field}
                                  disabled={loading}
                                />
                              </FormControl>
                              <FormMessage />
                        </FormItem>
                      )}
                  />
                  <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                    <Button variant="outline" onClick={storeModal.onClose} disabled={loading}>Cancel</Button>
                    <Button type="submit" disabled={loading}>Continue</Button>
                  </div>
              </form>
          </Form>
        </div>
      </div>
    </Modal>
  )
}
