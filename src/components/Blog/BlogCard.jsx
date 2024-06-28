import { Card, CardActions, CardContent, CardMedia } from "@mui/material";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

const BlogCard = ({ title, description, image }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image="https://pub-c5e31b5cdafb419fb247a8ac2e78df7a.r2.dev/mock/assets/images/cover/cover-1.webp"
        title="green iguana"
      />
      <CardContent>
        <Stack direction="row" justifyContent="space-between" marginBottom={1}>
          <Typography>Draft</Typography>
          <Typography>26 Jun 2024</Typography>
        </Stack>
        <Typography
          gutterBottom
          variant="p"
          textAlign="justify"
          component="div"
          fontSize={14}
          fontWeight={600}
          sx={{ "&:hover": { textDecoration: "underline" } }}
        >
          <Link to={"id"}>
            The Future of Renewable Energy: Innovations and Challenges Ahead
          </Link>
        </Typography>
        <Typography
          lineHeight="20px"
          whiteSpace="nowrap"
          variant="body2"
          color="text.secondary"
          textOverflow="ellipsis"
          overflow="hidden"
        >
          Lorem ipsum dolor sit amet,asdjf;askjf consectetur adipisicing elit.
          At dolorem error inventore iure nesciunt nostrum, veniam. Aut facere
          laborum quaerat quasi qui rerum, sapiente sequi? Blanditiis quaerat
          quod ut velit.
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant="contained" color="primary">
          View
        </Button>
        <Button size="small" variant="contained" color="success">
          Edit
        </Button>
        <Button size="small" variant="contained" color="secondary">
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default BlogCard;
