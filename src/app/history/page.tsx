import HistoryTable from "@/components/admin/historyTable";
import AdminGate from "@/components/auth/adminGate";

export default function History() {
  return (
    <div>
      <AdminGate>
        <HistoryTable />
      </AdminGate>
    </div>
  );
}
