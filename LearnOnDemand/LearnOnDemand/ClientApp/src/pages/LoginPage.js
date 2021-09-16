import React ,{useState,useContext} from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom"; 
import { SignInButton } from "../azure/SignInButton";
import { SignOutButton } from "../azure/SignOutButton";
import { useIsAuthenticated } from "@azure/msal-react";
import { Redirect, Route, Switch, BrowserRouter } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
   
  },
  avatar: {
    margin: theme.spacing(2),
    backgroundColor: theme.palette.secondary.main,
  
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 48,
    padding: "0 30px",
  },
}));

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const classes = useStyles(); 
  
const isAuthenticated = useIsAuthenticated();
//   const { loginRequest } = useContext(LoginContext)

  const handleChange = ev => {
    if (ev.target.name === 'email') {
        setEmail(ev.target.value)
    } else if (ev.target.name === 'password') {
        setPassword(ev.target.value)
    }
}

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h4">
          Log in
        </Typography>
        <form className={classes.form} noValidate>
           <br />
          { isAuthenticated ?  <Redirect from="/" to="/news" />: <SignInButton /> }
        </form>
      </div>
    </Container>
  );
}
