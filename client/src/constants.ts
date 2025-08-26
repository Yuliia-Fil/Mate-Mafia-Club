import facebook from "./assets/facebook.svg";
import telegram from "./assets/telegram.svg";
import instagram from "./assets/instagram.svg";
import citizen from "./assets/citizen.png";

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

export const pageTitles = [
  {
    path: paths.EVENTS,
    title: "Події",
    subtitle: "Тут ви знайдете всі заплановані ігри та зустрічі клубу",
  },
  {
    path: paths.PLAYERS,
    title: "Гравці",
    subtitle: "Знайомтеся з гравцями та учасниками нашого клубу",
  },
  {
    path: paths.RULES,
    title: "Ролі",
    subtitle: "Кожна роль має унікальні можливості та впливає на перебіг гри",
  },
];

export const testRole = {
  title: "Мешканець",
  description:
    "Прокидається лише у фазу дня, не має нічних дій. Активно шукає мафію та будує червону команду.",
  img: citizen,
};
