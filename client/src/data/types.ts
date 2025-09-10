export type Event = {
  title: string;
  description: string;
  date: string;
  imgUrl: string;
  type: "party" | "tournament" | "experiment";
};

export type RoleCard = {
  id: string;
  name: string;
  description: string;
  quantity: number;
  team: string;
  imgUrl: string;
};

export type Player = {
  id: 0;
  username: string;
  email: string;
  avatarUrl: string;
  name: string;
};

export type Elips = {
  left: string;
  top: string;
};

type Option = {
  label: string;
  value: string;
};

export type Form = {
  label: string;
  options: Option[];
};

export type PageKey = "players" | "events";
