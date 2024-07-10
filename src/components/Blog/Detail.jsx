import { CardMedia } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import { useBlog } from "../../services/blogs.js";
import UICircularIndeterminate from "../UI/CircularIndeterminate.jsx";
import * as React from "react";
import { format } from "date-fns";
import { deleteBlog, updateBlog } from "../../services/api.js";
import { toast } from "react-toastify";
import DOMPurify from "dompurify";
import parse from "html-react-parser";
import UIBreadCrumb from "../UI/BreadCrumb.jsx";

const BlogDetail = () => {
    const { blogId } = useParams();
    const { data: blogDetail, isLoading } = useBlog(blogId);
    const navigate = useNavigate();

    if (isLoading) {
        return <UICircularIndeterminate />;
    }

    const formattedCreationDate = format(new Date(blogDetail.creationDate), "dd MMMM yyyy, h:mm a");
    const formattedLastModifyDate = format(new Date(blogDetail.lastModifiedDate), "dd MMMM yyyy, h:mm a");
    const formattedPublishDate = blogDetail.publishedDate ? format(new Date(blogDetail.publishedDate), "dd MMMM yyyy, h:mm a") : null;

    const handleEditClick = () => {
        navigate(`/blogs/${blogId}/edit`, { state: { blog: blogDetail } });
    };

    const handleDeleteClick = async (blogId) => {
        try {
            await deleteBlog(blogId);
            toast.success("Blog deleted successfully");
            navigate("/blogs");
        } catch (error) {
            toast.error("Failed to delete blog");
        }
    };

    const handlePublishClick = async () => {
        try {
            const updatedBlog = {
                ...blogDetail,
                status: "PUBLISHED",
                publishedDate: new Date(),
            };
            await updateBlog(blogId, updatedBlog);
            toast.success("Blog updated successfully");
            navigate("/blogs");
        } catch (error) {
            toast.error("Failed to update blog");
        }
    };

    const handleUnpublishClick = async () => {
        try {
            const updatedBlog = {
                ...blogDetail,
                status: "DRAFT",
                publishedDate: null,
            };
            await updateBlog(blogId, updatedBlog);
            toast.success("Blog updated successfully");
            navigate("/blogs");
        } catch (error) {
            toast.error("Failed to update blog");
        }
    };

    const location = useLocation();
    const pathNames = location.pathname.split("/").filter((x) => x);

    return (
        <>
            <UIBreadCrumb pathNames={pathNames} />
            <Box>
                <Stack direction="row" alignItems="center" columnGap={2} mb={2}>
                    <Box flex={1}></Box>
                    {blogDetail.status === "DRAFT" ? (
                        <Button size="small" variant="contained" color="primary" onClick={handlePublishClick}>
                            Publish
                        </Button>
                    ) : (
                        <Button size="small" variant="contained" color="primary" onClick={handleUnpublishClick}>
                            Unpublish
                        </Button>
                    )}
                    <Button size="small" variant="contained" color="success" onClick={handleEditClick}>
                        Edit
                    </Button>
                    <Button
                        size="small"
                        variant="contained"
                        color="secondary"
                        onClick={() => handleDeleteClick(blogId)}
                    >
                        Delete
                    </Button>
                </Stack>
                <Box width={"70%"} margin={"0 auto"}>
                    <Typography mb={3} variant={"h3"} fontWeight={600}>
                        {blogDetail.title}
                    </Typography>
                    <Stack direction="row" justifyContent="space-between" mb={1}>
                        <Box>
                            <Typography variant="subtitle1" color="text.secondary" sx={{ textAlign: "justify" }}>
                                Author: {blogDetail.author}
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary" sx={{ textAlign: "justify" }}>
                                Status: {blogDetail.status}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography variant="subtitle1" color="text.secondary" sx={{ textAlign: "justify" }}>
                                Creation: {formattedCreationDate}
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary" sx={{ textAlign: "justify" }}>
                                Last Modified: {formattedLastModifyDate}
                            </Typography>
                            {formattedPublishDate && (
                                <Typography
                                    variant="subtitle1"
                                    color="text.secondary"
                                    sx={{ textAlign: "justify" }}
                                >
                                    Publish: {formattedPublishDate}
                                </Typography>
                            )}
                        </Box>
                    </Stack>
                </Box>
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    position="relative"
                    mb={4}
                    height="400px"
                >
                    <CardMedia
                        sx={{
                            width: "70%",
                            height: "100%",
                            objectFit: "cover",
                        }}
                        image={blogDetail.thumbnail}
                        title={blogDetail.title}
                    />
                </Box>
                <Box width={"70%"} margin={"0 auto"}>
                    <Typography mb={2} textAlign="justify">
                        {parse(DOMPurify.sanitize(blogDetail.content))}
                    </Typography>
                    <Typography>
                        Resource:{" "}
                        <a href={blogDetail.reference} target="_blank" rel="noopener noreferrer">
                            {blogDetail.reference}
                        </a>
                    </Typography>
                </Box>
            </Box>
        </>
    );
};

export default BlogDetail;
