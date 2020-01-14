import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import dayjs from 'dayjs';


// MUI stuff 
import Paper from '@material-ui/core/Paper';
import MuiLink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

// mui icons 
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';



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

class UserProfile extends Component {
    render() {
        const {classes, user: { credentials: {handle, createdAt, bio, website, location, imageUrl}}}  = this.props;
        
        let ProfileMarkup = !loading ? (authenticated? (
            <Paper className={classes.paper}>
                <div className={classes.profile}>
                    <div className="image-wrapper">
                        <img src={imageUrl} alt="Profile" className="profile-image"/>
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
                </div>

            </Paper>
        ):(
            <Paper className={classes.paper}>
                <Typography variant='body2' align='center'>No profile. Try again!</Typography>
            </Paper>
        )):(<p>Loading...</p>)

        return ProfileMarkup;
    }
}

UserProfile.prototypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
}


export default connect(null, null)(withStyles(styles)(UserProfile))
