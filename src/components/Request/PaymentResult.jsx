import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { axiosInstance } from "../../services/config/axiosInstance.js";

const RequestResultPayment = () => {
  const navigate = useNavigate();
  const { requestId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  //Params
  const transactionStatus =
    searchParams.get("transaction_status") ||
    searchParams.get("vnp_TransactionStatus");
  const amount = searchParams.get("vnp_Amount") || searchParams.get("amount");
  const transactionNo = searchParams.get("vnp_TransactionNo");

  const handleBack = () => {
    navigate(`/requests/${requestId}/receipt`, { replace: true });
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
        Back to Receipt
      </Button>
    </Box>
  );
};

export default RequestResultPayment;
