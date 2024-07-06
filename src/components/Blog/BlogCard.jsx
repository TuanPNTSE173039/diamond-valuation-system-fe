import { Card, CardActions, CardContent, CardMedia } from "@mui/material";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Link, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { deleteBlog } from "../../services/api.js";
import { toast } from "react-toastify";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import * as React from "react";

const BlogCard = ({ blogId, title, description, image, creationDate, refetch, status}) => {
    const [openDeleteConfirm, setOpenDeleteConfirm] = React.useState(false);
    const formattedDate = format(new Date(creationDate), "dd MMMM yyyy");
    const formattedTime = format(new Date(creationDate), "h:mm a");
    const navigate = useNavigate();

    const handleViewClick = (blogId) => {
        navigate(`/blogs/${blogId}`);
    };

    const handleDeleteClick = () => {
        setOpenDeleteConfirm(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            await deleteBlog(blogId);
            toast.success("Blog deleted successfully");
            await refetch();
        } catch (error) {
            toast.error("Failed to delete blog");
        } finally {
            setOpenDeleteConfirm(false);
        }
    };

    const handleDeleteConfirmClose = () => {
        setOpenDeleteConfirm(false);
    };

    return (
        <Card sx={{ maxWidth: 345, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <CardMedia sx={{ height: 180 }} image={image} title={title} />
            <CardContent sx={{ flexGrow: 1 }}>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    marginBottom={1}
                >
                    <Link to={`/blogs/${blogId}`} style={{ flexBasis: '70%' }}>
                        <Typography
                            variant="subtitle1"
                            fontWeight="bold"
                            sx={{
                                marginRight: 1,
                                "&:hover": { textDecoration: "underline" },
                            }}
                        >
                            {title}
                        </Typography>
                    </Link>
                    <Stack direction="column" sx={{ flexBasis: '30%', textAlign: 'right' }}>
                        <Typography variant="subtitle2" color="text.secondary" fontWeight="bold" fontSize={15}>
                            {formattedDate}
                        </Typography>
                        <Typography variant="subtitle2" color="text.secondary" fontWeight="bold" fontSize={15}>
                            {formattedTime}
                        </Typography>
                    </Stack>
                </Stack>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 5,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        height: 80, // Fixed height for the description
                        marginTop: 1,
                    }}
                >
                    {description}
                </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <Stack direction="row" alignItems="center" spacing={1}>
                    <Typography variant="subtitle2" color="text.secondary" fontWeight="bold" fontSize={15}>
                        Status: {status}
                    </Typography>
                </Stack>
                <Stack direction="row" spacing={1}>
                    <Button size="small" variant="contained" color="primary" onClick={() => handleViewClick(blogId)}>
                        View
                    </Button>
                    <Button size="small" variant="contained" color="secondary" onClick={handleDeleteClick}>
                        Delete
                    </Button>
                </Stack>
            </CardActions>

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={openDeleteConfirm}
                onClose={handleDeleteConfirmClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
                <DialogContent>
                    <Typography id="alert-dialog-description">
                        Are you sure you want to delete this blog?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteConfirmClose} variant="text">
                        Cancel
                    </Button>
                    <Button onClick={handleDeleteConfirm} variant="contained" color="secondary">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Card>
    );
};

export default BlogCard;
