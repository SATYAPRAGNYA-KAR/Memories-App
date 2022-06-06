import axios from "axios";

const url = "https://memories-mernstackapplication.herokuapp.com/posts"; //The URL pointing to our backend; This url returns all the posts contained in the Database
//Once our backend is hosted, we need to give the URL of the deployment and not the localhost:5000

export const fetchPosts = () => axios.get(url);
//Redux capabilities to be added now as all actions towards our Backend needs to be done using Redux
//A lot of files and folders need to be added to impleent Redux but it also helps offer a lot of scalability

export const createPost = (newPost) => {
  axios.post(url, newPost);
};
export const likePost = (id) => axios.patch(`${url}/${id}/likePost`);
export const updatePost = (id, updatedPost) =>
  axios.patch(`${url}/${id}`, updatedPost); //The id is specified with the url so that we know that which post to update
export const deletePost = (id) => axios.delete(`${url}/${id}`);

//Entire backend is running on the live deployed heroku system and not on the local system
//For deploying the frontend portion, we'll use Netlify as it helps set up the hosting of frontend in seconds
//Just dragging and dropping the build folder of the frontend portion will help set up the site easily enough without connecting to Git at all
