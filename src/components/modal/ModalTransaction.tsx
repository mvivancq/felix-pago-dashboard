import { FC } from "react";
import {
  Modal,
  ModalDialog,
  Typography,
  Button,
  Stack,
  Card,
  Divider,
  Box,
  Grid,
  Chip,
} from "@mui/joy";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import EventIcon from "@mui/icons-material/Event";
import PaymentIcon from "@mui/icons-material/Payment";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from "@mui/icons-material/CheckCircle"; // Completed
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty"; // Pending
import CancelIcon from "@mui/icons-material/Cancel"; // Failed
import SwapHorizIcon from "@mui/icons-material/SwapHoriz"; // Exchange Rate
import { Row } from "../../types/dashboard";
import { formatUSD } from "../../utils/tableUtils";

interface ModalTransactionProps {
  open: boolean;
  onClose: () => void;
  transaction: Row | null;
}

const getStatusInfo = (status: string) => {
  switch (status.toLowerCase()) {
    case "completed":
      return { color: "success", icon: <CheckCircleIcon />, text: "Completed" };
    case "pending":
      return { color: "warning", icon: <HourglassEmptyIcon />, text: "Pending" };
    case "failed":
      return { color: "danger", icon: <CancelIcon />, text: "Failed" };
    default:
      return { color: "neutral", icon: null, text: status };
  }
};

const ModalTransaction: FC<ModalTransactionProps> = ({ open, onClose, transaction }) => {
  if (!transaction) return null;

  // Cálculos adicionales
  const feesPercentage = 0.05; // 5% fees
  const fees = transaction.amount_sent * feesPercentage;
  const totalReceived = transaction.amount_received - fees;

  const { color, icon, text } = getStatusInfo(transaction.status);

  return (
    <Modal open={open} onClose={onClose}>
      <ModalDialog
        sx={{
          width: "90vw",
          maxWidth: 500,
          borderRadius: "md",
          padding: 3,
          maxHeight: "90vh", // Hace scrollable si es necesario
          overflowY: "auto",
          "@media (max-width: 600px)": {
            width: "100vw", // Pantalla completa en móvil
            height: "100vh", // Ocupa toda la altura en móvil
            maxWidth: "100%",
            borderRadius: 0,
          },
        }}
      >
        {/* Encabezado */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography level="h4">Transaction Details</Typography>
          <Button variant="plain" onClick={onClose}>
            <CloseIcon />
          </Button>
        </Box>

        <Divider sx={{ marginY: 1 }} />

        {/* Estado de la transacción */}
        <Box display="flex" justifyContent="center" mb={2}>
          <Chip color={color} startDecorator={icon} size="lg">
            {text}
          </Chip>
        </Box>

        {/* Datos de la transacción */}
        <Stack spacing={2}>
          {/* Transaction ID alineado con todas las filas */}
          <Grid container spacing={2}>
            <Grid xs={12}>
              <Card variant="outlined" sx={{ padding: 1.5, flexGrow: 1 }}>
                <Typography level="title-sm">
                  <PaymentIcon sx={{ marginRight: 1, verticalAlign: "middle" }} />
                  Transaction ID:
                </Typography>
                <Typography>{transaction.transaction_id}</Typography>
              </Card>
            </Grid>
          </Grid>

          {/* Sender y Receiver en la misma fila */}
          <Grid container spacing={2}>
            <Grid xs={6} sx={{ display: "flex" }}>
              <Card variant="outlined" sx={{ padding: 1.5, flexGrow: 1 }}>
                <Typography level="title-sm">
                  <PhoneAndroidIcon sx={{ marginRight: 1, verticalAlign: "middle" }} />
                  Sender
                </Typography>
                <Typography>{transaction.sender_whatsapp}</Typography>
              </Card>
            </Grid>
            <Grid xs={6} sx={{ display: "flex" }}>
              <Card variant="outlined" sx={{ padding: 1.5, flexGrow: 1 }}>
                <Typography level="title-sm">
                  <PhoneAndroidIcon sx={{ marginRight: 1, verticalAlign: "middle" }} />
                  Receiver
                </Typography>
                <Typography>{transaction.receiver_whatsapp}</Typography>
              </Card>
            </Grid>
          </Grid>

          {/* Exchange Rate ocupa dos columnas encima de Amount Sent y Amount Received */}
          <Grid container spacing={2}>
            <Grid xs={12} sx={{ display: "flex" }}>
              <Card variant="outlined" sx={{ padding: 1.5, flexGrow: 1 }}>
                <Typography level="title-sm">
                  <SwapHorizIcon sx={{ marginRight: 1, verticalAlign: "middle" }} />
                  Exchange Rate
                </Typography>
                <Typography>1 USD = {transaction.exchange_rate.toFixed(2)} {transaction.currency}</Typography>
              </Card>
            </Grid>
          </Grid>

          {/* Amount Sent y Amount Received en la misma fila */}
          <Grid container spacing={2}>
            <Grid xs={6} sx={{ display: "flex" }}>
              <Card variant="outlined" sx={{ padding: 1.5, flexGrow: 1 }}>
                <Typography level="title-sm">
                  <AttachMoneyIcon sx={{ marginRight: 1, verticalAlign: "middle" }} />
                  Amount Sent
                </Typography>
                <Typography>${transaction.amount_sent.toFixed(2)} USD</Typography>
              </Card>
            </Grid>
            <Grid xs={6} sx={{ display: "flex" }}>
              <Card variant="outlined" sx={{ padding: 1.5, flexGrow: 1 }}>
                <Typography level="title-sm">
                  <AttachMoneyIcon sx={{ marginRight: 1, verticalAlign: "middle" }} />
                  Amount Received
                </Typography>
                <Typography>${transaction.amount_received.toFixed(2)} {transaction.currency}</Typography>
              </Card>
            </Grid>
          </Grid>

          {/* Fees y Total Received en la misma fila */}
          <Grid container spacing={2}>
            <Grid xs={6} sx={{ display: "flex" }}>
              <Card variant="outlined" sx={{ padding: 1.5, flexGrow: 1 }}>
                <Typography level="title-sm">
                  <AttachMoneyIcon sx={{ marginRight: 1, verticalAlign: "middle" }} />
                  Fees (5%)
                </Typography>
                <Typography>{`- ${formatUSD(fees)}`}</Typography>
              </Card>
            </Grid>
            <Grid xs={6} sx={{ display: "flex" }}>
              <Card variant="outlined" sx={{ padding: 1.5, flexGrow: 1 }}>
                <Typography level="title-sm">
                  <AttachMoneyIcon sx={{ marginRight: 1, verticalAlign: "middle" }} />
                  Total Received (after fees)
                </Typography>
                <Typography>{formatUSD(totalReceived)}</Typography>
              </Card>
            </Grid>
          </Grid>

          {/* Payment Method y Date en la misma fila */}
          <Grid container spacing={2}>
            <Grid xs={6} sx={{ display: "flex" }}>
              <Card variant="outlined" sx={{ padding: 1.5, flexGrow: 1 }}>
                <Typography level="title-sm">
                  <AccountBalanceWalletIcon sx={{ marginRight: 1, verticalAlign: "middle" }} />
                  Payment Method
                </Typography>
                <Typography>{transaction.payment_method}</Typography>
              </Card>
            </Grid>
            <Grid xs={6} sx={{ display: "flex" }}>
              <Card variant="outlined" sx={{ padding: 1.5, flexGrow: 1 }}>
                <Typography level="title-sm">
                  <EventIcon sx={{ marginRight: 1, verticalAlign: "middle" }} />
                  Date
                </Typography>
                <Typography>{new Date(transaction.date).toLocaleString()}</Typography>
              </Card>
            </Grid>
          </Grid>

          <Divider />

          {/* Botón correctamente alineado dentro del modal */}
          <Box display="flex" justifyContent="flex-end">
            <Button onClick={onClose} variant="solid" color="primary">
              Close
            </Button>
          </Box>
        </Stack>
      </ModalDialog>
    </Modal>
  );
};

export default ModalTransaction;
