"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { CreateConcertInput, CreateConcertSchema } from "@/schemas/createConcertSchema";
import { toast } from "sonner";
import { createConcert } from "@/services/concerts";
import { Props } from "@/types/types";
import { useState } from "react";

export default function CreateConcertForm({ onCreated, setConcerts }: Props) {
  const form = useForm<CreateConcertInput>({
    resolver: zodResolver(CreateConcertSchema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      totalSeats: 500,
      description: "",
    },
  });

  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(data: CreateConcertInput) {
    setSubmitting(true);
    try {
      const created = await createConcert({
        name: data.name,
        description: data.description,
        totalSeats: data.totalSeats,
      });

      setConcerts((prev) => [...prev, created]);

      toast.success("Create Successfully");
      form.reset({ name: "", totalSeats: 500, description: "" });

      onCreated?.();
    } catch (e) {
      toast.error("Create failed");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Create</CardTitle>
      </CardHeader>
      <CardContent>
        <Separator className="mb-6" />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Concert Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Please input concert name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="totalSeats"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total of seat</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          type="number"
                          inputMode="numeric"
                          min={1}
                          step={1}
                          placeholder="500"
                          value={Number.isNaN(field.value) ? "" : field.value}
                          onChange={(e) => {
                            const v = e.target.value;
                            field.onChange(v === "" ? 0 : Number(v));
                          }}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Please input description"
                      className="min-h-[120px] resize-y"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Button type="submit" disabled={submitting} className="gap-2">
                <Save className="h-4 w-4" />
                {submitting ? "Saving..." : "Save"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
