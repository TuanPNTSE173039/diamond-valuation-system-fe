import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { updateValuationRequest } from "../../services/api.js";
import { useRequest } from "../../services/requests.js";
import { formattedDate } from "../../utilities/formatter.js";
import UICircularIndeterminate from "../UI/CircularIndeterminate.jsx";
import RecordItem from "./Item.jsx";

export default function RecordList() {
  const navigate = useNavigate();
  const { requestId } = useParams();
  const { data: request, isLoading: isRequestLoading } = useRequest(requestId);
  const queryClient = useQueryClient();
  const { mutate: updateReceiptLink } = useMutation({
    mutationFn: (body) => {
      return updateValuationRequest(requestId, body);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["request", { requestId: requestId }],
      });
    },
  });
  const [mode, setMode] = useState({
    receipt: false,
    return: false,
    commitment: false,
    sealing: false,
  });

  const receiptStatus = !mode.receipt
    ? "Not yet"
    : request?.payment.length === 0
      ? "Processing"
      : "Done";
  const returnStatus = !mode.return
    ? "Not yet"
    : request?.payment.length === 2
      ? "Done"
      : "Processing";
  useEffect(() => {
    if (request) {
      setMode((prev) => {
        return {
          ...prev,
          receipt: request?.receiptLink !== null,
          return: request?.returnLink !== null,
        };
      });
    }
  }, [request]);

  const handleReceipt = () => {
    if (!mode.receipt) {
      updateReceiptLink({ ...request, receiptLink: "receipt.pdf" });
    } else {
      navigate("receipt");
    }
  };

  const handleReturn = () => {
    navigate("return");
  };

  const handleCommitment = () => {
    setMode((prev) => ({ ...prev, commitment: true }));
    navigate("commitment");
  };

  const handleSealing = () => {
    setMode((prev) => ({ ...prev, sealing: true }));
    navigate("sealing");
  };
  if (isRequestLoading) {
    return <UICircularIndeterminate />;
  }
  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h6" sx={{ fontWeight: "600" }}>
        Records
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
        <RecordItem
          title="Receipt"
          mode={mode.receipt}
          status={receiptStatus}
          date={formattedDate(request?.receiptDate)}
          handleMode={handleReceipt}
        />
        <RecordItem
          title="Return"
          mode={mode.return}
          status={returnStatus}
          date={formattedDate(request?.returnDate)}
          handleMode={handleReturn}
        />
        <RecordItem
          title="Commitment"
          mode={mode.commitment}
          handleMode={handleCommitment}
        />
        <RecordItem
          title="Sealing"
          mode={mode.sealing}
          handleMode={handleSealing}
        />
      </Box>
    </Box>
  );
}
