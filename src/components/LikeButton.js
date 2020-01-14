import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {likeScream, unlikeScream} from '../redux/actions/dataActions';
import MyButton from '../util/MyButton';
//icons 
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBourder from '@material-ui/icons/FavoriteBorder';

class LikeButton extends Component {
    likedScream = () => {
        if(this.props.user.likes && this.props.user.likes.find(like=>like.screamId === this.props.screamId))
          return true;
          else return false;
    }
    likeScream = () => {
        this.props.likeScream(this.props.screamId)
    }
    unlikeScream = () => {
        this.props.unlikeScream(this.props.screamId)
    }
    render() {
        const {user: {authenticated}}= this.props
        const likeButton = !authenticated?(
            <Link to="/login">
                <MyButton tip="Like">
                    <FavoriteBourder color="primary" />
                </MyButton>
            </Link>
        ):(
            this.likedScream() ?(
              <MyButton tip="Undo like" onClick={this.unlikeScream}>
                <FavoriteIcon color="primary" />
              </MyButton>
            ):(
                <MyButton tip="Like" onClick={this.likeScream}>
                  <FavoriteBourder color="primary" />
                </MyButton>
            )
        );
        return (
            likeButton
        )
    }
}

LikeButton.propTypes = {
    user: PropTypes.object.isRequired,
    screamId: PropTypes.string.isRequired,
    likeScream: PropTypes.func.isRequired,
    unlikeScream: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    user: state.user
})

const mapActionsToProps = {
    likeScream,
    unlikeScream
}

export default connect(mapStateToProps, mapActionsToProps)(LikeButton)
