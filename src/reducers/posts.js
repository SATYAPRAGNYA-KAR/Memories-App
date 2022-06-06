import {
  FETCH_ALL,
  CREATE,
  UPDATE,
  DELETE,
  LIKE,
} from "../constants/actionTypes";

export default (posts = [], action) => {
  //Always state need to be something and not null
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;
    case LIKE:
      return posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    case CREATE:
      return [...posts, action.payload];
    case UPDATE:
      //Both Update and Like cases do the same thing essentially
      return posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    //The output of a map() function is an array; so we change something in the array and return the entire array; action.payload is the newly updated post here
    case DELETE:
      return posts.filter((post) => post._id !== action.payload); //Meaning we will keep all the posts except the one whose id is same as action.payload

    default:
      return posts;
  }
};
