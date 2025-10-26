import CreateConcert from "@/components/admin/createConcert";
import Overview from "@/components/admin/overview";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { listConcerts } from "@/services/concerts";
import type { Concert } from "@/types/types";
import { Award, CircleX, UserRound } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function AdminComponent() {
  const [concerts, setConcerts] = useState<Concert[]>([])
  const [tab, setTab] = useState('overview')

  useEffect(() => {
    (async () => {
      try {
        const rows = await listConcerts();
        setConcerts(rows);
      } catch (e) {
        toast.error("Load concerts failed");
      }
    })();
  }, []);


  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-evenly w-full">
        <Card className="bg-blue-600 text-white w-[200px] text-center">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-normal text-center">
              <div className="flex flex-col items-center gap-4">
                <UserRound />
                Total of seats
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold leading-none">500</p>
          </CardContent>
        </Card>

        <Card className="bg-emerald-600 text-white w-[200px] text-center">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-normal">
              <div className="flex flex-col items-center gap-4">
                <Award />
                Reserve
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold leading-none">120</p>
          </CardContent>
        </Card>

        <Card className="bg-red-600 text-white w-[200px] text-center">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-normal">
              <div className="flex flex-col items-center gap-4">
                <CircleX />
                Cancel
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold leading-none">12</p>
          </CardContent>
        </Card>
      </div>
      <div className="w-full">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="create">Create</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <Overview concerts={concerts} setConcerts={setConcerts} />
          </TabsContent>
          <TabsContent value="create">
            <CreateConcert
              concerts={concerts}
              setConcerts={setConcerts}
              onCreated={() => setTab("overview")} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
