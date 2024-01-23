import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useBlogContext } from "../../context/BlogContext";

const BlogForm = () => {
  const { categories, postBlog } = useBlogContext();
  console.log(categories);

  const [formData, setFormData] = useState({
    title: "",
    image: "",
    categoryId: "",
    isPublish: "",
    content: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    postBlog(formData);

    // Form submit logic here
  };

  return (
    <Container maxWidth="sm">
      <Box
        component="form"
        sx={{ "& .MuiTextField-root": { m: 1 }, mt: 3 }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <Typography variant="h4" gutterBottom>
          New Blog
        </Typography>

        <TextField
          required
          fullWidth
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />

        <TextField
          required
          fullWidth
          label="Image URL"
          name="image"
          value={formData.image}
          onChange={handleChange}
        />

        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel id="categoryId">Category</InputLabel>
          <Select
            labelId="categoryId"
            label="Category"
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            required
          >
            {/* Example categories */}
            {categories?.map((item, index) => (
              <MenuItem key={index} value={item?._id}>
                {item?.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel id="status-label">Status</InputLabel>
          <Select
            labelId="status-label"
            label="Status"
            name="isPublish"
            value={formData.isPublish}
            onChange={handleChange}
            required
          >
            <MenuItem value="">
              <em>Please choose...</em>
            </MenuItem>
            <MenuItem value="false">Draft</MenuItem>
            <MenuItem value="true">Published</MenuItem>
          </Select>
        </FormControl>

        <TextField
          required
          fullWidth
          label="Content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          multiline
          rows={4}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Submit
        </Button>
      </Box>
    </Container>
  );
};

export default BlogForm;
