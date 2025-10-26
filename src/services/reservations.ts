import { api } from "@/lib/axios";
import { ConcertReservedStatus, HistoryRow } from "@/types/types";

export async function listConcerts(): Promise<ConcertReservedStatus[]> {
  const { data } = await api.get("/concerts");
  return data.map((c: any) => ({
    id: c.id,
    name: c.name,
    desc: c.description,
    seats: c.totalSeats,
    reserved: !!c.reservations,
    reservationId: c.reservations?.id
  }));
}

export async function getHistory(): Promise<HistoryRow[]> {
  const userId = typeof window !== "undefined" ? localStorage.getItem('userId') : null
  if (!userId) throw Error("Missing userId in localstorage")

  const { data } = await api.get("/reservations/history", {
    headers: {
      "x-user-id": userId,
    },
  });

  return data.map((r: any) => ({
    id: r.id,
    datetime: new Date(r.createdAt).toLocaleString(),
    username: r.user?.username || "-",
    concert: r.concert?.name || "-",
    action: r.status === "ACTIVE" ? "Reserve" : "Cancel",
  }));
}

export async function reserveConcert(concertId: string) {
  const { data } = await api.post("/reservations", { concertId });
  return data;
}

export async function cancelReservation(reservationId: string) {
  const { data } = await api.delete(`/reservations/${reservationId}`);
  return data;
}