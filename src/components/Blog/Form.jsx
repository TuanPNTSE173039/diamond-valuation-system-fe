import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import * as Yup from "yup";
import UIBasicHeader from "../UI/BasicHeader.jsx";
import { postBlog, updateBlog } from "../../services/api.js";
import { toast } from "react-toastify";
import UIRichTextEditor from "../UI/RichTextEditor.jsx";
import { useLocation, useNavigate } from "react-router-dom";

const BlogForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const blogDetail = location.state?.blog;
  const blogId = blogDetail?.id;

  const handleAddSave = async (values) => {
    const blogData = {
      title: values.title,
      author: values.author,
      reference: values.reference,
      content: values.content,
      thumbnail: values.thumbnail,
    };

    try {
      if (blogId) {
        await updateBlog(blogId, blogData);
        toast.success("Blog updated successfully");
      } else {
        await postBlog(blogData);
        toast.success("Blog added successfully");
      }
      navigate("/blogs");
    } catch (error) {
      toast.error("Failed to save blog");
    }
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string()
        .min(2, "Minimum 2 characters")
        .max(100, "Maximum 100 characters")
        .required("Title is required"),
    author: Yup.string().required("Author is required"),
    reference: Yup.string().url("Invalid URL").required("Reference URL is required"),
    content: Yup.string()
        .min(1, "Minimum 1 character")
        .max(5000, "Maximum 5000 characters")
        .required("Content is required"),
    thumbnail: Yup.string().required("Thumbnail is required"),
  });

  const formik = useFormik({
    initialValues: {
      title: blogDetail?.title || "",
      author: blogDetail?.author || "",
      reference: blogDetail?.reference || "",
      content: blogDetail?.content || "",
      thumbnail: blogDetail?.thumbnail || "",
    },
    validationSchema: validationSchema,
    onSubmit: handleAddSave,
  });

  const handleContentChange = (content) => {
    formik.setFieldValue("content", content);
  };

  return (
      <>
        <Box>BreadCrumb</Box>
        <UIBasicHeader title={blogId ? "Edit a post" : "Create a new post"} />
        <Box component="form" onSubmit={formik.handleSubmit}>
          <Paper
              elevation={1}
              sx={{ width: "70%", margin: "0 auto", mt: 5, borderRadius: 4 }}
          >
            <Box p={3} borderBottom={"1px solid #ddd"}>
              <Typography fontSize={20} fontWeight={700}>
                Detail
              </Typography>
              <Typography fontSize={14} color="#333">
                Title, short description, image, ...
              </Typography>
            </Box>
            <Box p={"8px 24px 24px 24px"}>
              <TextField
                  margin="normal"
                  fullWidth
                  id="title"
                  type="text"
                  name="title"
                  label="Title"
                  InputProps={{ sx: { borderRadius: 2 } }}
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.title && Boolean(formik.errors.title)}
                  helperText={formik.touched.title && formik.errors.title}
              />
              <TextField
                  margin="normal"
                  multiline
                  fullWidth
                  id="author"
                  type="text"
                  name="author"
                  label="Author"
                  InputProps={{ sx: { borderRadius: 2 } }}
                  value={formik.values.author}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.author && Boolean(formik.errors.author)}
                  helperText={formik.touched.author && formik.errors.author}
              />
              <TextField
                  margin="normal"
                  fullWidth
                  id="reference"
                  type="text"
                  name="reference"
                  label="Reference"
                  InputProps={{ sx: { borderRadius: 2 } }}
                  value={formik.values.reference}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.reference && Boolean(formik.errors.reference)}
                  helperText={formik.touched.reference && formik.errors.reference}
              />
              <Box mt={2.5}>
                <Typography fontSize={16} fontWeight={700} mb={0.7}>
                  Content
                </Typography>
                <UIRichTextEditor
                    value={formik.values.content}
                    onChange={handleContentChange}
                    isDisabled={false}
                />
                {formik.touched.content && formik.errors.content && (
                    <Typography color="error">{formik.errors.content}</Typography>
                )}
              </Box>
              <TextField
                  margin="normal"
                  fullWidth
                  id="thumbnail"
                  type="text"
                  name="thumbnail"
                  label="Thumbnail"
                  InputProps={{ sx: { borderRadius: 2 } }}
                  value={formik.values.thumbnail}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.thumbnail && Boolean(formik.errors.thumbnail)}
                  helperText={formik.touched.thumbnail && formik.errors.thumbnail}
              />
            </Box>
          </Paper>
          <Box width="70%" margin="0 auto" mt={4} mb={8}>
            <Stack direction="row" gap={2}>
              <Box flex={1}></Box>
              <Button variant={"outlined"} type="button">
                Preview
              </Button>
              <Button variant={"contained"} type="submit">
                {blogId ? "Update" : "Save Changes"}
              </Button>
            </Stack>
          </Box>
        </Box>
      </>
  );
};

export default BlogForm;
