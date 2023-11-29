import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./Admin.css";

const initialRows = [
  {
    id: 1,
    col1: "Hello",
    col2: "World",
    col3: "asdf",
    col4: "sdfd",
    col5: "dffg",
    col6: "dss",
    col7: "dfghh",
  },
  { id: 2, col1: "DataGridPro", col2: "is Awesome" },
  { id: 3, col1: "MUI", col2: "is Amazing" },
];

const columns = [
  { field: "col1", headerName: "Имя", width: 250 },
  { field: "col2", headerName: "Номер телефона", width: 250 },
  { field: "col3", headerName: "Коттедж", width: 250 },
  { field: "col4", headerName: "Дата заезда", width: 200 },
  { field: "col5", headerName: "Дата выезда", width: 200 },
  { field: "col6", headerName: "Кол-во взрослых", width: 150 },
  { field: "col7", headerName: "Кол-во детей", width: 150 },
];

export default function Admin() {
  const [rows, setRows] = useState(initialRows);

  const handleBooking = (bookingData) => {
    const newId = rows.length + 1;
    const newRow = {
      id: newId,
      col1: bookingData.name,
      col2: bookingData.phone,
      col3: bookingData.house,
      col4: bookingData.checkIn,
      col5: bookingData.checkOut,
      col6: bookingData.adults,
      col7: bookingData.child,
    };

    setRows((prevRows) => [...prevRows, newRow]);
  };

  return (
    <section className="admin">
      <div className="admin-container">
        <DataGrid rows={rows} columns={columns} className="admin-grid" />
      </div>
    </section>
  );
}
