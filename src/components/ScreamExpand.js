import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getScream,clearErrors,postComment, comment, clearScream, deleteComment} from '../redux/actions/dataActions';
import MyButton from '../util/MyButton';
import LikeButton from './LikeButton';
//mui stuff 
import withSyles from '@material-ui/core/styles/withStyles';
import Dialog from "@material-ui/core/Dialog";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
// icons
import ChatIcon from "@material-ui/icons/Chat";
import SubmitIcon from "@material-ui/icons/Send";
import LinearProgress from '@material-ui/core/LinearProgress';
//icons 
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import CloseIcon from '@material-ui/icons/Close';


import dayjs from 'dayjs';

const styles = theme => ({
    ...theme.common,
    imageX: {
        height: 200,
        objectFit: 'cover',
        maxWidth: '100%',
        borderRadius: '50%'
    },
    expandedScreamDialog: {
        position: 'relative',
        textAlign: 'center'
    },
    dialogContainer: {
        padding: 20
    },
    imageComment:{
        height: 100,
        objectFit: 'cover',
        maxWidth: '100%',
        borderRadius: '50%'
    },
    content: {
        marginLeft: 4
    },
    paper: {
        marginTop: 10,
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
      },
    iconButton: {
        padding: 10,
        float: 'right'
    },
    commentForm: {
        width: '90%'
    },
    progress: {
        height: '10px'

    },
    root: {
        width: '100%',
        '& > * + *': {
          marginTop: theme.spacing(2),
        },
    },
    expandButton: {
        float: 'right'
    },
    errorParagraph: {
        color: 'red',
        textColor: 'red'
    },
    containerComment: {
        position: 'relative'
    },
    deleteCommentButton: {
        position: 'absolute',
              top: '6%',
              left: '91%'
    }
})

class ScreamExpand extends Component {
  
    state = {
        body: '',
        open: false
    }

    handleClick = () =>{
        this.props.comment()
        console.log(this.props.id)
        this.props.getScream(this.props.id)
    }
    handleClose = () =>{
        this.setState({
            body: '',
            open: false
        })
        this.props.comment()
        this.props.clearErrors()
        this.props.clearScream()
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]:event.target.value
        })
    }
    handleSubmit = (event) => {
        event.preventDefault();
        this.props.postComment(this.props.scream.screamId, { body: this.state.body })
        this.setState({
            body:''
        })
    }
    handleSnackClose = () => {
        this.setState({
            open: false
        })
    }
    handleCommentDelete = (id) => {
        this.props.deleteComment(this.props.scream.screamId, id)
        this.setState({
            open: true
        })
    }
    

    render() {
        const {classes,scream:{body,createdAt,likeCount,userHandle,commentCount,comments,imageUrl}, id,user:{authenticated, credentials:{handle}},UI: {loading,errors:{error},commentFocus}} = this.props;
         
        let commentList = comments && comments.length>0? (
            <Grid item sm={12}>
                {comments.map((comment, index) => {
                    const {imageUrl,userHandle,body,createdAt, commentId} = comment;
                    return (
                    <Grid container key={index}  className={classes.containerComment}>
                        <hr className={classes.visibleSeparator}/>
                        <Grid item sm={2}>
                            <img
                            className={classes.imageComment}
                            src={imageUrl}
                            alt="Profile"
                            />
                        </Grid>
                    
                    <Grid item sm={9} className={classes.content}>
                      <Typography
                        variant="h6"
                        color="primary"
                        component={Link}
                        to={`/users/${userHandle}`}
                      >
                        {userHandle}
                      </Typography>
                      { (userHandle === handle) ? (
            <Fragment>
                <MyButton tip='Delete comment' onClick={()=>this.handleCommentDelete(commentId)} btnClassName={classes.deleteCommentButton}>
                    <DeleteOutlineIcon color='secondary'/>
                </MyButton>
                <Snackbar
                    anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                    }}
                    open={this.state.open}
                    autoHideDuration={4000}
                    onClose={this.handleSnackClose}
                    ContentProps={{
                    'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">Comment deleted!</span>}
                    action={
                    <IconButton
                        key="close"
                        aria-label="close"
                        color="inherit"
                        className={classes.snackClose}
                        onClick={this.handleSnackClose}
                    >
            <CloseIcon />
          </IconButton>}
      />
            </Fragment>
        ): null }
                      <Typography variant="body2" color="textSecondary">
                        {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                      </Typography><hr className={classes.invisibleSeparator}/>
                      <Typography variant="body1">{body}</Typography>
                      
                    </Grid>
                  </Grid>)
         
                })}
            </Grid>
        ):null
        return (
            <Fragment>
                <MyButton id="expander" name="expander" btnClassName={classes.expandButton} tip='Expand scream!' onClick={this.handleClick}>
                    <ExpandMoreIcon color='primary'/>
                </MyButton>
                <Dialog
                className={classes.expandedScreamDialog}
                open={commentFocus}
                onClose={this.handleClose}
                fullWidth
                maxWidth='sm'>
                    
                    {loading?(
                            <div className={classes.root}>
                                <LinearProgress className={classes.progress} color='primary'/>
                            </div>
                        ):(
                            <Grid container className={classes.dialogContainer}>
                        <Grid item sm={4}>
                            <img src={imageUrl} alt="Profile" 
                            className={classes.imageX}
                            />
                        </Grid>
                        <Grid item sm={8}>
                            <MyButton tip='Close' btnClassName={classes.closeButton} onClick={this.handleClose}>
                                <CloseIcon />
                            </MyButton>
                            <Typography component={Link} to={`/users/${userHandle}`} variant='h5' color='primary'>
                                {userHandle}
                            </Typography>
                            <Typography variant='body2' color='textSecondary'>
                                {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                            </Typography>
                            <hr className={classes.invisibleSeparator} />
                            <Typography variant='body1'>
                                {body}
                            </Typography>
                            <hr className={classes.invisibleSeparator} />
                            <LikeButton screamId={id} /><span>{likeCount} Likes</span>
                            <MyButton tip="Comment">
                                <ChatIcon color="primary" />
                            </MyButton>
                            <span>{commentCount} Comments</span>
                        </Grid>
                        {authenticated && !loading?(
                        <Grid item sm={12}>
                            {error?(<p className={classes.errorParagraph}>{error}</p>):null}
                            <Paper  onSubmit={this.handleSubmit} component="form" className={classes.paper}>
                            <InputBase
                                name='body'
                                id='body'
                                value={this.state.body}
                                error={error?true:false}
                                onChange={this.handleChange}
                                className={classes.commentForm}
                                placeholder="Type your comment..."
                                inputProps={{ 'aria-label': 'Type your comment...' }}
                            />
                            <IconButton type='submit' onClick={this.handleSubmit} className={classes.iconButton} aria-label="search">
                                <SubmitIcon color='primary' />
                            </IconButton>
                            </Paper>
                        </Grid>
                        ):
                        null
                    }
                    {commentList}
                    </Grid>
                        )}
                </Dialog>
            </Fragment>
        )
    }
}

ScreamExpand.propTypes = {
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    scream: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    getScream: PropTypes.func.isRequired,
    postComment: PropTypes.func.isRequired,
    comment: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    clearScream: PropTypes.func.isRequired,
    deleteComment: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    user: state.user,
    UI: state.UI,
    scream: state.data.scream
})

const mapActionsToProps = {
    getScream,
    clearErrors,
    postComment,
    comment,
    clearScream,
    deleteComment
}

export default connect(mapStateToProps, mapActionsToProps)(withSyles(styles)(ScreamExpand))

