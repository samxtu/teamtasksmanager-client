import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import { connect } from "react-redux";
import { editUserDetails } from "../redux/actions/userActions";

// mui stuff
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
// icons
import EditIcon from "@material-ui/icons/Edit";

const styles = theme => ({
  ...theme.common,
  button: {
      float: 'right'
  }
});

class EditProfile extends Component {
  constructor() {
    super();
    this.state = {
      bio: "",
      website: "",
      location: "",
      open: false
    };
  }

  componentDidMount() {
    const {
      credentials: { bio, website, location }
    } = this.props;
    this.setState({
      bio: bio ? bio : "",
      website: website ? website : "",
      location: location ? location : ""
    });
  }

  handleOpen = () => {
    this.setState({
      open: true
    });
  };

  handleClose = () => {
    this.setState({
      open: false
    });
  };

  handleEditDetails = () => {
    const userDetails = {
      bio: this.state.bio,
      website: this.state.website,
      location: this.state.location
    };
    this.props.editUserDetails(userDetails);
    this.handleClose()
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <Tooltip title="Edit details" placement="top">
          <IconButton onClick={this.handleOpen} className={classes.button}>
            <EditIcon color="primary" />
          </IconButton>
        </Tooltip>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
          fullWidth
          maxWidth='sm'
        >
          <DialogTitle id="form-dialog-title">Edit profile details:</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              name="bio"
              id="bio"
              label="A short description of yourself"
              type="text"
              multiline
              rows="2"
              className={classes.textField}
              value={this.state.bio}
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              margin="dense"
              name="website"
              id="website"
              label="Your personal/proffessional website"
              type="text"
              className={classes.textField}
              value={this.state.website}
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              margin="dense"
              name="location"
              id="location"
              label="Your home location"
              type="text"
              className={classes.textField}
              value={this.state.location}
              onChange={this.handleChange}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="secondary">
              Cancel
            </Button>
            <Button onClick={this.handleEditDetails} color="primary">
              Update
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

EditProfile.propTypes = {
  classes: PropTypes.object.isRequired,
  editUserDetails: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  credentials: state.user.credentials
});

export default connect(
  mapStateToProps,
  { editUserDetails }
)(withStyles(styles)(EditProfile));
