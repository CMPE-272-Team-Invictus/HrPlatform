import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import "./App.css";
import { useMemo, useState } from "react";
import { SideDeptNav } from "./SideDeptNav";
import { AppBarActionButtons } from "./AppBarActionButtons";
import { HomePage } from "./HomePage";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { departments as dpt, users as usersUtils } from "./utils";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./LoginButton";
import { useLocalStorage } from "usehooks-ts";
import { RequestPage } from "./RequestPage";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const createUser = (authUser, empNumber) => {
  return {
    empNumber,
    birthDate: "1998-12-10",
    firstName: authUser.name,
    lastName: authUser.nickname,
    gender: "M",
    hireDate: "2023-12-10",
    role: "Manager",
    email: authUser.email,
    salary: 10000,
    deptNo: "d01",
  };
};

function App() {
  // const { logout } = useAuth0();
  // logout({ logoutParams: { returnTo: window.location.origin } });
  const [users, setUsers] = useLocalStorage("userHash", usersUtils);
  const { user: authUser, isAuthenticated, isLoading } = useAuth0();

  const departments = dpt;
  const userIndex = useMemo(() => {
    if (!isAuthenticated) {
      return 0;
    }
    let userIndex = null;
    for (let i = 0; i < users.length; ++i) {
      if (users[i].email === authUser?.email) {
        userIndex = i;
        break;
      }
    }
    if (userIndex === null) {
      userIndex = users.length;
    }
    return userIndex;
  }, [authUser, isAuthenticated, users]);

  if (userIndex === users.length) {
    let data = [];
    data = Array.from(users);
    data.push(createUser(authUser, users.length + 100));
    setUsers(data);
  }

  const user = users[userIndex];

  console.log("ULTIMATE", user);

  const [showRequests, setShowRequests] = useState(false);
  const [selectedDept, setSelectedDept] = useState(departments[0]);

  let departmentName;

  if (user?.deptNo === "d01") {
    departmentName = "HR";
  } else if (user?.deptNo === "d02") {
    departmentName = "Finance";
  } else if (user?.deptNo === "d03") {
    departmentName = "Sales";
  } else {
    departmentName = "Marketing";
  }

  if (isLoading) {
    return <></>;
  }

  if (!user) {
    return <></>;
  }

  if (!isAuthenticated) {
    return (
      <Box
        sx={{
          display: "flex",
        }}
      >
        <LoginButton />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        // flexGrow: 1,
        alignContent: "flex-start",
      }}
    >
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ textAlign: "left", flexGrow: 1 }}
          >
            {user!.firstName} {user!.lastName} &nbsp;|&nbsp; {user!.role} of "
            {departmentName} division"
          </Typography>

          <AppBarActionButtons
            allUser={users}
            setUsers={setUsers}
            user={user}
            showRequests={showRequests}
            setShowRequests={setShowRequests}
          />
        </Toolbar>
      </AppBar>
      {user.deptNo === "d01" && (
        <SideDeptNav
          departments={departments}
          setSelectedDept={setSelectedDept}
        />
      )}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          p: 3,
          marginTop: "20px",
          // marginBottom: "650px",
        }}
      >
        {showRequests ? (
          <RequestPage
            selectedDept={selectedDept}
            currentUserIndex={userIndex}
            allUsers={users}
            setUsers={setUsers}
          />
        ) : (
          <HomePage
            selectedDept={selectedDept}
            currentUserIndex={userIndex}
            allUsers={users}
            setUsers={setUsers}
          />
        )}
      </Box>
    </Box>
  );
}

export default App;
