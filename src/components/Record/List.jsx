import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecords } from "../../services/records.js";
import { useRequest } from "../../services/requests.js";
import UICircularIndeterminate from "../UI/CircularIndeterminate.jsx";
import RecordItem from "./Item.jsx";

export default function RecordList() {
  const { requestId } = useParams();
  const { data: request, isLoading: isRequestLoading } = useRequest(requestId);
  const { data: records, isFetching: isRecordFetching } = useRecords(requestId);

  const [recordInfo, setRecordInfo] = useState({
    receiptRecord: null,
    returnRecord: null,
    commitmentRecord: null,
    sealingRecord: null,
  });

  useEffect(() => {
    if (records) {
      const receipt = records.find((record) => record.type === "RECEIPT");
      const returned = records.find((record) => record.type === "RETURN");
      const commitment = records.find((record) => record.type === "COMMITMENT");
      const sealing = records.find((record) => record.type === "SEALING");
      setRecordInfo((prev) => {
        return {
          ...prev,
          receiptRecord: receipt,
          returnRecord: returned,
          commitmentRecord: commitment,
          sealingRecord: sealing,
        };
      });
    }
  }, [records]);

  if (isRequestLoading || isRecordFetching) {
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
          navLink="receipt"
          status={recordInfo.receiptRecord?.status}
          date={recordInfo.receiptRecord?.creationDate}
        />
        <RecordItem
          title="Return"
          navLink="return"
          status={recordInfo.returnRecord?.status}
          date={recordInfo.returnRecord?.creationDate}
        />
        <RecordItem
          title="Commitment"
          navLink="commitment"
          status={recordInfo.commitmentRecord?.status}
          date={recordInfo.commitmentRecord?.creationDate}
        />
        <RecordItem
          title="Sealing"
          navLink="sealing"
          status={recordInfo.sealingRecord?.status}
          date={recordInfo.sealingRecord?.creationDate}
        />
      </Box>
    </Box>
  );
}
