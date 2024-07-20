import CloudUploadIcon from "@mui/icons-material/CloudUpload.js";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline.js";
import { CardMedia } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { VisuallyHiddenInput } from "../../assets/styles/Input.jsx";
import { postBlog, updateBlog } from "../../services/api.js";
import { storage } from "../../services/config/firebase.js";
import { metadata } from "../Detail/Item.jsx";
import UIBasicHeader from "../UI/BasicHeader.jsx";
import UIBreadCrumb from "../UI/BreadCrumb.jsx";
import UIRichTextEditor from "../UI/RichTextEditor.jsx";

const BlogForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const blogDetail = location.state?.blog;
  const blogId = blogDetail?.id;

  const [submittedBlogId, setSubmittedBlogId] = useState(null);

  const handleAddSave = async (values) => {
    const blogData = {
      title: values.title,
      author: values.author,
      reference: values.reference,
      content: values.content,
      description: values.description,
      thumbnail: values.thumbnail,
    };

    try {
      let response;
      if (blogId) {
        response = await updateBlog(blogId, blogData);
        toast.success("Blog updated successfully");
      } else {
        response = await postBlog(blogData);
        toast.success("Blog added successfully");
      }

      const submittedId = response.data.id; // Assuming your API response structure returns an 'id'
      setSubmittedBlogId(submittedId);
      navigate(`/blogs/${submittedId}`);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .min(2, "Minimum 2 characters")
      .max(100, "Maximum 100 characters")
      .required("Title is required"),
    author: Yup.string().required("Author is required"),
    reference: Yup.string()
      .url("Invalid URL")
      .required("Reference URL is required"),
    content: Yup.string()
      .min(1, "Minimum 1 character")
      .max(5000, "Maximum 5000 characters")
      .required("Content is required"),
    description: Yup.string()
      .min(1, "Minimum 1 character")
      .max(5000, "Maximum 5000 characters")
      .required("Description is required"),
    thumbnail: Yup.string().required("Thumbnail is required"),
  });

  const formik = useFormik({
    initialValues: {
      title: blogDetail?.title || "",
      author: blogDetail?.author || "",
      reference: blogDetail?.reference || "",
      content: blogDetail?.content || "",
      description: blogDetail?.description || "",
      thumbnail: blogDetail?.thumbnail || "",
    },
    validationSchema: validationSchema,
    onSubmit: handleAddSave,
  });

  const handleContentChange = (content) => {
    formik.setFieldValue("content", content);
  };

  const handleDescriptionChange = (description) => {
    formik.setFieldValue("description", description);
  };

  const pathNames = location.pathname.split("/").filter((x) => x);

  function handleUploadThumbnail(file) {
    const storageRef = ref(storage, `blogs/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      async () => {
        const imageLink = await getDownloadURL(storageRef);
        await formik.setFieldValue("thumbnail", imageLink);
      },
    );
  }

  return (
    <>
      <UIBreadCrumb pathNames={pathNames} />
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
              error={
                formik.touched.reference && Boolean(formik.errors.reference)
              }
              helperText={formik.touched.reference && formik.errors.reference}
            />
            <Box mt={2.5}>
              {!formik.values.thumbnail && (
                <Button
                  component="label"
                  role={undefined}
                  variant="outlined"
                  tabIndex={-1}
                  startIcon={<CloudUploadIcon />}
                  sx={{ height: 200, width: "100%" }}
                >
                  Upload Thumbnail
                  <VisuallyHiddenInput
                    type="file"
                    onChange={(e) => {
                      if (e.target.files[0]) {
                        handleUploadThumbnail(e.target.files[0]);
                      }
                    }}
                  />
                </Button>
              )}
              {formik.values.thumbnail && (
                <Box sx={{ position: "relative", mb: 2 }}>
                  <CardMedia
                    component="img"
                    src={formik.values.thumbnail}
                    sx={{ width: "100%", height: 200, objectFit: "contain" }}
                  />
                  <IconButton
                    aria-label="update"
                    size="large"
                    component="label"
                    tabIndex={-1}
                    role={undefined}
                    sx={{
                      position: "absolute",
                      bottom: 7,
                      right: 7,
                      bgcolor: "white",
                      "&:hover": {
                        bgcolor: "red",
                        color: "white",
                      },
                      p: 0.5,
                    }}
                  >
                    <DriveFileRenameOutlineIcon
                      sx={{ color: "red", "&:hover": { color: "white" } }}
                    />
                    <VisuallyHiddenInput
                      type="file"
                      onChange={(e) => {
                        if (e.target.files[0]) {
                          handleUploadThumbnail(e.target.files[0]);
                        }
                      }}
                    />
                  </IconButton>
                </Box>
              )}
            </Box>

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
            <Box mt={2.5}>
              <Typography fontSize={16} fontWeight={700} mb={0.7}>
                Description
              </Typography>
              <UIRichTextEditor
                value={formik.values.description}
                onChange={handleDescriptionChange}
                isDisabled={false}
              />
              {formik.touched.description && formik.errors.description && (
                <Typography color="error">
                  {formik.errors.description}
                </Typography>
              )}
            </Box>
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
