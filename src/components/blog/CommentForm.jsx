import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Box,
  Avatar,
  Button,
} from "@mui/material";

import { useAuthContext } from "../../context/AuthContext";
import { useBlogContext } from "../../context/BlogContext";

import {
  List,
  ListItem,
  ListItemText,
  TextField,
  Divider,
} from "@mui/material";

const CommentForm = ({ blogPost }) => {
  // comments alanı

  console.log(blogPost);
  const [newComment, setNewComment] = useState({
    blogId: blogPost._id,
    comment: "",
  });

  const { submitComment } = useBlogContext();

  const handleChange = (e) => {
    setNewComment({ ...newComment, [e.target.name]: e.target.value });
    console.log(newComment);
  };

  const handleCommentSubmit = () => {
    submitComment(newComment);
    console.log(newComment); // Handle the comment submission here
    setNewComment("");
  };
  return (
    <>
      <Box margin={2}>
        <Typography variant="h6">Comments</Typography>

        <TextField
          label="New Comment"
          multiline
          rows={4}
          variant="outlined"
          fullWidth
          name="comment"
          onChange={handleChange}
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleCommentSubmit}
        >
          Submit Comment
        </Button>
        <List>
          {blogPost?.comments?.map((comment, index) => (
            <React.Fragment key={index}>
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary={`${comment?.userId?.firstName} ${comment?.userId?.lastName}`}
                  secondary={
                    <>
                      <Typography
                        component="span"
                        variant="body2"
                        color="textPrimary"
                      >
                        {comment?.comment}
                      </Typography>
                      {" - "}
                      <Typography
                        component="span"
                        variant="body2"
                        color="textSecondary"
                      >
                        {new Date(comment.updatedAt).toLocaleDateString(
                          "tr-TR",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
              {index < blogPost.comments.length - 1 && (
                <Divider variant="inset" component="li" />
              )}
            </React.Fragment>
          ))}
        </List>
      </Box>
    </>
  );
};

export default CommentForm;
