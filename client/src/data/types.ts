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
  name: string;
  username: string;
  imgUrl: string;
};

export type Elips = {
  left: string;
  top: string;
};
