import { Card, CardActions, CardContent } from "@mui/material";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import {
  getValuationRequest,
  postPayment,
  updateValuationRequest,
} from "../../../services/ValuationRequest/api.js";
import UICircularIndeterminate from "../../UI/CircularIndeterminate.jsx";

const RecordReceipt = () => {
  const { requestId } = useParams();
  const queryClient = useQueryClient();
  const {
    data: valuationRequest,
    isLoading: isValuationRequestLoading,
    error,
  } = useQuery({
    queryKey: ["valuationRequest", requestId],
    queryFn: () => getValuationRequest(requestId),
  });
  if (isValuationRequestLoading) {
    return <UICircularIndeterminate />;
  }
  const { mutate: updateReceiptLink } = useMutation({
    mutationFn: (body) => {
      return updateValuationRequest(requestId, body);
    },
    onSuccess: () => {
      const paymentBody = {
        valuationRequestID: requestId,
        amount: "",
        externalTransaction: "none",
        paymentMethod: { id: 1 },
      };
      newPayment(paymentBody);
      queryClient.invalidateQueries(["valuationRequest", requestId]);
    },
  });
  const { mutate: newPayment } = useMutation({
    mutationFn: (body) => {
      return postPayment(body);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["valuationRequest", requestId]);
    },
  });

  return (
    <Paper elevation={3} sx={{ mb: 0.5, minWidth: "275px" }}>
      <Card variant="outlined">
        <CardContent>
          <Typography
            variant="h5"
            component="div"
            sx={{ fontSize: 14 }}
            color="text.secondary"
            gutterBottom
          >
            Receipt
          </Typography>
          <Typography variant="span" component="div">
            10/10/2023
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            onClick={() => {
              const reqsBody = {
                ...valuationRequest,
                receiptLink: "ahihi.pdf",
              };

              updateReceiptLink(reqsBody);
            }}
          >
            Create
          </Button>
        </CardActions>
      </Card>
    </Paper>
  );
};
export default RecordReceipt;
