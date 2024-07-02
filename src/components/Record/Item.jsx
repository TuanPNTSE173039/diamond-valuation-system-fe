import {Card, CardActions, CardContent} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import {useNavigate, useParams} from "react-router-dom";
import {formattedDate} from "../../utilities/formatter.js";
import {convertRecordStatus} from "../../utilities/Status.jsx";

const RecordItem = ({ title, navLink, status, date }) => {
  const navigate = useNavigate();
  const { requestId } = useParams();

  function handleNavigateToDetail() {
    navigate(navLink);
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
            {convertRecordStatus(status === null || status === undefined ? "Not yet" : (status === true ? "Done" : "Processing"))}
          </Box>
        </CardContent>
        <CardActions>
          <Typography
            variant="span"
            component="div"
            sx={{ fontSize: 14, ml: 1, width: "40%" }}
          >
            {date ? formattedDate(date) : ""}
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
              variant="outlined"
              onClick={handleNavigateToDetail}
            >
              Detail
            </Button>
          </Box>
        </CardActions>
      </Card>
    </Paper>
  );
};

export default RecordItem;
