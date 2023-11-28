import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Route, Routes, useNavigate } from "react-router-dom";
import HousesPage from "../HousesPage/HousesPage.jsx";
import HomePage from "../HomePage/HomePage.jsx";
import SpaPage from "../SpaPage/SpaPage.jsx";
import RestaurantPage from "../RestaurantPage/RestaurantPage.jsx";
import ContactsPage from "../ContactsPage/ContactsPage.jsx";
import { useEffect, useState } from "react";
import BookingPopup from "../BookingPopup/BookingPopup.jsx";
import Login from "../Login/Login.jsx";
import {
  createBooking,
  login,
  loginWithCookie,
  logout,
} from "../../utils/api.js";
import Preloader from "../Preloader/Preloader.jsx";
import ProtectedRouteElement from "../ProtectedRoute/ProtectedRoute.jsx";
import NotFound from "../NotFound/NotFound.jsx";
import Admin from "../Admin/Admin.jsx";

export default function App() {
  const [openPopup, setOpenPopup] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [usePreloader, setUsePreloader] = useState(false);
  const navigate = useNavigate();
  const [useMessage, setUseMessage] = useState("");
  const [currentUser, setCurrentUser] = useState({});
  const [isTokenChecked, setIsTokenChecked] = useState(false);
  const [bookingMessage, setBookingMessage] = useState("");

  // добвавила в другой попап тоже запрет прокрутки фона
  function toggleBodyOverflow() {
    const body = document.body;
    body.style.overflow = body.style.overflow === "hidden" ? "" : "hidden";
  }

  function handleTogglePopup() {
    setOpenPopup(!openPopup);
    toggleBodyOverflow();
  }

  useEffect(() => {
    handleGetUser();
  }, []);

  function handleLogout() {
    setUsePreloader(true);
    logout()
      .then((res) => {
        if (res !== false) {
          setLoggedIn(false);
          navigate("/", { replace: true });
        }
      })
      .catch((error) => {
        setUseMessage(error.message);
        console.log(error.status);
      })
      .finally(() => {
        setUsePreloader(false);
      });
  }
  function handleGetUser() {
    setUsePreloader(true);
    loginWithCookie()
      .then((user) => {
        if (user && typeof user === "object") {
          setLoggedIn(true);
          setCurrentUser(user);
        }
      })
      .catch((e) => console.log(e))
      .finally(() => {
        setUsePreloader(false);
        setIsTokenChecked(true);
      });
  }

  function handleLogin({ email, password }) {
    setUsePreloader(true);
    login({ email, password })
      .then((res) => {
        if (res !== false) {
          setLoggedIn(true);
          navigate("/admin", { replace: true });
          handleGetUser();
        }
      })
      .catch((error) => {
        setUseMessage(error.message);
        console.log(error.status);
      })
      .finally(() => {
        setUsePreloader(false);
      });
  }

  function handleCreateBooking(booking) {
    setUsePreloader(true);
    createBooking(booking)
      .then(() => {
        setBookingMessage("Бронирование создано");
        handleTogglePopup();
      })
      .catch((error) => {
        console.log(error);
        setBookingMessage("Ошибка создания бронирования, попробуйте снова");
      })
      .finally(() => setUsePreloader(false));
  }

  return (
    <main className={"main"}>
      <Header handleTogglePopup={handleTogglePopup} />
      {isTokenChecked ? (
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
          <Route
            path="/signin"
            element={
              <Login
                handleLogin={handleLogin}
                setLoggedIn={setLoggedIn}
                message={useMessage}
              />
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRouteElement
                loggedIn={loggedIn}
                element={Admin}
                handleLogout={handleLogout}
              />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      ) : (
        <Preloader openPreloader={usePreloader} />
      )}
      <Footer />
      <BookingPopup
        isVisible={openPopup}
        handleTogglePopup={handleTogglePopup}
        handleCreateBooking={handleCreateBooking}
      />
    </main>
  );
}
