import { Card, CardActions, CardContent } from "@mui/material";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const RecordSealed = () => {
  return (
    <>
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
              Sealed
            </Typography>
            <Typography variant="span" component="div">
              10/10/2023
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Create</Button>
          </CardActions>
        </Card>
      </Paper>
    </>
  );
};
export default RecordSealed;
