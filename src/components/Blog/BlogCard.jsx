import { Card, CardActions, CardContent, CardMedia } from "@mui/material";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {Link, useNavigate} from "react-router-dom";
import { format } from "date-fns";
import {deleteBlog} from "../../services/api.js";
import {toast} from "react-toastify";

const BlogCard = ({ blogId ,title, content, image, creationDate, refetch }) => {
    const formattedDate = format(new Date(creationDate), "dd MMMM yyyy, h:mm a");
    const navigate = useNavigate();

    const truncateContent = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + "...";
        }
        return text;
    };

    const handleViewClick = (blogId) => {
        navigate(`/blogs/${blogId}`);
    }
    const handleDeleteClick = async (blogId) => {
        try {
            await deleteBlog(blogId);
            toast.success("Blog deleted successfully");
            await refetch();
        } catch (error) {
            toast.error("Failed to delete blog");
        }
    }

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia sx={{ height: 180 }} image={image} title={title} />
            <CardContent>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    marginBottom={1}
                >
                    <Link to={`/blogs/${blogId}`}>
                        <Typography
                            variant="subtitle1"
                            fontWeight="bold"
                            sx={{
                                flexGrow: 1,
                                marginRight: 1,
                                "&:hover": { textDecoration: "underline" },
                            }}
                        >
                            {title}
                        </Typography>
                    </Link>
                    <Typography variant="subtitle2" color="text.secondary" fontWeight="bold" fontSize={10}>
                        {formattedDate}
                    </Typography>
                </Stack>
                <Typography
                    lineHeight="20px"
                    variant="body2"
                    color="text.secondary"
                    sx={{ display: "-webkit-box", WebkitBoxOrient: "vertical", WebkitLineClamp: 5, overflow: "hidden" }}
                >
                    {truncateContent(content, 150)}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" variant="contained" color="primary"  onClick={() => handleViewClick(blogId)}>
                    View
                </Button>
                <Button size="small" variant="contained" color="secondary" onClick={() => handleDeleteClick(blogId)}>
                    Delete
                </Button>
            </CardActions>
        </Card>
    );
};

export default BlogCard;
