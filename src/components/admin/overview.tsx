"use client";

import { Trash2, Users, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { TabsContent } from "../ui/tabs";
import { concertDb } from "@/db/mockCardData";
import { Button } from "../ui/button";
import { useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Concert } from "@/types/types";

export default function Overview() {
  const fetchConcerts: Concert[] = concertDb;
  const [concerts, setConcerts] = useState<Concert[]>(fetchConcerts);
  const [open, setOpen] = useState(false);
  const [selectedConcert, setSelectedConcert] = useState<Concert | null>(null);

  const comfirmDelete = (c: Concert) => {
    setSelectedConcert(c);
    setOpen(true);
  };

  const handleDelete = () => {
    if (!selectedConcert) return;
    setConcerts((prev) => prev.filter((x) => x.id !== selectedConcert.id));
    toast.success("Delete successfully");
    setOpen(false);
    setSelectedConcert(null);
  };

  return (
    <div>
      <TabsContent value="overview" className="mt-6">
        <ScrollArea className="h-[60vh] rounded-md">
          <div className="space-y-4 pr-4">
            {concerts.map((c) => (
              <Card key={c.id} className="border">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-primary hover:underline">
                    {c.name}
                  </CardTitle>
                  <Separator />
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{c.desc}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" /> {c.seats}
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="gap-2"
                      onClick={() => comfirmDelete(c)}
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </TabsContent>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader className="flex flex-col items-center text-center space-y-2">
            <XCircle className="h-10 w-10 text-red-500" />
            <DialogTitle>Are you sure to delete?</DialogTitle>
            <DialogDescription>
              {selectedConcert && (
                <span className="font-semibold text-foreground">
                  {`"${selectedConcert.name}"`}
                </span>
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-center mt-2 flex gap-2">
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              className="min-w-[100px]"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              className="min-w-[100px]"
            >
              Yes, Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
