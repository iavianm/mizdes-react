import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Route, Routes } from "react-router-dom";
import HousesPage from "../HousesPage/HousesPage.jsx";
import HomePage from "../HomePage/HomePage.jsx";
import SpaPage from "../SpaPage/SpaPage.jsx";
import RestaurantPage from "../RestaurantPage/RestaurantPage.jsx";
import ContactsPage from "../ContactsPage/ContactsPage.jsx";
import { useState } from "react";
import BookingPopup from "../BookingPopup/BookingPopup.jsx";

export default function App() {
  const [openPopup, setOpenPopup] = useState(false);
  function handleTogglePopup() {
    setOpenPopup(!openPopup);
  }

  return (
    <main className={"main"}>
      <Header handleTogglePopup={handleTogglePopup} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/spa"
          element={<SpaPage handleTogglePopup={handleTogglePopup} />}
        />
        <Route
          path="/houses"
          element={<HousesPage handleTogglePopup={handleTogglePopup} />}
        />
        <Route
          path="/restaurant"
          element={<RestaurantPage handleTogglePopup={handleTogglePopup} />}
        />
        <Route path="/contacts" element={<ContactsPage />} />
      </Routes>
      <Footer />
      <BookingPopup
        isVisible={openPopup}
        handleTogglePopup={handleTogglePopup}
      />
    </main>
  );
}
