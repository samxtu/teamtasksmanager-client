import React, { Component } from "react";
import axios from "axios";
import {Link} from 'react-router-dom';

// mui stuff
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Typography } from "@material-ui/core";

const styles = (theme) => ({
    ...theme.common
});

class signup extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      handle: "",
      loading: false,
      errors: {}
    };
  }
  handleSubmit = event => {
    event.preventDefault();
    this.setState({
      loading: true
    });
    const newUserData = {
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      handle: this.state.handle
    };
    axios
      .post("/signup", newUserData)
      .then(res => {
        localStorage.setItem('FBIdToken',`Bearer ${res.data.token}`);
        this.setState({
          loading: false
        });
        this.props.history.push("/");
      })
      .catch(err => {
        console.log(err.response.data);
        this.setState({
          errors: err.response.data,
          loading: false
        });
      });
  };
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  render() {
    const { classes } = this.props;
    const { errors, loading } = this.state;

    return (
      <Grid container className={classes.formContainer}>
        <Grid sm item />
        <Grid sm item>
          <Card className={classes.form}>
            <CardHeader title="Signup" />
            <CardContent>
              <form noValidate onSubmit={this.handleSubmit}>
                <TextField
                  fullWidth
                  id="email"
                  name="email"
                  type="email"
                  label="Email"
                  helperText={errors.email}
                  error={errors.email ? true : false}
                  className={classes.textField}
                  value={this.state.email}
                  onChange={this.handleChange}
                />
                <TextField
                  fullWidth
                  id="password"
                  name="password"
                  type="password"
                  label="Password"
                  helperText={errors.password}
                  error={errors.password ? true : false}
                  className={classes.textField}
                  value={this.state.password}
                  onChange={this.handleChange}
                />
                <TextField
                  fullWidth
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  label="Confirm Password"
                  helperText={errors.confirmPassword}
                  error={errors.confirmPassword ? true : false}
                  className={classes.textField}
                  value={this.state.confirmPassword}
                  onChange={this.handleChange}
                />
                <TextField
                  fullWidth
                  id="handle"
                  name="handle"
                  type="text"
                  label="Handle"
                  helperText={errors.handle}
                  error={errors.handle ? true : false}
                  className={classes.textField}
                  value={this.state.handle}
                  onChange={this.handleChange}
                />
                {errors.error && (
                  <Typography variant="caption" className={classes.caption}>
                    Incorrect credentials!
                  </Typography>
                )}
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={loading}
                  className={classes.button}
                >
                  signup
                  {loading &&(
                      <CircularProgress size={30} className={classes.spinner} />
                  )}
                </Button>
              </form>
            </CardContent>
            <CardActions>
              <Button size="small" className={classes.btnLink} color="primary" component={Link} to='/login'>
                Login
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid sm item />
      </Grid>
    );
  }
}

export default withStyles(styles)(signup);
