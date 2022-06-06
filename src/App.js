//Material-UI is popular in React as it helps build nice looking applications without much styling
import React, { useState, useEffect } from "react";
//Have to keep track of the ID in App.js as App.js is the only parent of both Form and Posts components
import { Container, AppBar, Typography, Grow, Grid } from "@material-ui/core";

//With help of hooks we can use Redux much easily
import { useDispatch } from "react-redux"; //Allows us to dispatch an action

import Form from "./components/Form/Form";
import Posts from "./components/Posts/Posts";
import { getPosts } from "./actions/posts";

import useStyles from "./styles";
import memories from "./images/memories.png";

const App = () => {
  const [currentId, setCurrentId] = useState(0); //Initially we don't have an Id, so set to null
  const dispatch = useDispatch(); //Dispatch can be best used inside of useEffect
  const classes = useStyles();

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]); //Adding the currentId parameter here allows us to change the post immediately when inputs submitted from the form without the need of refresh

  return (
    <Container maxwidth="lg">
      {/*This will just ensure that everything is centered*/}
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography className={classes.heading} variant="h2" align="center">
          {/*Refers to any Textual element, but having a nice looking font*/}
          Memories
        </Typography>
        <img
          className={classes.image}
          src={memories}
          alt="memories"
          height="60"
        />
      </AppBar>
      <Grow in>
        {/*Basically gives some simple animation */}
        <Container>
          <Grid
            className={classes.mainContainer}
            container
            // direction="column-reverse" Instead of flex-direction, material-ui has only direction as a css property; But this needs to be done only for mobile devices
            justify="space-between"
            alignItems="stretch"
            spacing={3}
          >
            <Grid
              item
              xs={12}
              /*Meaning it'll take up the entire space in extra small devices */ sm={
                7
              } /*Meaning it'll take up 7 out of 12 spaces in small and medium devices*/
            >
              <Posts setCurrentId={setCurrentId} />
              {/*Doing like this to show how data managament looks like without Redux*/}
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
              {/*The same things have to be accepted as Props in Form.js now*/}
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
};

export default App;
//Using Material-ui makes our application mobile-responsive easily and the only thing we can do extra is to keep the form at the top of the page; So we just need to do flex-direction: "column-reverse" at the appropriate place
//To make the code look more professional, we need to have all the action types in forms of constants only
//If constants not used, then even due to some minor typo, it would be very difficult to debug them as these types of errors don't give out any error messages as it's tricky to work with strings
