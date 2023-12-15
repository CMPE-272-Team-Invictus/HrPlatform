import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
} from "@mui/material";
import { useEffect, useState } from "react";

const drawerWidth = 240;

type Department = {
  deptName: string;
  deptNo: string;
};

export function SideDeptNav({
  departments,
  setSelectedDept,
}: {
  departments: Department[];
  setSelectedDept: (department: Department) => void;
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    setSelectedDept(departments[selectedIndex]);
  }, [departments, selectedIndex, setSelectedDept]);

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>
        <List>
          {departments.map((department, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton
                selected={selectedIndex === index}
                onClick={() => setSelectedIndex(index)}
              >
                <ListItemText primary={department.deptName} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}
