import { makeStyles } from "@material-ui/core/styles"; //Don't do a default import but a named import by placing it inside the curly braces

export default makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: "30px 0",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    color: "rgba(0,183,255, 1)",
  },
  image: {
    marginLeft: "15px",
  },
  [theme.breakpoints.down("sm")]: {
    //Meaning here devices having sizes < sm will have the following css
    mainContainer: {
      flexDirection: "column-reverse",
    },
  },
}));
//Mui offers breakpoints that are media queries and we can use those to apply this column-reverse to only mobile devices; Go into docs of Mui for the different functionalities used here
