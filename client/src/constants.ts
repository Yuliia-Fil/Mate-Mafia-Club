import facebook from "./assets/facebook.svg";
import telegram from "./assets/telegram.svg";
import instagram from "./assets/instagram.svg";

export const paths = {
  HOME: "/",
  RULES: "/rules",
  EVENTS: "/events",
  PLAYERS: "/players",
  GAME: "/game",
};

export const navLinks = [
  { title: "Події", href: "/events" },
  { title: "Правила та ролі", href: "/rules" },
  { title: "Гравці", href: "/players" },
];

export const iconLinks = [
  { href: "https://facebook.com", src: facebook },
  { href: "https://telegram", src: telegram },
  { href: "https://instagram.com", src: instagram },
];
