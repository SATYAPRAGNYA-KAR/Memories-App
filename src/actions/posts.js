import {
  FETCH_ALL,
  CREATE,
  UPDATE,
  DELETE,
  LIKE,
} from "../constants/actionTypes";
import * as api from "../api/index.js"; //This means importing everything inside api folder

//Action creators need to be made which are functions that create actions
export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts(); //In response we always have the data object that we get from the backend

    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error.message);
  }

  // const action={type:"FETCH_ALL", payload:[]}//action is an object having a type and a payload, which gives all the data to be got

  // dispatch(action)
};
//We're dealing with asynchronous data and when we want to fetch all the data, some time will pass; so we use redux-thunk

export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);

    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post); //api request to update the post done here

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id); //When we're liking a message, we don't need to get the post, so only id is passed as a parameter here

    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id); //We don't need the data of the post to be deleted, so no new variable to store this data required; directly deletion

    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error.message);
  }
};

//Working with Redux says that it's a good idea to set the action types as constants and then to import them in these files
//Never console error.message and instead console only the error as it will give you more info
