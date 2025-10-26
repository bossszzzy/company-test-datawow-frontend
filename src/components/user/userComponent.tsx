"use client";
import { Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ConcertReservedStatus } from "@/types/types";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { listConcerts } from "@/services/concerts";
import { cancelReservation, reserveConcert } from "@/services/reservations";

export default function UserComponent() {
  const [concerts, setConcerts] =
    useState<ConcertReservedStatus[]>([]);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async () => {
      try {
        const data = await listConcerts();
        setConcerts(data);
      } catch (err) {
        toast.error("Failed to load concerts");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleReserve = async (concertId: string) => {
    try {
      await reserveConcert(concertId);
      setConcerts((prev) =>
        prev.map((c) =>
          c.id === concertId ? { ...c, reserved: true } : c
        )
      );
      toast.success("Reserved successfully!");
    } catch (err) {
      toast.error("Failed to reserve");
    }
  };

  const handleCancel = async (concertId: string) => {
    try {
      await cancelReservation(concertId);
      setConcerts((prev) =>
        prev.map((c) =>
          c.id === concertId ? { ...c, reserved: false } : c
        )
      );
      toast.success("Cancelled reservation!");
    } catch (err) {
      toast.error("Failed to cancel");
    }
  };

  if (loading) {
    return <div className="p-8 text-muted-foreground">Loading concerts...</div>;
  }

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
              {c.reserved ? (
                <Button
                  variant="destructive"
                  onClick={() => handleCancel(c.id)}
                >
                  Cancel
                </Button>
              ) : (
                <Button onClick={() => handleReserve(c.id)}>
                  Reserve
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
