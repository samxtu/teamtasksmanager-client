import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto'
  },
  content: {
    flex: '1 0 auto',
    textAlign:'center'
  },
  cover: {
    width: 151,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));

export default function MediaControlCard({member,focusOnMe}) {
  const classes = useStyles();
  const handlefocusOnMe = () =>{
    return focusOnMe(member)
  }
  return (
    <Card className={classes.root}>
    <CardMedia
      className={classes.cover}
      image={member.imageUrl}
      title="User picture"
    />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h6" variant="h5">
            {member.handle}
          </Typography>
          <Typography variant="body1" color="primary">
            Email: {member.email}
          </Typography>
          <Typography variant="body1" color="primary">
            Department: {member.department}
          </Typography>
        </CardContent>
        <div className={classes.controls}>
          <Button 
          onClick={handlefocusOnMe}
          variant='outlined'
          color='primary'
          endIcon={<PlayArrowIcon />}
          aria-label="More details">
            Expand details
          </Button>
        </div>
      </div>
    </Card>
  );
}
