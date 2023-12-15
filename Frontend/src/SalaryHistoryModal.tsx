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
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export function SalaryHistoryModal({
  open,
  setOpen,
  user,
}: {
  open: boolean;
  setOpen: (isOpen: boolean) => void;
  user: any;
}) {
  const salaryHistory = [];

  if (user) {
    for (const [key, value] of Object.entries(user.salary_history)) {
      salaryHistory.push(`${key}: ${value}`);
    }
  }

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Card sx={{ maxWidth: 400, ...style }}>
        <CardActionArea>
          <CardContent>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              SALARY HISTORY
            </Typography>
            {salaryHistory.map((item) => (
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                {item} USD
              </Typography>
            ))}
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary" onClick={() => setOpen(false)}>
            CLOSE
          </Button>
        </CardActions>
      </Card>
    </Modal>
  );
}
