import React, { useState, useEffect } from "react";

import { TextField, Button, Typography, Paper } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import FileBase from "react-file-base64";

import useStyles from "./styles";
import { createPost, updatePost } from "../../actions/posts";

//We have to somehow get the ID of the current post we're on here; The three dots button on top of post to be clicked and then the existing data of the post will be automatically filled in the form and the title changes from 'Creating a Memory' to updating a 'Updating a Memory'

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({
    creator: "",
    title: "",
    message: "",
    tags: "",
    selectedFile: "" /*Everything is an empty string initially*/,
  });

  const post = useSelector((state) =>
    currentId ? state.posts.find((message) => message._id === currentId) : null
  ); //To find the particular post with the given Id only; Only one singular post is returned here
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]); //Two parameters for useEffect, a function and a dependency array

  const clear = () => {
    setCurrentId(0);
    setPostData({
      creator: "",
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    }); //This will set all the fields of the form to empty again once a request to create or update a post is done
  };

  const handleSubmit = async (e) => {
    /*Ofc on pressing handleSubmit, we need to provide a Post request with all the data typed by the user in it */
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createPost(postData));
    } else {
      dispatch(updatePost(currentId, postData)); //Meaning if currentId is not null, then instead of creating a new post, we'll update the chosen post
    }
    clear(); //As clear() function used both after if or else statement, it's just written outside of if-else block
  };

  return (
    <Paper className={classes.paper}>
      {/*Paper is like a white background only*/}
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`} //Multiple classNames to be given to this Form component
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {currentId ? `Editing "${post.title}"` : "Creating a Memory"}
        </Typography>
        <TextField
          name="creator"
          variant="outlined"
          label="Creator"
          fullWidth
          value={postData.creator}
          onChange={(e) =>
            setPostData({ ...postData, creator: e.target.value })
          }
        />
        {/*Whole data from post need to be stored inside postData object and each object key is gonna be a specific text field*/}
        {/*We spread the data here; This helps us because if we create multiple text fields with only the last attribute changing, then all the data will persist with only one text field's data modified*/}
        {/*mem.dev is a website where we can put a particular snippet and it'll ask me question related to that snippet only till I'm thorough*/}
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          multiline
          rows={4}
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags (coma separated)"
          fullWidth
          value={postData.tags}
          onChange={(e) =>
            setPostData({ ...postData, tags: e.target.value.split(",") })
          } //We split the tags into an array of strings using commas so that they appear as multiple hashtags; Then only if someone wants to search some posts using hashtags as done in social media, it'll work
        />
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          {/*Using Material-UI, we just pass props to do the styling, else a lot of CSS work needed to be done */}
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
