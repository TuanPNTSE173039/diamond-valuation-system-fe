import { Card, CardActions, CardContent } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";
import { useRequest } from "../../services/requests.js";
import UICircularIndeterminate from "../UI/CircularIndeterminate.jsx";

const RecordItem = ({ title, mode, handleMode, status, date }) => {
  const { requestId } = useParams();
  const { data: request, isLoading: isRequestLoading } = useRequest(requestId);
  if (isRequestLoading) {
    return <UICircularIndeterminate />;
  }
  return (
    <Paper elevation={3} sx={{ mb: 0.5, minWidth: "275px" }}>
      <Card variant="outlined">
        <CardContent>
          <Box
            component="div"
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            <Typography
              variant="h5"
              sx={{ fontSize: 20, fontWeight: "600" }}
              color="text.secondary"
            >
              {title}
            </Typography>
            <Typography variant="p">{status}</Typography>
          </Box>
        </CardContent>
        <CardActions>
          <Typography
            variant="span"
            component="div"
            sx={{ fontSize: 14, ml: 1, width: "40%" }}
          >
            {date}
          </Typography>

          <Box
            sx={{
              width: "60%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ flex: 1 }}></Box>
            <Button
              size="small"
              variant={!mode ? "contained" : "outlined"}
              onClick={handleMode}
            >
              {!mode ? "Create" : "Detail"}
            </Button>
          </Box>
        </CardActions>
      </Card>
    </Paper>
  );
};

export default RecordItem;
