import React, { Component } from "react";
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
// redux stuff 
import { connect } from 'react-redux';
import { loginUser } from '../redux/actions/userActions';

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
  ...theme.common,
  form: {
    padding: "20px"
  }
});

class login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
    };
  }
 
  handleSubmit = (event) => {
    event.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(userData, this.props.history);
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  render() {
    const { classes, UI: {loading,errors}} = this.props;

    return (
      <Grid container>
        <Grid sm item />
        <Grid sm item>
          <Card className={classes.form}>
            <CardHeader title="Office manager login" />
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
                {errors.general && (
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
                  Login
                  {loading &&(
                      <CircularProgress size={30} className={classes.spinner} />
                  )}
                </Button>
              </form>
            </CardContent>
            <CardActions>
              <Button size="small" className={classes.btnLink} color="primary" component={Link} to='/renewpassword'>
                Forgot password?
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid sm item />
      </Grid>
    );
  }
}

login.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired
}

const mapActionsToProps = {
  loginUser
}

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI
})

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(login));
