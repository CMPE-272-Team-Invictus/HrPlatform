/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAuth0 } from "@auth0/auth0-react";
import { Alert, Box, Button, Snackbar } from "@mui/material";
import { useState } from "react";
import { InfoModal } from "./InfoModal";
import { EditInfoModal } from "./EditInfoModal";
import { PromotionApplyModal } from "./PromotionApplyModal";
import { AddStaffModal } from "./AddStaffModal";

export function AppBarActionButtons({
  user,
  showRequests,
  setShowRequests,
  allUser,
  setUsers,
}: {
  user: any;
  showRequests: boolean;
  setShowRequests: (item: boolean) => void;
  allUser: any[];
  setUsers: (item: any) => void;
}) {
  const { logout } = useAuth0();
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showEditInfoModal, setShowEditInfoModal] = useState(false);
  const [showPromotionApplyModal, setShowPromotionApplyModal] = useState(false);
  const [showSnackBar, setShowSnackBar] = useState(false);
  const [showAddStaffModal, setShowAddStaffModal] = useState(false);

  return (
    <Box sx={{ display: "flex" }}>
      <AddStaffModal
        open={showAddStaffModal}
        setOpen={setShowAddStaffModal}
        allUser={allUser}
        setUsers={setUsers}
      />
      <InfoModal user={user} open={showInfoModal} setOpen={setShowInfoModal} />
      <EditInfoModal
        user={user}
        open={showEditInfoModal}
        setOpen={setShowEditInfoModal}
        allUser={allUser}
        setUsers={setUsers}
      />
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={showSnackBar}
        autoHideDuration={6000}
        onClose={() => {
          setShowSnackBar(false);
        }}
      >
        <Alert
          onClose={() => {
            setShowSnackBar(false);
          }}
          severity="warning"
          sx={{ width: "100%" }}
        >
          You already have a pending promotion request
        </Alert>
      </Snackbar>

      <PromotionApplyModal
        open={showPromotionApplyModal}
        setOpen={setShowPromotionApplyModal}
        user={user}
        setUsers={setUsers}
        allUsers={allUser}
      />

      {!(user.deptNo === "d01" || user.role === "Manager") && (
        <Button
          variant="text"
          style={{ color: "white" }}
          onClick={() => {
            if (user?.promotion_status) {
              setShowSnackBar(true);
            } else {
              setShowPromotionApplyModal(true);
            }
          }}
        >
          APPLY FOR PROMOTION
        </Button>
      )}
      {user.deptNo === "d01" && !showRequests && (
        <Button
          variant="text"
          style={{ color: "white" }}
          onClick={() => {
            setShowAddStaffModal(true);
          }}
        >
          ADD NEW STAFF
        </Button>
      )}
      <Button
        variant="text"
        style={{ color: "white" }}
        onClick={() => setShowInfoModal(true)}
      >
        SHOW MY INFO
      </Button>
      <Button
        variant="text"
        style={{ color: "white" }}
        onClick={() => setShowEditInfoModal(true)}
      >
        EDIT MY INFO
      </Button>
      {(user.deptNo === "d01" || user.role !== "Employee") && (
        <Button
          variant="text"
          style={{ color: "white" }}
          onClick={() => {
            if (!showRequests) {
              setShowRequests(true);
            } else {
              setShowRequests(false);
            }
          }}
        >
          {!showRequests ? "REQUESTS" : "HOME"}
        </Button>
      )}
      <Button
        variant="text"
        style={{ color: "white" }}
        onClick={() =>
          logout({ logoutParams: { returnTo: window.location.origin } })
        }
      >
        LOGOUT
      </Button>
    </Box>
  );
}
