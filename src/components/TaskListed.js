import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {likeScream, unlikeScream, comment, getScream} from '../redux/actions/dataActions';
import LikeButton from './LikeButton';
import ScreamExpand from './ScreamExpand';
import MyButton from '../util/MyButton';

//MUI stuff
import withSyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

// mui icons 
import ChatIcon from "@material-ui/icons/Chat";


const styles = theme => ({
    ...theme.common,
    card: {
        position: 'relative',
        display: 'flex',
        marginBottom: 20
    },
    button: {
        float: 'right',
        paddingBottom: 0
    },
    image: {
        minWidth: 200
    },
    content: {
        padding: 25,
        objectFit: 'cover'
    }
})

class Task extends Component {
    openExpanded = (event) =>{
      this.props.comment()
      // this.props.getScream(event.target.name)
    }
    render (){
        dayjs.extend(relativeTime);
        const { classes, task: { body, createdAt, imageUrl, userHandle, screamId, likeCount, commentCount }, user: {authenticated, credentials: {handle}} } = this.props;

        // const deleteButton = authenticated && userHandle === handle ? (<DeleteScream screamId={screamId} />):null;
        return (
          <Card className={classes.card}>
            <CardContent className={classes.content}>
              <Typography
                variant="h5"
                color="primary"
                component={Link}
                to={`/users/${userHandle}`}
              >
                {userHandle}
              </Typography>
              {deleteButton}
              <Typography variant="body2" color="textSecondary">
                {dayjs(createdAt).fromNow()}
              </Typography>
              <Typography variant="body1">{body}</Typography>
              <LikeButton screamId={screamId} />
              <span>{likeCount} Likes</span>
              <MyButton tip="Comment" btnName={screamId} onClick={this.openExpanded}>
                <ChatIcon color="primary" />
              </MyButton>
              <span>{commentCount} Comments</span>
              <ScreamExpand
              id={screamId} 
               />
            </CardContent>
          </Card>
        );
    }
}

TaskListed.propTypes = {
    task: PropTypes.object.isRequired,
    likeScream: PropTypes.func.isRequired,
    unlikeScream: PropTypes.func.isRequired,
    comment: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    getScream: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user
})

const mapActionsToProps = {
    likeScream,
    unlikeScream,
    comment,
    getScream
}

export default connect(mapStateToProps, mapActionsToProps)(withSyles(styles)(TaskListed));