import { Grid } from "@mui/material";
import BlogCard from "./BlogCard.jsx";
import { useBlogs } from "../../services/blogs.js";
import UICircularIndeterminate from "../UI/CircularIndeterminate.jsx";
import DOMPurify from "dompurify";
import parse from "html-react-parser";

const BlogGrid = ({ page, rowsPerPage, status }) => {
    const { data: blogList, isLoading, refetch } = useBlogs(page, rowsPerPage, status);

    if (isLoading) return <UICircularIndeterminate />;

    return (
        <Grid container spacing={3}>
            {blogList?.map((blog) => (
                <Grid item xs={4} key={blog.id}>
                    <BlogCard
                        blogId={blog.id}
                        title={blog.title}
                        content={parse(DOMPurify.sanitize(blog.content))}
                        image={blog.thumbnail}
                        creationDate={blog.creationDate}
                        refetch={refetch}
                    />
                </Grid>
            ))}
        </Grid>
    );
};

export default BlogGrid;
