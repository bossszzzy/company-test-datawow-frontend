"use client";
import { Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { concertDb } from "@/db/mockCardData";
import { ConcertReservedStatus } from "@/types/types";
import { useState } from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";

export default function UserComponent() {
  const fetchConcerts: ConcertReservedStatus[] = concertDb;
  const [concerts, setConcerts] =
    useState<ConcertReservedStatus[]>(fetchConcerts);

  const onAction = (c: ConcertReservedStatus) => {
    setConcerts((prev) =>
      prev.map((item) =>
        item.id === c.id ? { ...item, reserved: !item.reserved } : item
      )
    );
    toast.success(
      c.reserved
        ? `Cancel reserved ${c.name} successfully`
        : `Reserved ${c.name} successfully`
    );
  };

  return (
    <div className="p-4 md:p-8 flex flex-col gap-6">
      {concerts.map((c) => (
        <Card key={c.id} className="border">
          <CardHeader>
            <CardTitle className="text-lg text-primary">{c.name}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <p className="text-sm text-muted-foreground">{c.desc}</p>
            <div className="flex justify-between">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4" /> {c.seats}
              </div>
              <Button
                variant={c.reserved ? "destructive" : "default"}
                className={
                  c.reserved
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-blue-500 hover:bg-blue-600"
                }
                onClick={() => onAction(c)}
              >
                {c.reserved ? "Cancel" : "Reserve"}
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
