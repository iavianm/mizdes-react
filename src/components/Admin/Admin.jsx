import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./Admin.css";
import { getBookings, removeBooking, updateBooking } from "../../utils/api.js";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import BookingDetailsDialog from "../BookingDetailsDialog/BookingDetailsDialog.jsx";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import BookingPopup from "../BookingPopup/BookingPopup.jsx";

export default function Admin({ setUsePreloader, handleOpenSnackbar }) {
  const [rows, setRows] = useState([]);
  const [allBookings, setAllBookings] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);

  const columns = [
    { field: "col1", headerName: "Имя", flex: 1, minWidth: 150 },
    { field: "col2", headerName: "Телефон", flex: 1, minWidth: 150 },
    { field: "col3", headerName: "Email", flex: 1, minWidth: 150 },
    { field: "col4", headerName: "Коттедж", flex: 1, minWidth: 120 },
    { field: "col5", headerName: "Доп.услуги", flex: 1, minWidth: 150 },
    { field: "col6", headerName: "Дата заезда", flex: 1, minWidth: 150 },
    { field: "col7", headerName: "Дата выезда", flex: 1, minWidth: 150 },
    { field: "col8", headerName: "Взрослые", flex: 1, minWidth: 100 },
    { field: "col9", headerName: "Дети", flex: 1, minWidth: 100 },
    {
      field: "col10",
      headerName: "",
      flex: 1,
      minWidth: 150,
      renderCell: (cellValues) => {
        return (
          <div style={{ display: "flex", gap: "10px" }}>
            {" "}
            <Button
              className="button-icon"
              variant="contained"
              color="success"
              onClick={() => handleViewBooking(cellValues.id)}
              startIcon={<VisibilityIcon className="custom-icon" />} // Уменьшение размера иконки
              data-button="view"
            ></Button>
            <Button
              size="small"
              className="button-icon"
              variant="contained"
              color="primary"
              onClick={() => handleEditBooking(cellValues.id)}
              startIcon={<EditIcon className="custom-icon" />}
              data-button="edit"
            ></Button>
            <Button
              variant="contained"
              className="button-icon"
              color="secondary"
              onClick={() => handleDialogOpen(cellValues.id)}
              startIcon={<DeleteIcon className="custom-icon" />}
              data-button="delete"
              size="small"
            ></Button>
          </div>
        );
      },
    },
  ];

  const handleRowClick = (params, event) => {
    if (event.target.closest("[data-button]")) {
      return;
    }

    const bookingDetails = allBookings.find(
      (booking) => booking._id === params.id,
    );
    setSelectedBooking(bookingDetails);
    setOpenDetailsDialog(true);
  };

  const handleViewBooking = (id) => {
    const bookingDetails = allBookings.find((booking) => booking._id === id);

    setSelectedBooking(bookingDetails);
    setOpenDetailsDialog(true);
  };

  const handleEditBooking = (id) => {
    const bookingDetails = allBookings.find((booking) => booking._id === id);
    setSelectedBooking(bookingDetails);
    setOpenPopup(true);
  };

  const handleDialogOpen = (id) => {
    setSelectedId(id);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  function sortBookingsByNewest(bookingsArray) {
    return bookingsArray.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
    );
  }

  function handleDeleteBooking() {
    removeBooking(selectedId)
      .then(() => {
        setAllBookings((state) => state.filter((el) => el._id !== selectedId));
        handleDialogClose();
      })
      .catch((error) => console.log(error));
  }

  const handleUpdateBookingState = (updatedBooking) => {
    setAllBookings((currentBookings) =>
      currentBookings.map((booking) =>
        booking._id === updatedBooking._id ? updatedBooking : booking,
      ),
    );
  };

  useEffect(() => {
    getBookings()
      .then((res) => {
        const sortedBookings = sortBookingsByNewest(res);
        setAllBookings(sortedBookings);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    if (allBookings) {
      const sortedBookings = sortBookingsByNewest(allBookings);
      setRows(normalizeBookings(sortedBookings));
    }
  }, [allBookings]);

  function toggleBodyOverflow() {
    const body = document.body;
    body.style.overflow = body.style.overflow === "hidden" ? "" : "hidden";
  }

  function handleTogglePopup() {
    setOpenPopup(!openPopup);
    toggleBodyOverflow();
  }

  function normalizeBookings(bookingsArray) {
    return bookingsArray.map((el) => {
      return {
        id: el._id,
        col1: el.name,
        col2: el.phone,
        col3: el.email,
        col4: el.cottageType,
        col5: el.additionalOptions.join(", "),
        col6: el.arrivalDate,
        col7: el.departureDate,
        col8: el.adults,
        col9: el.children,
      };
    });
  }

  function handleUpdateBooking(id, booking) {
    setUsePreloader(true);
    updateBooking(id, booking)
      .then((res) => {
        handleOpenSnackbar(res.message);
        handleTogglePopup();
        handleUpdateBookingState(res.booking);
      })
      .catch((error) => {
        console.log(error);
        handleOpenSnackbar("Ошибка при обновлении бронирования!");
      })
      .finally(() => setUsePreloader(false));
  }

  return (
    <section className="admin">
      <div className="admin-container">
        <DataGrid
          rows={rows}
          columns={columns}
          pageSizeOptions={[5, 10, 25]}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10, page: 0 },
            },
          }}
          onRowClick={handleRowClick}
        />
      </div>
      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Подтвердите действие"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Вы уверены, что хотите удалить эту запись?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Отмена
          </Button>
          <Button onClick={handleDeleteBooking} color="secondary" autoFocus>
            Удалить
          </Button>
        </DialogActions>
      </Dialog>
      <BookingDetailsDialog
        open={openDetailsDialog}
        onClose={() => setOpenDetailsDialog(false)}
        booking={selectedBooking}
      />
      <BookingPopup
        isVisible={openPopup}
        handleUpdateBooking={handleUpdateBooking}
        handleTogglePopup={handleTogglePopup}
        initialBooking={selectedBooking}
      />
    </section>
  );
}
