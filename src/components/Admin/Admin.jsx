import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./Admin.css";
import { getBookings, removeBooking } from "../../utils/api.js";
import { Button } from "@mui/material";

export default function Admin() {
  const [rows, setRows] = useState([]);
  const [allBookings, setAllBookings] = useState([]);

  const columns = [
    { field: "col1", headerName: "Имя", flex: 1, minWidth: 150 },
    { field: "col2", headerName: "Номер телефона", flex: 1, minWidth: 150 },
    { field: "col3", headerName: "Email", flex: 1, minWidth: 150 },
    { field: "col4", headerName: "Коттедж", flex: 1, minWidth: 100 },
    { field: "col5", headerName: "Дата заезда", flex: 1, minWidth: 100 },
    { field: "col6", headerName: "Дата выезда", flex: 1, minWidth: 100 },
    { field: "col7", headerName: "Кол-во взрослых", flex: 1, minWidth: 50 },
    { field: "col8", headerName: "Кол-во детей", flex: 1, minWidth: 50 },
    {
      field: "col9",
      headerName: "",
      flex: 1,
      minWidth: 30,
      renderCell: (cellValues) => {
        return (
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              handleDeleteBooking(cellValues.id);
            }}
          >
            Удалить
          </Button>
        );
      },
    },
  ];

  function handleDeleteBooking(id) {
    removeBooking(id)
      .then(() => {
        setAllBookings((state) => state.filter((el) => el._id !== id));
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    getBookings()
      .then((res) => {
        setAllBookings(res);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    if (allBookings) {
      setRows(normalizeBookings(allBookings));
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
        col5: el.arrivalDate,
        col6: el.departureDate,
        col7: el.adults,
        col8: el.children,
      };
    });
  }

  return (
    <section className="admin">
      <div className="admin-container">
        <DataGrid rows={rows} columns={columns} className="admin-grid" />
      </div>
    </section>
  );
}
