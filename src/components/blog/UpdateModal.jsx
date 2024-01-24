import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useBlogContext } from "../../context/BlogContext";

const UpdateModal = ({ open, handleClose, blogData, handleUpdate }) => {
  const [formData, setFormData] = useState({ ...blogData });
  const { categories, updateBlog } = useBlogContext();
  useEffect(() => {
    setFormData({ ...blogData });
  }, [blogData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  console.log(blogData);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateBlog(blogData?._id, formData);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Update Blog</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="title"
          label="Title"
          type="text"
          fullWidth
          variant="outlined"
          value={formData.title}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="image"
          label="Image URL"
          type="text"
          fullWidth
          variant="outlined"
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
          margin="dense"
          name="content"
          label="Content"
          type="text"
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          value={formData.content}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Update Blog
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateModal;
