import { api } from "@/lib/axios";
import type { Concert, ConcertReservedStatus } from "@/types/types";

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

export async function createConcert(payload: {
  name: string;
  description?: string;
  totalSeats: number;
}): Promise<Concert> {
  const { data } = await api.post("/concerts/admin", payload, {
    headers: {
      "x-role": "admin",
      "x-user-id": "cmh7pwtwa0002hpt0gfy94ift",
    },
  });
  return {
    id: data.id,
    name: data.name,
    desc: data.description,
    seats: data.totalSeats,
  };
}

export async function deleteConcert(id: string): Promise<void> {
  await api.delete(`/concerts/admin/${id}`);
}
