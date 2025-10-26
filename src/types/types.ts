export type Concert = {
  id: string;
  name: string;
  seats: number;
  desc?: string;
};

export type HistoryRow = {
  id: string;
  datetime: string;
  username: string;
  concert: string;
  action: "Reserve" | "Cancel";
};

export type Role = "admin" | "user";

export type RoleContextType = {
  role: Role;
  toggleRole: () => void;
  setRole: (r: Role) => void;
  refreshRole: () => Promise<void>;
};

export interface ConcertReservedStatus extends Concert {
  reserved?: boolean;
}

export type Props = {
  onCreated?: () => void;
  concerts: Concert[];
  setConcerts: React.Dispatch<React.SetStateAction<Concert[]>>;
};

export type MeResponse = {
  id: string;
  username: string;
  role: "admin" | "user";
};

export interface ConcertReservedStatus extends Concert {
  reserved?: boolean;
}