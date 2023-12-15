/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Modal,
  Typography,
} from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export function InfoModal({
  user,
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (isOpen: boolean) => void;
  user: any;
}) {
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Card sx={{ ...style }}>
        <CardActionArea>
          <CardContent>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              YOUR INFO
            </Typography>
            <br />
            <Typography variant="body2" color="text.secondary">
              First Name: {user.firstName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Last Name: {user.lastName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Birthdate: {user.birthDate}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Email: {user.email}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Employee Id: {user.empNumber}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Gender: {user.gender[0] === "M" ? "Male" : "Female"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Current Salary: {user.salary} USD
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" onClick={() => setOpen(false)}>
            CLOSE
          </Button>
        </CardActions>
      </Card>
    </Modal>
  );
}
