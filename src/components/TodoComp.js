import React from 'react';
import axios from "axios";
import EditToDo from '../components/EditToDo';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
//mui
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Slide from '@material-ui/core/Slide';

const useStyles = makeStyles({
  root: {
    width: "80%",
    margin: "auto",
    textAlign:"left",
    alignItems:"left",
    alignContent:"left"
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  content:{
      paddingBottom:0,
      marginBottom:0
  },
  actions:{
    paddingBottom:0,
    marginBottom:0
  }
});

export default function SimpleCard({toEdit,todo}) {
  const classes = useStyles();
  const direction = todo.status==='pending'?'left':'right';
  dayjs.extend(relativeTime);
  let status = todo.status;
  let now = new Date().toISOString();
  let colorr="textSecondary";
  todo.deadline>now?(
    colorr="textSecondary"
  ):(
    colorr= (todo.status==='pending')?'error':'textSecondary'
  )
  const [checkedB, setCheck] = React.useState(todo.status==='pending'?false:true);
  const [fire, setFire] = React.useState(false);
  const handleChange = name => event => {
    setCheck(event.target.checked);
    setFire(true)
    status= event.target.checked?'complete':'pending';
    axios.get(`/todo/${todo.todoId}/${status}`)
    .then((res)=>{
        toEdit({...todo,status})
    })
    .catch(err=>{
        console.log(err.response.data)
    })
  };
  return (
    <Slide direction={direction} in={!fire} enter='false' timeout={{appear: 0, enter: 0,exit: 300 }} mountOnEnter unmountOnExit>
    <Card className={classes.root}>
      <CardContent className={classes.content} >
        <Typography variant="h5" component="h2">
          {todo.body}
        </Typography>
        <Typography className={classes.pos} color={colorr}>
          {todo.category}: Due in {dayjs(todo.deadline).format('YYYY MMM D')} {dayjs(todo.deadline).fromNow()} at {dayjs(todo.deadline).format('hh:mm a')}
        </Typography>
      </CardContent>
      <CardActions className={classes.actions} >
        {todo.status==='complete'?(null):(<EditToDo editToDo={toEdit} todo={todo} />)}
        <FormControlLabel
        control={
          <Switch
            checked={checkedB}
            onChange={handleChange('checkedB')}
            value="checkedB"
            color="primary"
          />
        }
        label={checkedB?('Completed'):('Ongoing')}
      />
      </CardActions>
    </Card>
    </Slide>
  );
}
