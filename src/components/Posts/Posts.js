import React from "react";

//To fetch the data from the global redux store, we use selectors
import { useSelector } from "react-redux";

import { Grid, CircularProgress } from "@material-ui/core";

//According to the Hierarchy in the Folder structure, our Posts.js will use the Post.js too
import Post from "./Post/Post";

import useStyles from "./styles";

const Posts = ({ setCurrentId }) => {
  const posts = useSelector((state) => state.posts); //Again used as a React Hook
  //state gives the entire data set from redux
  const classes = useStyles();

  console.log(posts);

  return (
    // <Grid className={classes.container} container alignItems="stretch" spacing={3}>
    //   {/*React Fragment used */}
    //   <h1>POSTS</h1>
    //   <Post />
    //   <Post />
    // </Grid> These upper lines were written first and they couldn't render anything in React; but when these are replaced by the bottom lines, everything visible now
    !posts.length ? (
      <CircularProgress /> //Meaning if posts.length=0, then a circular progress, i.e. a spinner will be shown
    ) : (
      <Grid
        className={classes.container}
        container
        alignItems="stretch"
        spacing={3}
      >
        {posts.map((post) => (
          <Grid key={post._id} item xs={12} sm={6} md={6}>
            <Post post={post} setCurrentId={setCurrentId} />{" "}
            {/*We're doing Props drilling here, i.e. continuously sending the same props over and over again to the most child components and that's the exact problem that Redux solves */}
          </Grid>
        ))}
      </Grid>
    )
  );
};

export default Posts;
