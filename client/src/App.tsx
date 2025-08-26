import { Route, Routes, useLocation } from "react-router-dom";
import { BackgroundProvider } from "./components/BackgroundProvider/BackgroundProvider";
import { Header } from "./components/Header";
import { HomePage } from "./components/HomePage";
import { Events } from "./components/EventsPage";
import { PageTitle } from "./components/PageTitle";
import { Footer } from "./components/Footer";
import { paths } from "./constants";
import { RoleCard } from "./components/RoleCard";

export const App = () => {
  const path = useLocation().pathname;

  return (
    <BackgroundProvider>
      <Header />
      <PageTitle path={path} />
      <RoleCard />
      <Routes>
        <Route path={paths.HOME} element={<HomePage />}></Route>
        <Route path={paths.EVENTS} element={<Events />}></Route>
      </Routes>
      <Footer path={path} />
    </BackgroundProvider>
  );
};
