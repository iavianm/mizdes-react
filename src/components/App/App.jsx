import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import HousesPage from "../HousesPage/HousesPage.jsx";
import HomePage from "../HomePage/HomePage.jsx";
import ContactsPage from "../ContactsPage/ContactsPage.jsx";
import DevelopPage from "../DevelopPage/DevelopPage.jsx";
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
import { Snackbar } from "@mui/material";
import { YMInitializer } from "react-yandex-metrika";
import ym from "react-yandex-metrika";

function usePageTracking() {
  const location = useLocation();

  useEffect(() => {
    ym("hit", location.pathname);
  }, [location]);
}

export default function App() {
  const [openPopup, setOpenPopup] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [usePreloader, setUsePreloader] = useState(false);
  const navigate = useNavigate();
  const [useMessage, setUseMessage] = useState("");
  const [currentUser, setCurrentUser] = useState({});
  const [isTokenChecked, setIsTokenChecked] = useState(false);
  const [villaType, setVillaType] = useState("any");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  usePageTracking();

  function toggleBodyOverflow() {
    const body = document.body;
    body.style.overflow = body.style.overflow === "hidden" ? "" : "hidden";
  }

  function handleTogglePopup() {
    setOpenPopup(!openPopup);
    toggleBodyOverflow();
    setVillaType("");
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
      .then((res) => {
        setSnackbarMessage(res.message);
        setSnackbarOpen(true);
        handleTogglePopup();
      })
      .catch((error) => {
        console.log(error);
        setSnackbarMessage("Ошибка при создании бронирования!");
        setSnackbarOpen(true);
      })
      .finally(() => setUsePreloader(false));
  }

  function handleChangeVillas(type) {
    setVillaType(type);
  }

  function handleOpenSnackbar(message) {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  }

  return (
    <main className={"main"}>
      <YMInitializer
        accounts={[95920746]}
        options={{
          clickmap: true,
          trackLinks: true,
          accurateTrackBounce: true,
          webvisor: true,
        }}
        version="2"
      />
      <Header
        handleTogglePopup={handleTogglePopup}
        loggedIn={loggedIn}
        handleLogout={handleLogout}
      />
      {isTokenChecked ? (
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/houses"
            element={
              <HousesPage
                handleTogglePopup={handleTogglePopup}
                handleChangeVillas={handleChangeVillas}
              />
            }
          />
          <Route path="/develop" element={<DevelopPage />} />
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
                setUsePreloader={setUsePreloader}
                handleOpenSnackbar={handleOpenSnackbar}
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
        villaType={villaType}
      />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        ContentProps={{
          sx: {
            backgroundColor:
              snackbarMessage === "Ошибка при создании бронирования!"
                ? "red"
                : "#ffffff",
            color:
              snackbarMessage === "Ошибка при создании бронирования!"
                ? "#ffffff"
                : "#1d9819",
            fontSize: "1rem",
            fontWeight: "bold",
            width: "100%",
            justifyContent: "center",
          },
        }}
        sx={{
          top: "10%",
          transform: "translateY(-50%)",
        }}
      />
    </main>
  );
}
