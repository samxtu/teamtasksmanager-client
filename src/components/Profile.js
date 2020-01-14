import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import dayjs from 'dayjs';
import { uploadImage, logoutUser } from '../redux/actions/userActions';
import EditProfile from './EditProfile';


// MUI stuff 
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import MuiLink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

// mui icons 
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import EditIcon from '@material-ui/icons/Edit';
import CalendarToday from '@material-ui/icons/CalendarToday';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';



const styles = (theme) =>({
    paper: {
        padding: 20
    },
    profile: {
        '& .image-wrapper': {
            textAlign: 'center',
            position: 'relative',
            '& button':{
                position: 'absolute',
                top: '80%',
                left: '70%'
            }
        },
        '& .profile-image': {
            height: 200,
            width: 200,
            objectFit: 'cover',
            maxWidth: '100%',
            borderRadius: '50%'
        },
        '& .profile-details': {
            textAlign: 'center',
            '& span, svg': {
                verticalAlign: 'middle'
            },
            '& a': {
                color: theme.palette.primary.main
            }
        },
        '& hr': {
            border: 'none',
            margin: '0 0 10px 0'
        },
        '& svg.button': {
            '&:hover':{
                cursor: 'pointer'
            }
        }
    },
    buttons: {
        textAlign: 'center',
        '& a': {
            margin: '20px 10px'
        }
    }
})

class Profile extends Component {
    handleImageChange = (event) => {
        let image = event.target.files[0]
        const formData = new FormData()
        formData.append('image',image,image.name)
        this.props.uploadImage(formData);
    }
    handleImageEdit = () => {
        const imageFileInput = document.getElementById('imageInput');
        imageFileInput.click()
    }
    handleLogout = () => {
        this.props.logoutUser()
    }
    render() {
        const {classes, user: {loading, authenticated, credentials: {handle, createdAt, bio, website, location, imageUrl}}}  = this.props;
        
        let ProfileMarkup = !loading ? (authenticated? (
            <Paper className={classes.paper}>
                <div className={classes.profile}>
                    <div className="image-wrapper">
                        <img src={imageUrl} alt="Profile" className="profile-image"/>
                        <input hidden="hidden" type="file" id="imageInput" onChange={this.handleImageChange} />
                        <Tooltip title="Edit profile picture" placement="top">
                            <IconButton onClick={this.handleImageEdit}>
                                <EditIcon color="primary"/>
                            </IconButton>
                        </Tooltip>
                    </div>
                    <hr/>
                    <div className="profile-details">
                        <MuiLink component={Link} to={`users/${handle}`} color="primary" variant="body2">@{handle}</MuiLink><hr/>
                        {bio && (
                            <Typography variant="body2">{bio}</Typography>
                        )}<hr/>
                        {location && (
                        <Fragment>
                            <LocationOn color='primary'/>
                            <span>{location}</span><hr/>
                        </Fragment>
                        )}
                        {website && (
                        <Fragment>
                            <LinkIcon color='primary'/>
                            <a href={website} target="_blank" rel='noopener noreferrer'>{' '+website}</a><hr/>
                        </Fragment>
                        )}
                        <CalendarToday color='primary'/>
                        <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
                    </div>
                    <Tooltip title='Logout' placement='top'>
                        <IconButton onClick={this.handleLogout}>
                            <KeyboardReturn color='primary'/>
                        </IconButton>
                    </Tooltip>
                    <EditProfile/>
                </div>

            </Paper>
        ):(
            <Paper className={classes.paper}>
                <Typography variant='body2' align='center'>No profile. Login or signup here!</Typography>
                <div className={classes.buttons}>
                    <Button variant='contained' color='primary' component={Link} to='/login'>Login</Button>
                    <Button variant='contained' color='secondary' component={Link} to='/signup'>Signup</Button>
                </div>
            </Paper>
        )):(<p>Loading...</p>)

        return ProfileMarkup;
    }
}

Profile.prototypes = {
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    uploadImage: PropTypes.func.isRequired,
    logoutUser: PropTypes.func.isRequired
}

const mapActionsToProps = {
    uploadImage,
    logoutUser
}

const mapStateToProps = (state) => ({
    user: state.user
})

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Profile))
