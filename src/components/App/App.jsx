import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Route, Routes } from "react-router-dom";
import HousesPage from "../HousesPage/HousesPage.jsx";
import HomePage from "../HomePage/HomePage.jsx";
import SpaPage from "../SpaPage/SpaPage.jsx";
import RestaurantPage from "../RestaurantPage/RestaurantPage.jsx";
import ContactsPage from "../ContactsPage/ContactsPage.jsx";

export default function App() {
  return (
    <main className={"main"}>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/spa" element={<SpaPage />} />
        <Route path="/houses" element={<HousesPage />} />
        <Route path="/restaurant" element={<RestaurantPage />} />
        <Route path="/contacts" element={<ContactsPage />} />
      </Routes>
      <Footer />
    </main>
  );
}
