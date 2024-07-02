import {Card, CardActions, CardContent} from "@mui/material";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useNavigate, useParams} from "react-router-dom";
import {toast} from "react-toastify";
import {postPayment, updateValuationRequest} from "../../services/api.js";
import {useRequest} from "../../services/requests.js";

const RecordReceipt = () => {
  const navigate = useNavigate();

  const { requestId } = useParams();
  const queryClient = useQueryClient();
  const { data: valuationRequest } = useRequest(requestId);
  const { mutate: updateReceiptLink } = useMutation({
    mutationFn: (body) => {
      return updateValuationRequest(requestId, body);
    },
    onSuccess: () => {
      const paymentBody = {
        valuationRequestID: requestId,
        paymentMethod: { id: 1 },
      };
      newPayment(paymentBody);
      queryClient.invalidateQueries({
        queryKey: ["request", { requestId: requestId }],
      });
      toast.success("Update successfully");
    },
  });
  const { mutate: newPayment } = useMutation({
    mutationFn: (body) => {
      return postPayment(body);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["request", { requestId: requestId }],
      });
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
              // const reqsBody = {
              //   ...valuationRequest,
              //   receiptLink: "ahihi.pdf",
              // };
              // updateReceiptLink(reqsBody);
              navigate(`/request/${requestId}/receipt`);
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
