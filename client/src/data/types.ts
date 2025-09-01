export type Event = {
  title: string;
  description: string;
  date: string;
  imgUrl: string;
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
  role: string;
};

export type Elips = {
  left: string;
  top: string;
};
