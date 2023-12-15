/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

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

export function EditInfoModal({
  user,
  open,
  setOpen,
  allUser,
  setUsers,
}: {
  open: boolean;
  setOpen: (isOpen: boolean) => void;
  user: any;
  allUser: any[];
  setUsers: any;
}) {
  const [updatedUser, setUpdatedUser] = useState({ ...user });

  const updateInfo = () => {
    const allUsersTemp = allUser;
    for (let i = 0; i < allUsersTemp.length; ++i) {
      if (allUsersTemp[i].empNumber === user.empNumber) {
        allUsersTemp[i] = updatedUser;
        setUsers(allUsersTemp);
        return;
      }
    }
  };

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
              EDIT YOUR INFO
            </Typography>
            <br />
            <TextField
              label="First Name"
              sx={{ marginTop: "15px" }}
              fullWidth
              id="outlined-basic"
              defaultValue={user.firstName}
              variant="outlined"
              onChange={(e) => {
                e.preventDefault();
                setUpdatedUser({ ...updatedUser, firstName: e.target.value });
              }}
            />
            <br />
            <TextField
              label="Last Name"
              sx={{ marginTop: "15px" }}
              fullWidth
              id="outlined-basic"
              defaultValue={user.lastName}
              variant="outlined"
              onChange={(e) => {
                e.preventDefault();
                setUpdatedUser({ ...updatedUser, lastName: e.target.value });
              }}
            />
            <br />
            <TextField
              label="Birth Date"
              sx={{ marginTop: "15px" }}
              fullWidth
              id="outlined-basic"
              defaultValue={user.birthDate}
              variant="outlined"
              onChange={(e) => {
                e.preventDefault();
                setUpdatedUser({ ...updatedUser, birthDate: e.target.value });
              }}
            />
            <br />
            <TextField
              label="Email"
              sx={{ marginTop: "15px" }}
              fullWidth
              id="outlined-basic"
              defaultValue={user.email}
              variant="outlined"
              onChange={(e) => {
                e.preventDefault();
                setUpdatedUser({ ...updatedUser, email: e.target.value });
              }}
            />
            <br />
            <TextField
              label="Gender"
              sx={{ marginTop: "15px" }}
              fullWidth
              id="outlined-basic"
              defaultValue={user.gender}
              variant="outlined"
              onChange={(e) => {
                e.preventDefault();
                setUpdatedUser({ ...updatedUser, gender: e.target.value });
              }}
            />
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            size="small"
            onClick={() => {
              updateInfo();
              setOpen(false);
            }}
          >
            CONFIRM EDIT
          </Button>
          <Button size="small" onClick={() => setOpen(false)}>
            CLOSE
          </Button>
        </CardActions>
      </Card>
    </Modal>
  );
}
