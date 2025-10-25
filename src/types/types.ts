export type Concert = {
  id: string;
  name: string;
  seats: number;
  desc: string;
};

export type HistoryRow = {
  id: string;
  datetime: string;
  username: string;
  concert: string;
  action: "Reserve" | "Cancel";
};

export type Role = "admin" | "user";
