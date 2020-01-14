import React, { Component, Fragment } from 'react';
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import { connect } from "react-redux";
import { postScream } from "../redux/actions/dataActions";
import MyButton from "../util/MyButton";
import store from '../redux/store';
import {CLEAR_ERRORS} from '../redux/types';

// mui stuff
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
// icons
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import { CircularProgress } from '@material-ui/core';

const styles = theme => ({
  ...theme.common,
  button: {
      float: 'right',
      marginTop: 10
  },
  postScreamDialog: {
      position: 'relative'
  }
});


class AddScream extends Component {
    constructor(props){
        super(props);
        this.state = {
            open: false,
            body: ''
        }
    }
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }
    handleClose = () => {
        this.setState({ open: false, body: '' })
        store.dispatch({type: CLEAR_ERRORS})
    }
    handleOpen = () => {
        this.setState({ open: true })
    }
    handleSubmit = () => {
        this.props.postScream({body: this.state.body })
        this.timer()
    }
    timer = (time) => {
        setTimeout(()=>{ 
            if(!this.props.UI.loading){
                if(!this.props.UI.errors.error){
                    this.handleClose()
                } else { }
            } else{
                this.timer(time/2)
            }
        }, time);
    }
    render() {
        const {classes, UI:{loading, errors}} = this.props;
        return (
            <Fragment>
                <MyButton tip='Post scream!' onClick={this.handleOpen}>
                    <AddIcon color='primary'/>
                </MyButton>
                <Dialog
                className={classes.postScreamDialog}
                open={this.state.open}
                onClose={this.handleClose}
                fullWidth
                maxWidth='sm'>
                    <DialogTitle>Post a scream:</DialogTitle>
                    <MyButton tip='Close' btnClassName={classes.closeButton} onClick={this.handleClose}>
                        <CloseIcon />
                    </MyButton>
                    <DialogContent>
                        <TextField
                        name="body"
                        id="body"
                        label="Add scream content"
                        type="text"
                        autoFocus
                        multiline
                        rows="3"
                        error={errors.error?true:false}
                        helperText={errors.error}
                        className={classes.textField}
                        value={this.state.body}
                        onChange={this.handleChange}
                        fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button disabled={loading} className={classes.button} onClick={this.handleSubmit} color='primary'>Submit
                        {loading&&(
                            <CircularProgress size={30} className={classes.progressSpinner}/>
                        )}
                        </Button>
                    </DialogActions>
                </Dialog>
                
            </Fragment>
        )
    }
}

AddScream.propTypes = {
    postScream: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    UI: state.UI
})

export default connect(mapStateToProps, {postScream})(withStyles(styles)(AddScream))
