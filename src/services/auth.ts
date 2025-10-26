import { api } from "@/lib/axios";
import { MeResponse } from "@/types/types";

export async function fetchMe(): Promise<MeResponse> {
  const { data } = await api.get("/auth/me");
  return data;
}

export async function getUserIdForRole(target: "admin" | "user") {
  const { data } = await api.get(`/auth/switch/${target}`);
  console.log('data', data)
  if (!data?.ok) throw new Error(data?.message ?? "switch-to failed");
  return data.userId as string;
}