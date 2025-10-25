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
import { historyData } from "@/db/mockHistoryData";

export default function HistoryTable() {
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
                {historyData.map((r) => (
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
                ))}
              </TableBody>
            </Table>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
