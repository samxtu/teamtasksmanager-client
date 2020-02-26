import React, { Fragment } from 'react';
import {Link} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CardMedia from '@material-ui/core/CardMedia';

const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 140,
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
            height: 100,
            width: 100,
            margin:'3px auto auto 5px',
            objectFit: 'cover',
            maxWidth: '100%',
            borderRadius: '50%'
        },
        '& .profile-details': {
            width:'100%',
            margin:'auto',
            textAlign: 'center',
            '& span, svg': {
                verticalAlign: 'middle'
            },
            '& a': {
                color: "rgba(96, 125, 139, 1)"
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
  });

export default function FocusedMember({member,clearance}) {
    const classes = useStyles();
    const visible = Boolean(member.clearance<clearance);
    return (
        <Paper className={classes.paper}>
        <Grid container className={classes.profile}>
            <Grid item xs={5}  className="image-wrapper">
            <CardMedia title='profile' image={member.imageUrl} className="profile-image" />
            </Grid>
            <Grid item xs={7}>
                <Typography variant="h5" color='primary' component={Link} to='#'>{member.handle}</Typography>
                <Typography variant='body1'>Fullname: {member.initial+'. '+member.firstname+' '+member.lastname}</Typography>
                <Typography variant='body1'>Email: {member.email}</Typography>
                <Typography variant='body1'>Department: {member.department}</Typography>
            </Grid>
            <hr/>
            <div className="profile-details">
                <Typography color="primary" variant="h5" style={{width:'100%'}}>Task record:</Typography><hr/>
                {visible?(
                <Fragment>
                    <Typography variant='body1'>As supervisor:</Typography>
                    <Typography variant='subtitle1' color='primary'>Ongoing: <b>{member.OTAS}</b></Typography>
                    <Typography variant='subtitle1' color='primary'>Early completion: <b>{member.COTAS}</b></Typography>
                    <Typography variant='subtitle1' color='primary'>Late completion: <b>{member.CLAS}</b></Typography>
                    <Typography variant='subtitle1' color='primary'>Failed: <b>{member.FAS}</b></Typography>
                    <Typography variant='body1'>As person in charge:</Typography>
                    <Typography variant='subtitle1' color='primary'>Ongoing: <b>{member.OTAPIC}</b></Typography>
                    <Typography variant='subtitle1' color='primary'>Early completion: <b>{member.COTAPIC}</b></Typography>
                    <Typography variant='subtitle1' color='primary'>Late completion: <b>{member.CLAPIC}</b></Typography>
                    <Typography variant='subtitle1' color='primary'>Failed: <b>{member.FAPIC}</b></Typography>
                </Fragment>):(
                <Fragment>
                    <Typography variant='body1'>As supervisor:</Typography>
                    <Typography variant='subtitle1' color='primary'>Ongoing: <b>***Unauthorized***</b></Typography>
                    <Typography variant='subtitle1' color='primary'>Early completion: <b>***Unauthorized***</b></Typography>
                    <Typography variant='subtitle1' color='primary'>Late completion: <b>***Unauthorized***</b></Typography>
                    <Typography variant='subtitle1' color='primary'>Failed: <b>***Unauthorized***</b></Typography>
                    <Typography variant='body1'>As person in charge:</Typography>
                    <Typography variant='subtitle1' color='primary'>Ongoing: <b>***Unauthorized***</b></Typography>
                    <Typography variant='subtitle1' color='primary'>Early completion: <b>***Unauthorized***</b></Typography>
                    <Typography variant='subtitle1' color='primary'>Late completion: <b>***Unauthorized***</b></Typography>
                    <Typography variant='subtitle1' color='primary'>Failed: <b>***Unauthorized***</b></Typography>
                </Fragment>
                )}
            </div>
        </Grid>

    </Paper>
    )
}
