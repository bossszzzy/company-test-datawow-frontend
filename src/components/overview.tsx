"use client"

import { Trash2, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import { TabsContent } from "./ui/tabs";
import concertDb from "@/db/mockCardData.json";
import { Button } from "./ui/button";
import { useState } from "react";

export default function Overview() {
  const fetchConcerts: Concert[] = concertDb.mockdata;
  const [concerts, setConcerts] = useState<Concert[]>(fetchConcerts);
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
                      onClick={() =>
                        setConcerts((prev) => prev.filter((x) => x.id !== c.id))
                      }
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
    </div>
  );
}
