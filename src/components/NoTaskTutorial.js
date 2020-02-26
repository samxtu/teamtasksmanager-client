import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';

const useStyles = makeStyles(() => ({
  // root: {
  //   display: 'flex',
  // },
  // details: {
  //   display: 'flex',
  //   flexDirection: 'column',
  //   margin: 'auto',
  //   textAlign: 'center'
  // },
  content: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    textAlign: 'center',
    flex: '1 0 auto',
    width: '100%',
    minHeight:'250px'
  },
  cover: {
    width: '100%',
    height: '150px'
  },
  // controls: {
  //   display: 'flex',
  //   alignItems: 'center',
  //   paddingLeft: theme.spacing(1),
  //   paddingBottom: theme.spacing(1),
  // },
  // playIcon: {
  //   height: 38,
  //   width: 38,
  // },
}));

export default function NoTaskTutorial({page,pageNo}) {
  const classes = useStyles();
  const theme = useTheme();
  const type = page==='home'?('ongoing'):(
    page==='completed'?('completed'):(
      page==='failed'?('failed'):(
        page==='disco'?('discontinued'):(
          ''
        )
      )
    )
  )
  let markup;
  let image = 'https://mk0suganthan4xwl0kia.kinstacdn.com/wp-content/uploads/2019/03/Next-generation-image-formats-1200x385.jpeg';
  
  markup = (page === 'home') || (page === 'completed') || (page === 'failed') || (page === 'disco') ?(
        <Card className={classes.root}>
            <CardActionArea>
            <CardMedia
            className={classes.cover}
            image={image}
            title="Live from space album cover"
            />
            {pageNo === 1?(
              <CardContent className={classes.content}>
                <Typography component="h3" variant="h3">
                  Welcome to office tasks manager!<br/>
                </Typography>
                <Typography variant="h6" color='primary'>
                  The place to monitor responsibility and express accountability!<br/>
                </Typography>
                <Typography variant="h6" color='primary'>
                  Improve productivity and efficiency in your tasks with your team!<br/><br/>
                </Typography>
                <Typography variant="h5" color='error'>
                  You have no {type} tasks!
                </Typography>
              </CardContent>
            ):(pageNo === 2?(
              <CardContent className={classes.content}>
                <Typography component="h3" variant="h3">
                  First, add team members!<br/>
                </Typography>
                <Typography variant="h6" color='primary'>
                  Any task should contain at least two people responsible for the specific task.<br/>
                  One will be the supervisor and another the person in charge of carrying out the specific task.<br/>
                  There can be any number of supervisors and people in charge for a task depending on a team. <br/>
                </Typography>
                <Typography variant="h6" color='primary'>
                  NB: Only attached team members (supervisors and PICs) can see and respond to the specific task!
                </Typography>
              </CardContent>
            ):(
              <CardContent className={classes.content}>
                <Typography component="h3" variant="h3">
                  Changing status of a task!<br/>
                </Typography>
                <Typography variant="h6" color='primary'>
                  Only a supervisor can change the status of a task whether as completed, failed or discontinued!<br/>
                  Once the task has changed, the said last status of the task will go into attached team members records.<br/>
                  Example: If a task has been changed to complete after the task deadline has passed will record as late <br/>
                  completion of the said task to the profile of a supervisor and person in charge of that depending on your specific position on the task.<br/>
                </Typography>
                <Typography variant="h6" color='primary'>
                  You can add a task by clicking the add task button at the bottom right corner!
                </Typography>
              </CardContent>
              ))}
            </CardActionArea>
        </Card>
      ):(
        (page === 'todo') ?(
          <Card className={classes.root}>
              <CardActionArea>
              <CardMedia
              className={classes.cover}
              image={image}
              title="Live from space album cover"
              />
              {pageNo === 1?(
                <CardContent className={classes.content}>
                  <Typography component="h3" variant="h3">
                    Welcome to your To-Do list!<br/>
                  </Typography>
                  <Typography variant="h6" color='primary'>
                    Add personal tasks for better organization and productivity!<br/>
                  </Typography>
                  <Typography variant="h6" color='primary'>
                    No need to memorize everything, to-do will be your reminder!<br/><br/>
                  </Typography>
                  <Typography variant="h5" color='error'>
                    You have no to-do tasks, add now to your list!
                  </Typography>
                </CardContent>
              ):(pageNo === 2?(
                <CardContent className={classes.content}>
                  <Typography component="h3" variant="h3">
                    Stay motivated!<br/>
                  </Typography>
                  <Typography variant="h6" color='primary'>
                    You may have millions of things to-do,<br/>but you also also have a million reasons to-do them.<br/>
                  </Typography>
                  <Typography variant="h6" color='primary'>
                    NB: Your to-do tasks will appear on your scheduler together with group tasks,<br/>
                    we arrange everything to make things easier for you!
                  </Typography>
                </CardContent>
              ):(
                <CardContent className={classes.content}>
                  <Typography component="h3" variant="h3">
                    Start planning!<br/>
                  </Typography>
                  <Typography variant="h6" color='primary'>
                  Be less stressed, more organized and find yourself with more time in the day than you ever realized you had!!<br/>
                  </Typography>
                  <Typography variant="h6" color='primary'>
                    You can add to your to-do list by clicking the add to-do button at the bottom right corner!
                  </Typography>
                </CardContent>
                ))}
              </CardActionArea>
          </Card>
        ):(
          ''
        )
      )
  
  return (
    markup
  )
}