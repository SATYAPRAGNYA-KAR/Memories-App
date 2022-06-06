import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import moment from "moment";
import { useDispatch } from "react-redux";

import { likePost, deletePost } from "../../../actions/posts";
import useStyles from "./styles";

const Post = ({ post, setCurrentId }) => {
  //Props destructured here
  const dispatch = useDispatch();
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={
          post.selectedFile ||
          "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
        }
        title={post.title}
      />
      {/* This is just an Image */}
      <div className={classes.overlay}>
        <Typography variant="h6">{post.creator}</Typography>
        <Typography variant="body2">
          {moment(post.createdAt).fromNow()}
        </Typography>
        {/*The moment library installed initially can be used here; the fronNow() function basically says like how early compared to now the post was created, i.e. 5min ago or 5 sec ago, etc. */}
      </div>
      <div className={classes.overlay2}>
        <Button
          style={{ color: "white" }}
          size="small"
          onClick={() => setCurrentId(post._id)}
        >
          <MoreHorizIcon fontSize="default" />
        </Button>
      </div>
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary" component="h2">
          {post.tags.map((tag) => `#${tag} `)}
          {/* This is basically used to add a Hash symbol before each tag; A string returned with a hash symbol at front*/}
        </Typography>
      </div>
      <Typography
        className={classes.title}
        gutterBottom
        variant="h5"
        component="h2"
      >
        {post.title}
      </Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {post.message}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button
          size="small"
          color="primary"
          onClick={() => dispatch(likePost(post._id))}
        >
          <ThumbUpAltIcon fontSize="small" />
          &nbsp; Like &nbsp; {post.likeCount}
          {/*With the current implementation, any user can like a post any number of time; but if we want that one user can like a post only once at max, then a full register-login system needs to be implemented in this app, called Authentication */}
          {/*&nbsp; is the code for a space that needs to be added in between the text Like and the like count; only adding a simple space won't be interpreted by JSX */}
        </Button>
        <Button
          size="small"
          color="primary"
          onClick={() => dispatch(deletePost(post._id))}
        >
          <DeleteIcon fontSize="small" /> Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default Post;
