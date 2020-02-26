import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import dayjs from 'dayjs';
import { uploadProfileImage } from '../redux/actions/userActions';
// import EditProfile from './EditProfile';

// MUI stuff 
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import MuiLink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

// mui icons 
import BusinessIcon from '@material-ui/icons/Business';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import EditIcon from '@material-ui/icons/Edit';
import CalendarToday from '@material-ui/icons/CalendarToday';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import UpdateIcon from '@material-ui/icons/Update';


const styles = (theme) =>({
    paper: {
        padding: 20
    },
    skelo: {
        padding: '15px',
        height: '10px'
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
    },
    content:{
        margin: 'auto',
        textAlign: 'center',
        minHeight: '400px' 
    }
})

class Profile extends Component {
    handleImageChange = (event) => {
        let image = event.target.files[0]
        const formData = new FormData()
        formData.append('image',image,image.name)
        this.props.uploadProfileImage(formData);
    }

    handleImageEdit = () => {
        const imageFileInput = document.getElementById('imageInput');
        imageFileInput.click()
    }

    handleUpdate = () => {
        
    }

    render() {
        const {classes, user: {loading, authenticated, credentials: {handle, createdAt, initial, firstname, lastname, email, department, imageUrl}}}  = this.props;
        
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
                        <Typography color="primary" variant="h5">User: {handle}</Typography><hr/>
                        <Typography variant="body1">Fullname: {initial+' '+firstname+' '+lastname}</Typography><hr/>
                        
                            <AlternateEmailIcon color='primary'/>
                            <span>Email: {email}</span><hr/>
                        {department && (
                        <Fragment>
                            <BusinessIcon color='primary'/>
                            <MuiLink component={Link} to={`/team/${department}`} color="primary" variant="body2">{'Department: '+department}</MuiLink><hr/>
                        </Fragment>
                        )}
                        <CalendarToday color='primary'/>
                        <span>Added on {dayjs(createdAt).format('MMM D YYYY')}</span>
                    </div>
                    <Tooltip title='Update info request' placement='top'>
                        <IconButton onClick={this.handleUpdate}>
                            <UpdateIcon color='primary'/>
                        </IconButton>
                    </Tooltip>
                    {/* <EditProfile/> */}
                </div>

            </Paper>
        ):(
            <Paper className={classes.paper}>
                <Typography variant='body2' align='center'>No profile. Login again here!</Typography>
                <div className={classes.buttons}>
                    <Button variant='contained' color='primary' component={Link} to='/login'>Login</Button>
                </div>
            </Paper>
        )):(<Card className={classes.content}>
            <CardHeader>
                <Skeleton animation="wave" height={50} width={50} />
            </CardHeader>
            <CardContent className={classes.content} >
                <Skeleton animation="wave" className={classes.skelo}  />
                <Skeleton animation="wave" className={classes.skelo} width="80%" />
                <Skeleton animation="wave" className={classes.skelo}  />
                <Skeleton animation="wave" className={classes.skelo} width="80%" />
                <Skeleton animation="wave" className={classes.skelo}  />
                <Skeleton animation="wave" className={classes.skelo} width="80%" />
            </CardContent>
          </Card>)

        return ProfileMarkup;
    }
}

Profile.prototypes = {
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    uploadProfileImage: PropTypes.func.isRequired
}

const mapActionsToProps = {
    uploadProfileImage
}

const mapStateToProps = (state) => ({
    user: state.user,
})

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Profile))
