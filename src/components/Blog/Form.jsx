import CloudUploadIcon from "@mui/icons-material/CloudUpload.js";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import * as React from "react";
import * as Yup from "yup";
import { VisuallyHiddenInput } from "../../assets/styles/Input.jsx";
import UIBasicHeader from "../UI/BasicHeader.jsx";
import UIRichTextEditor from "../UI/RichTexEditor.jsx";

const BlogForm = () => {
  const initialValues = {
    title: "",
    description: "",
    reference: "",
    content: "",
    cover: "",
  };
  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .min(2, "Minimum 2 characters")
      .max(100, "Maximum 100 characters")
      .required("Title is required"),
    description: Yup.string()
      .min(100, "Minimum 100 characters")
      .required("Description is required"),
    // content: Yup.string()
    //   .min(300, "Minimum 300 characters")
    //   .required("Content is required"),
    // cover: Yup.string().required("Cover is required"),
  });
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (formValues) => {
      console.log(formValues);
    },
  });
  return (
    <>
      <Box>BreadCrumb</Box>
      <UIBasicHeader title={"Create a new post | Edit a post"} />
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
              rows={3}
              fullWidth
              id="description"
              type="text"
              name="description"
              label="Description"
              InputProps={{ sx: { borderRadius: 2 } }}
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description && formik.errors.description
              }
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
              <Typography fontSize={16} fontWeight={700} mb={0.7}>
                Content
              </Typography>
              <UIRichTextEditor />
            </Box>
            <Box mt={3}>
              <Typography fontSize={16} fontWeight={700} mb={0.7}>
                Cover
              </Typography>
              <Button
                component="label"
                role={undefined}
                variant="outlined"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
                sx={{ height: 264, width: "100%", borderRadius: 2 }}
              >
                Upload Cover image
                <VisuallyHiddenInput
                  type="file"
                  // onChange={handleSelectDiamondImage}
                />
              </Button>
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
              Save Changes
            </Button>
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default BlogForm;
