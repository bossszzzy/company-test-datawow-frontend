"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getHistory } from "@/services/reservations";
import { HistoryRow } from "@/types/types";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Skeleton } from "../ui/skeleton";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function HistoryTable() {
  const [history, setHistory] = useState<HistoryRow[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    (async () => {
      try {
        const rows = await getHistory();
        setHistory(rows);
      } catch (err) {
        if (axios.isAxiosError(err) && err.response?.status === 403) {
          toast.error("Only admin can access History");
          router.replace("/");
          return;
        }
        toast.error("Failed to load history");
      } finally {
        setLoading(false);
      }
    })();
  }, [router]);


  return (
    <Card className="border-0 shadow-none">
      <CardContent className="p-0">
        <ScrollArea className="w-full">
          <div className="rounded-md border mx-6 mt-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[220px]">Date time</TableHead>
                  <TableHead className="w-[220px]">Username</TableHead>
                  <TableHead>Concert name</TableHead>
                  <TableHead className="w-[140px]">Action</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {loading ? (
                  <>
                    {[1, 2, 3].map((n) => (
                      <TableRow key={n}>
                        <TableCell>
                          <Skeleton className="h-4 w-[180px]" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-4 w-[120px]" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-4 w-[160px]" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-6 w-[80px]" />
                        </TableCell>
                      </TableRow>
                    ))}
                  </>
                ) : (
                  history.map((r) => (
                    <TableRow key={r.id}>
                      <TableCell>{r.datetime}</TableCell>
                      <TableCell>{r.username}</TableCell>
                      <TableCell>{r.concert}</TableCell>
                      <TableCell>
                        {r.action === "Reserve" ? (
                          <Badge variant="default" className="bg-emerald-600">
                            Reserve
                          </Badge>
                        ) : (
                          <Badge variant="destructive">Cancel</Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
