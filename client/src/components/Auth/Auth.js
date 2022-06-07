import React, { useState } from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container, } from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import { useDispatch } from "react-redux";
import getData from './getData';
import { useHistory } from "react-router-dom";
import { signup, signin } from "../../actions/auth";

import { useGoogleLogin } from '@react-oauth/google';

import useStyles from './styles';
import Icon from './icon';
import Input from './Input';

const Auth = () => {
  const initialData = { firstName: '', lastName: '', password: '', confirmPassword: '', email: '' };
  const classes = useStyles();
  const [isSignup, setisSignup] = useState(false);
  const [formData, setFormData] = useState(initialData);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const handleShowPassword = () => setShowPassword((prev) => !prev);
  const switchMode = () => { setisSignup((prev) => !prev) };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      dispatch(signup(formData, history));
    } else {
      dispatch(signin(formData, history));
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const login = useGoogleLogin({
    onSuccess: async ({ code }) => {
      const res = await getData(code);
      try {
        dispatch({ type: "AUTH", payload: { token: res.tokens.data.id_token, result: res.userInfo.data } });
        history.push("/");
      } catch (error) {
        console.log(error);
      }
    },
    flow: 'auth-code'
  })
  return (

    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignup ? "Sign up" : "Sign In"}</Typography>
        <form className={classes.form} onSubmit={(e) => { handleSubmit(e) }}>
          <Grid container spacing={2}>
            {
              isSignup && (
                <>
                  <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half type="text" />
                  <Input name="lastName" label="Last Name" handleChange={handleChange} half type="text" />
                </>
              )
            }
            <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
            {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            {isSignup ? "Sign up" : "Sign In"}
          </Button>

          <Button className={classes.googleButton} color="primary" type="button" fullWidth onClick={(e) => {
            e.preventDefault();
            login()
          }} variant="contained"><Icon />&nbsp;  Sign In</Button>

          <Grid container="flex-end">
            <Button onClick={switchMode}>
              {isSignup ? "Already have an account? Sign In" : "Don't have an account? Sign In"}
            </Button>
          </Grid>
        </form>
      </Paper>
    </Container>

  )
}

export default Auth;