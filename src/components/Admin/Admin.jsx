import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./Admin.css";
import { getBookings, removeBooking } from "../../utils/api.js";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";

export default function Admin() {
  const [rows, setRows] = useState([]);
  const [allBookings, setAllBookings] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const columns = [
    { field: "col1", headerName: "Имя", flex: 1, minWidth: 150 },
    { field: "col2", headerName: "Телефон", flex: 1, minWidth: 150 },
    { field: "col3", headerName: "Email", flex: 1, minWidth: 150 },
    { field: "col4", headerName: "Коттедж", flex: 1, minWidth: 120 },
    { field: "col5", headerName: "Доп.услуги", flex: 1, minWidth: 150 },
    { field: "col6", headerName: "Дата заезда", flex: 1, minWidth: 150 },
    { field: "col7", headerName: "Дата выезда", flex: 1, minWidth: 150 },
    { field: "col8", headerName: "Взрослые", flex: 1, minWidth: 120 },
    { field: "col9", headerName: "Дети", flex: 1, minWidth: 120 },
    {
      field: "col10",
      headerName: "",
      flex: 1,
      minWidth: 100,
      renderCell: (cellValues) => {
        return (
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              handleDialogOpen(cellValues.id);
            }}
          >
            Удалить
          </Button>
        );
      },
    },
  ];

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

  function normalizeBookings(bookingsArray) {
    return bookingsArray.map((el) => {
      return {
        id: el._id,
        col1: el.name,
        col2: el.phone,
        col3: el.email,
        col4: el.cottageType,
        col5: el.additionalOptions,
        col6: el.arrivalDate,
        col7: el.departureDate,
        col8: el.adults,
        col9: el.children,
      };
    });
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
    </section>
  );
}
