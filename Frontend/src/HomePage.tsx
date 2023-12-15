/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Button,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import { useMemo, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { EditModal } from "./EditModal";
import { PromoteModal } from "./PromoteModal";
import { SalaryHistoryModal } from "./SalaryHistoryModal";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const getPromotionUpdate = (user, superUser) => {
  console.log("USER", user);
  if (!user?.promotion_status) {
    return "PROMOTE";
  }
  if (superUser.deptNo === "d01") {
    if (user.deptNo === "d01") {
      return "GO TO REQUESTS TAB TO APPROVE PROMOTION REQUEST";
    }
    if (user?.promotion_status === "employee requested for promotion") {
      return "WAIT FOR EMPLOYEE'S MANAGER APPROVAL";
    }
    if (user?.promotion_status === "manager approved promotion") {
      return "GO TO REQUESTS TAB TO APPROVE PROMOTION REQUEST";
    }
  }
  if (user?.promotion_status === "employee requested for promotion") {
    return "GO TO REQUESTS TAB TO APPROVE PROMOTION REQUEST";
  }
  if (user?.promotion_status === "manager approved promotion") {
    return "WAIT FOR HR's approval";
  }
};

export function HomePage({
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
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openPromoteModal, setOpenPromoteModal] = useState(false);
  const [openSalaryHistoryModal, setOpenSalaryHistoryModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [pageNo, setPageNo] = useState(1);

  const users = useMemo(() => {
    return allUsers.filter(
      (user) =>
        user.deptNo === selectedDept.deptNo &&
        user.empNumber !== currentUser.empNumber
    );
  }, [allUsers, currentUser.empNumber, selectedDept.deptNo]);

  const paginatedUsers = useMemo(() => {
    const arr = [];
    for (let i = (pageNo - 1) * 8; i < pageNo * 8; ++i) {
      arr.push(users[i]);
    }
    return arr;
  }, [pageNo, users]);

  console.log("paginatedUsers", paginatedUsers);

  return (
    <div className="HomePage">
      <EditModal
        open={openEditModal}
        setOpen={setOpenEditModal}
        user={selectedUser}
        allUser={allUsers}
        setUsers={setUsers}
      />
      <PromoteModal
        open={openPromoteModal}
        setOpen={setOpenPromoteModal}
        superUser={currentUser}
        user={selectedUser}
        setUsers={setUsers}
        allUsers={allUsers}
      />
      <SalaryHistoryModal
        user={selectedUser}
        open={openSalaryHistoryModal}
        setOpen={setOpenSalaryHistoryModal}
      />
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

      {paginatedUsers.map((user) => (
        <Accordion sx={{ marginTop: "10px" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>{user?.firstName + " " + user?.lastName}</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ textAlign: "left" }}>
            <Typography variant="body2" color="text.secondary">
              First Name: {user?.firstName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Last Name: {user?.lastName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Birthdate: {user?.birthDate}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Email: {user?.email}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Employee Id: {user?.empNumber}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Gender: {user?.gender === "M" ? "Male" : "Female"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Current Salary: {user?.salary} USD
            </Typography>
          </AccordionDetails>
          {(currentUser.deptNo === "d01" || currentUser.role === "Manager") && (
            <AccordionActions sx={{ justifyContent: "flex-start" }}>
              {currentUser.deptNo === "d01" && (
                <Button
                  onClick={() => {
                    setSelectedUser(user);
                    setOpenEditModal(true);
                  }}
                >
                  Edit Info
                </Button>
              )}
              <Button
                disabled={getPromotionUpdate(user, currentUser) !== "PROMOTE"}
                onClick={() => {
                  setSelectedUser(user);
                  setOpenPromoteModal(true);
                }}
              >
                {getPromotionUpdate(user, currentUser)}
              </Button>
              <Button
                onClick={() => {
                  setSelectedUser(user);
                  setOpenSalaryHistoryModal(true);
                }}
              >
                SALARY HISTORY
              </Button>
            </AccordionActions>
          )}
        </Accordion>
      ))}
      <Stack alignItems="center">
        <Pagination
          sx={{ marginTop: "15px" }}
          count={1068}
          color="primary"
          onChange={(_event, value) => {
            setPageNo(1 + (Number(value) % 6));
          }}
        />
      </Stack>
    </div>
  );
}
