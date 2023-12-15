/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Modal,
  TextField,
  Tooltip,
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

export function PromotionApplyModal({
  open,
  setOpen,
  user,
  setUsers,
  allUsers,
}: {
  open: boolean;
  setOpen: (isOpen: boolean) => void;
  user: any;
  setUsers: (item: any) => void;
  allUsers: any[];
}) {
  console.log("promotion apply modal", user);
  const [newSalary, setNewSalary] = useState<number | string>("asd");

  const applyPromotion = async () => {
    const allUsersTemp = allUsers;
    for (let i = 0; i < allUsersTemp.length; ++i) {
      if (allUsersTemp[i].empNumber === user.empNumber) {
        console.log("JACKPOT");
        allUsersTemp[i] = {
          ...allUsersTemp[i],
          new_salary: newSalary,
          promotion_status: "employee requested for promotion",
        };
        console.log("allUsersTemp", allUsersTemp[i]);
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
              Promotion Application
            </Typography>
            <br />
            <Typography variant="body2" color="text.secondary">
              Current Salary: {user?.salary} USD
            </Typography>
            <br />
            <TextField
              type="number"
              fullWidth
              error={newSalary !== "asd" && newSalary < user?.salary + 10000}
              onChange={(e) => {
                e.preventDefault();
                setNewSalary(Number(e.target.value));
              }}
              required
              id="outlined-required"
              label="New Salary"
              placeholder="At least 10000USD increment is required for promotion"
            />
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Tooltip
            title={
              newSalary === "asd" || newSalary < user?.salary + 10000
                ? "At least 10000USD increment is required for promotion"
                : ""
            }
          >
            <span>
              <Button
                size="small"
                color="primary"
                onClick={async () => {
                  await applyPromotion();
                  setOpen(false);
                }}
                disabled={
                  newSalary === "asd" || newSalary < user?.salary + 10000
                }
              >
                CONFIRM APPLICATION
              </Button>
            </span>
          </Tooltip>
          <Button size="small" color="error" onClick={() => setOpen(false)}>
            CLOSE
          </Button>
        </CardActions>
      </Card>
    </Modal>
  );
}
