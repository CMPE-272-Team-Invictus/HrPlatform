/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  MenuItem,
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

export function AddStaffModal({
  open,
  setOpen,
  allUser,
  setUsers,
}: {
  open: boolean;
  setOpen: (isOpen: boolean) => void;
  allUser: any[];
  setUsers: any;
}) {
  const [updatedUser, setUpdatedUser] = useState({
    empNumber: allUser.length + 5,
    hireDate: "2023-12-16",
    role: "Employee",
    salary_history: {},
  });

  const updateInfo = () => {
    setUpdatedUser({
      ...updatedUser,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      salary_history: { "2023": updatedUser.salary },
    });
    let allUsersTemp = allUser;
    allUsersTemp = [updatedUser, ...allUsersTemp];
    setUsers(allUsersTemp);
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
              required
              label="First Name"
              sx={{ marginTop: "15px" }}
              fullWidth
              id="outlined-basic"
              variant="outlined"
              onChange={(e) => {
                e.preventDefault();
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                setUpdatedUser({ ...updatedUser, firstName: e.target.value });
              }}
            />
            <br />
            <TextField
              required
              label="Last Name"
              sx={{ marginTop: "15px" }}
              fullWidth
              id="outlined-basic"
              variant="outlined"
              onChange={(e) => {
                e.preventDefault();
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                setUpdatedUser({ ...updatedUser, lastName: e.target.value });
              }}
            />
            <br />
            <TextField
              required
              label="Birth Date"
              sx={{ marginTop: "15px" }}
              fullWidth
              id="outlined-basic"
              variant="outlined"
              onChange={(e) => {
                e.preventDefault();
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                setUpdatedUser({ ...updatedUser, birthDate: e.target.value });
              }}
            />
            <br />
            <TextField
              required
              label="Email"
              sx={{ marginTop: "15px" }}
              fullWidth
              id="outlined-basic"
              variant="outlined"
              onChange={(e) => {
                e.preventDefault();
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                setUpdatedUser({ ...updatedUser, email: e.target.value });
              }}
            />
            <br />
            <TextField
              required
              label="Gender"
              sx={{ marginTop: "15px" }}
              fullWidth
              id="outlined-basic"
              variant="outlined"
              onChange={(e) => {
                e.preventDefault();
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                setUpdatedUser({ ...updatedUser, gender: e.target.value });
              }}
            />
            <br />
            <TextField
              type="number"
              required
              label="Salary"
              sx={{ marginTop: "15px" }}
              fullWidth
              id="outlined-basic"
              variant="outlined"
              onChange={(e) => {
                e.preventDefault();
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                setUpdatedUser({ ...updatedUser, salary: e.target.value });
              }}
            />
            <br />
            <TextField
              id="outlined-select-currency"
              select
              label="Select"
              defaultValue="Finance"
              helperText="Please select the org"
            >
              <MenuItem
                key={"d02"}
                value={"d02"}
                onClick={() => {
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-expect-error
                  updatedUser.deptNo = "d02";
                }}
              >
                Finance
              </MenuItem>
              <MenuItem
                key={"d01"}
                value={"d01"}
                onClick={() => {
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-expect-error
                  updatedUser.deptNo = "d01";
                }}
              >
                HR
              </MenuItem>
              <MenuItem
                key={"d03"}
                value={"d03"}
                onClick={() => {
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-expect-error
                  updatedUser.deptNo = "d03";
                }}
              >
                Sales
              </MenuItem>
              <MenuItem
                key={"d04"}
                value={"d04"}
                onClick={() => {
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-expect-error
                  updatedUser.deptNo = "d04";
                }}
              >
                Marketing
              </MenuItem>
            </TextField>
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
            CONFIRM NEW STAFF
          </Button>
          <Button size="small" onClick={() => setOpen(false)}>
            CLOSE
          </Button>
        </CardActions>
      </Card>
    </Modal>
  );
}
