import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteScream } from '../redux/actions/dataActions';
import MyButton from '../util/MyButton';

// mui stuff s
import withSyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DeleteOutline from '@material-ui/icons/DeleteOutline';


const styles = {
    deleteButton: {
        position: 'absolute',
        left: '90%',
        top: '10%'
    } 
}

class DeleteScream extends Component {
    constructor(props){
        super(props);
        this.state = {
            open: false
        }
    }
    handleOpen = () => {
        this.setState({
            open: true
        })
    }
    handleClose = () => {
        this.setState({
            open: false
        })
    }
    handleDelete = () => {
        this.props.deleteScream(this.props.screamId)
        this.setState({
            open: false
        })
    }
    render() {
        const {classes} = this.props;
        return (
            <Fragment>
                <MyButton tip='Delete scream' onClick={this.handleOpen} btnClassName={classes.deleteButton}>
                    <DeleteOutline color='secondary'/>
                </MyButton>
                <Dialog
                  open={this.state.open}
                  onClose={this.handleClose}
                  fullWidth
                  maxWidth='sm'
                  >
                      <DialogTitle>
                          Delete scream?
                      </DialogTitle>
                      <DialogActions>
                        <Button color='primary' onClick={this.handleClose}>
                            Cancel
                        </Button>
                        <Button color='secondary' onClick={this.handleDelete}>
                            Delete
                        </Button>
                      </DialogActions>
                  </Dialog>
            </Fragment>
        )
    }
}

DeleteScream.propTypes ={
    classes: PropTypes.object.isRequired,
    deleteScream: PropTypes.func.isRequired,
    screamId: PropTypes.string.isRequired
}

export default connect(null, {deleteScream})(withSyles(styles)(DeleteScream))
