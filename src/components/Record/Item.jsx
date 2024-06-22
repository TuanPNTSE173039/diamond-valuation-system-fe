import { Card, CardActions, CardContent } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const RecordItem = ({ title, mode, handleMode }) => {
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
            <Typography variant="p">status</Typography>
          </Box>
          <Typography
            variant="span"
            component="div"
            sx={{ mt: 1, fontSize: 14 }}
          >
            {/* Date from BE */}
            10/10/2022
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            variant={mode ? "contained" : "text"}
            onClick={handleMode}
          >
            {mode ? "Create" : "View"}
          </Button>
        </CardActions>
      </Card>
    </Paper>
  );
};

export default RecordItem;
