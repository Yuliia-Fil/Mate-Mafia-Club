import { Route, Routes } from "react-router-dom";
import { BackgroundProvider } from "./components/BackgroundProvider/BackgroundProvider";
import { Header } from "./components/Header";
import { HomePage } from "./components/HomePage";
import { paths } from "./path";
import { EventCard } from "./components/EventCard";

export const App = () => {
  return (
    <BackgroundProvider>
      <Header />
      <Routes>
        <Route path={paths.HOME} element={<HomePage />}></Route>
      </Routes>
      <EventCard></EventCard>
    </BackgroundProvider>
  );
};
