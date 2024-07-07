import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { axiosInstance } from "../../services/config/axiosInstance.js";

const RequestResultPayment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { requestId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [recordMode, setRecordMode] = useState("");

  //Params
  const transactionStatus =
    searchParams.get("transaction_status") ||
    searchParams.get("vnp_TransactionStatus");
  const amount = searchParams.get("vnp_Amount") || searchParams.get("amount");
  const transactionNo = searchParams.get("vnp_TransactionNo");

  const handleBack = () => {
    navigate(`/requests/${requestId}/${recordMode}`, { replace: true });
  };

  //save to db if transaction successful
  const { mutate: saveTransaction } = useMutation({
    mutationFn: (body) => {
      return axiosInstance.post(`payments`, body);
    },
  });
  useEffect(() => {
    if (transactionStatus === "00") {
      saveTransaction({
        amount,
        paymentMethod: {
          id: transactionNo ? 2 : 1,
        },
        valuationRequestID: requestId,
      });
    }
    if (location.pathname.includes("/receipt/")) {
      setRecordMode("receipt");
    } else if (location.pathname.includes("/return/")) {
      setRecordMode("return");
    }
  }, []);

  return (
    <Box textAlign="center">
      <Typography fontSize={35} fontWeight={700}>
        Payment Result
      </Typography>
      <Typography
        fontSize={25}
        fontWeight={600}
        mb={10}
        color={
          transactionStatus === "00" ? "status.processing" : "secondary.main"
        }
      >
        {transactionStatus === "00"
          ? "Transaction successful"
          : "Transaction failed"}
      </Typography>
      <Button variant="contained" onClick={handleBack}>
        <ArrowBackIcon />
        Back to {recordMode === "receipt" ? "Receipt" : "Return"}
      </Button>
    </Box>
  );
};

export default RequestResultPayment;
