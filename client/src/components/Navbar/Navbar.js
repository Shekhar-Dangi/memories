import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Avatar, Button, Grid } from "@material-ui/core";
import memories from "../../images/memories.png";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useStyles from './styles';

const Navbar = () => {
  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  console.log(user);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const logout = () => {
    try {
      dispatch({ type: "LOGOUT" });
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    const token = user?.token;

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location])

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">
          Memories
        </Typography>
        <img
          className={classes.image}
          src={memories}
          alt="memories"
          height="60"
        />
      </div>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <Grid container justifyContent='space-around' className='classes.profile'>
            <Avatar className={classes.purple} alt={user.result.name} src={user.result.picture}>{user.result.name.charAt(0)}</Avatar>
            <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
            <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
          </Grid>
        ) : (
          <Button alignSelf="flex-end" component={Link} to="/auth" variant="contained" color="primary">Login</Button>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Navbar