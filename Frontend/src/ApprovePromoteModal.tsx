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

export function ApprovePromoteModal({
  open,
  setOpen,
  user,
  superUser,
  setUsers,
  allUsers,
}: {
  open: boolean;
  setOpen: (isOpen: boolean) => void;
  user: any;
  superUser: any;
  setUsers: (item: any) => void;
  allUsers: any[];
}) {
  const approvePromotion = async () => {
    if (superUser.deptNo === "d01") {
      const allUsersTemp = allUsers;
      for (let i = 0; i < allUsersTemp.length; ++i) {
        if (allUsersTemp[i].empNumber === user.empNumber) {
          allUsersTemp[i].salary = allUsersTemp[i].new_salary;
          allUsersTemp[i].salary_history["2023"] = allUsersTemp[i].new_salary;
          allUsersTemp[i].new_salary = null;
          allUsersTemp[i].promotion_status = null;
          console.log("ULTIAMTE ULTIATE", allUsersTemp);
          setUsers(allUsersTemp);
          return;
        }
      }
    }
    const allUsersTemp = allUsers;
    for (let i = 0; i < allUsersTemp.length; ++i) {
      if (allUsersTemp[i].empNumber === user.empNumber) {
        allUsersTemp[i].promotion_status = "manager approved promotion";
        setUsers(allUsersTemp);
        return;
      }
    }
    return;
  };

  const denyPromotion = async () => {
    const allUsersTemp = allUsers;
    for (let i = 0; i < allUsersTemp.length; ++i) {
      if (allUsersTemp[i].empNumber === user.empNumber) {
        allUsersTemp[i].promotion_status = null;
        allUsersTemp[i].new_salary = null;
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
              Approve this employee's promotion
            </Typography>
            <br />
            <Typography variant="body2" color="text.secondary">
              Current Salary: {user?.salary} USD
            </Typography>
            <br />
            <Typography variant="body2" color="text.secondary">
              New Salary: {user?.new_salary} USD
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            size="small"
            color="primary"
            onClick={async () => {
              await approvePromotion();
              setOpen(false);
            }}
          >
            CONFIRM PROMOTION
          </Button>
          <Button
            size="small"
            color="error"
            onClick={async () => {
              await denyPromotion();
              setOpen(false);
            }}
          >
            DENY PROMOTION
          </Button>
        </CardActions>
      </Card>
    </Modal>
  );
}
