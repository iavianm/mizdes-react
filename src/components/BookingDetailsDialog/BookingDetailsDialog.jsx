import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

function BookingDetailsDialog({ open, onClose, booking }) {
  if (!booking) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md">
      <DialogTitle>Детали бронирования</DialogTitle>
      <DialogContent dividers>
        <Typography gutterBottom variant="h6">
          Общая информация
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="Имя" secondary={booking.name} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Телефон" secondary={booking.phone} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Email" secondary={booking.email} />
          </ListItem>
        </List>

        <Typography gutterBottom variant="h6">
          Детали проживания
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="Коттедж" secondary={booking.cottageType} />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Доп. услуги"
              secondary={booking.additionalOptions.join(", ")}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Дата заезда"
              secondary={booking.arrivalDate}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Дата выезда"
              secondary={booking.departureDate}
            />
          </ListItem>
          <ListItem>
            <ListItemText primary="Взрослые" secondary={booking.adults} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Дети" secondary={booking.children} />
          </ListItem>
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Закрыть</Button>
      </DialogActions>
    </Dialog>
  );
}

export default BookingDetailsDialog;
