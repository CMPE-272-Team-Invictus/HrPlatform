/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Button,
  Typography,
} from "@mui/material";
import { useMemo } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export function RequestPage({
  selectedDept,
  currentUserIndex,
  allUsers,
  setUsers,
}: {
  selectedDept: { deptName: string; deptNo: string };
  currentUserIndex: number;
  allUsers: any[];
  setUsers: (item: any) => void;
}) {
  const currentUser = allUsers[currentUserIndex];
  // const [openApprovePromoteModal, setApprovePromoteModal] = useState(false);
  // const [selectedUser, setSelectedUser] = useState(null);

  const users = useMemo(() => {
    if (currentUser.deptNo !== "d01") {
      return allUsers.filter(
        (user) =>
          user.deptNo === selectedDept.deptNo &&
          user.empNumber !== currentUser.empNumber &&
          user.promotion_status === "employee requested for promotion"
      );
    }
    return allUsers.filter(
      (user) =>
        user.deptNo === selectedDept.deptNo &&
        user.empNumber !== currentUser.empNumber &&
        Boolean(user?.promotion_status)
    );
  }, [
    allUsers,
    currentUser.deptNo,
    currentUser.empNumber,
    selectedDept.deptNo,
  ]);

  console.log("POPOPOPOPOPOPOP", users);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const approvePromotion = async (user) => {
    if (currentUser.deptNo === "d01") {
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

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const denyPromotion = async (user) => {
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
    <div className="HomePage">
      {/* <ApprovePromoteModal
        open={openApprovePromoteModal}
        setOpen={setApprovePromoteModal}
        superUser={currentUser}
        user={selectedUser}
        setUsers={setUsers}
        allUsers={allUsers}
      /> */}

      <Alert variant="filled" severity="info" icon={false}>
        {selectedDept.deptName}{" "}
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        DEPT_NO: {selectedDept.deptNo}
      </Alert>

      {users.map((user) => (
        <Accordion sx={{ marginTop: "10px" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>{user.firstName + " " + user.lastName}</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ textAlign: "left" }}>
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
          </AccordionDetails>
          <AccordionActions sx={{ justifyContent: "flex-start" }}>
            <Button
              size="small"
              color="primary"
              onClick={async () => {
                await approvePromotion(user);
              }}
            >
              CONFIRM PROMOTION
            </Button>
            <Button
              size="small"
              color="error"
              onClick={async () => {
                await denyPromotion(user);
              }}
            >
              DENY PROMOTION
            </Button>
          </AccordionActions>
        </Accordion>
      ))}
    </div>
  );
}
