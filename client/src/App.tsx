import { Route, Routes, useLocation } from "react-router-dom";
import { BackgroundProvider } from "./components/BackgroundProvider/BackgroundProvider";
import { Header } from "./components/Header";
import { HomePage } from "./components/HomePage";
import { EventsPage } from "./components/EventsPage";
import { PageTitle } from "./components/PageTitle";
import { Footer } from "./components/Footer";
import { paths } from "./constants";
import { PlayersPage } from "./components/PlayersPage";
import { GamePage } from "./components/GamePage";

export const App = () => {
  const path = useLocation().pathname;

  return (
    <BackgroundProvider>
      <Header />
      <PageTitle path={path} />
      <Routes>
        <Route path={paths.HOME} element={<HomePage />}></Route>
        <Route path={paths.EVENTS} element={<EventsPage />}></Route>
        <Route path={paths.PLAYERS} element={<PlayersPage />}></Route>
        <Route path={paths.GAME} element={<GamePage />}></Route>
      </Routes>
      <Footer path={path} />
    </BackgroundProvider>
  );
};
