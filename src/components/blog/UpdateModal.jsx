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

const UpdateModal = ({ open, handleClose, blogData, handleUpdate }) => {
  const [formData, setFormData] = useState({ ...blogData });

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

  const handleSubmit = () => {
    handleUpdate(formData);
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
        <FormControl fullWidth margin="normal">
          <InputLabel>Category</InputLabel>
          <Select
            name="category"
            value={formData.category}
            label="Category"
            onChange={handleChange}
          >
            <MenuItem value="World">World</MenuItem>
            <MenuItem value="Technology">Technology</MenuItem>
            <MenuItem value="Lifestyle">Lifestyle</MenuItem>
            {/* Add more categories as needed */}
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel>Status</InputLabel>
          <Select
            name="status"
            value={formData.status}
            label="Status"
            onChange={handleChange}
          >
            <MenuItem value="Published">Published</MenuItem>
            <MenuItem value="Draft">Draft</MenuItem>
            <MenuItem value="Archived">Archived</MenuItem>
            {/* Add more statuses as needed */}
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
