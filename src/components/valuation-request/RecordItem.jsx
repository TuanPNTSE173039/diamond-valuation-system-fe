import Box from "@mui/material/Box";
import { Card, CardActions, CardContent } from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function RecordItem({ title, creationDate }) {
  return (
    <Box sx={{ mb: 0.5, minWidth: "275px" }}>
      <Card variant="outlined">
        <CardContent>
          <Typography
            variant="h5"
            component="div"
            sx={{ fontSize: 14 }}
            color="text.secondary"
            gutterBottom
          >
            {title}
          </Typography>
          <Typography variant="span" component="div">
            {creationDate}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Create</Button>
        </CardActions>
      </Card>
    </Box>
  );
}
