import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import React, {Fragment} from 'react';
import axios from "axios";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Fab from '@material-ui/core/Fab';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
  } from '@material-ui/pickers';

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  form:{
      margin:'auto',
      paddingBottom:'10px',
      width:'80%',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: '45%',
  },
  extendedIcon: {
    position: 'absolute',
    right: theme.spacing(1),
    bottom: theme.spacing(1)
  },
}));


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({addNewToDo}) {
  const classes = useStyles();
  const categories = ['General','Office','Homework','Personal','Other'];
  const repeats = ['Never','Everyday','Every week day','Monday to saturday','Every week','Every month','Every year'];
  const [open, setOpen] = React.useState(false);
  const [repeat, setRepeatOpen] = React.useState(false);
  const [category, setSelectOpen] = React.useState(false);
  const [state, setState] = React.useState({
    body: "",
    deadline: new Date(),
    dueTime: new Date(),
    repeat: "Never",
    category: "General",
    loading: false,
    errors: {}
  })
  const handleSubmit = event => {
    event.preventDefault();
    setState({
        ...state,
      loading: true
    });
    const newTodoData = {
      body: state.body,
      deadline: state.deadline,
      dueTime: state.dueTime,
      category: state.category,
      repeat: state.repeat
    };
    axios
      .post("/todo", newTodoData)
      .then(res => {
        addNewToDo(res.data)
        setState({
          body: "",
          deadline: new Date(),
          dueTime: new Date(),
          repeat: "Never",
          category: "General",
          loading: false,
          errors: {}
        });
        setOpen(false);
      })
      .catch(err => {
        console.log(err.response.data);
        setState({
            ...state,
          errors: err.response.data,
          loading: false
        });
      });
  };

  const handleChange = event => {
    setState({
        ...state,
      [event.target.name]: event.target.value
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSelectClose = () => {
    setSelectOpen(false);
  };
  const handleSelectOpen = () => {
    setSelectOpen(true);
  };
  const handleRepeatClose = () => {
    setRepeatOpen(false);
  };
  const handleRepeatOpen = () => {
    setRepeatOpen(true);
  }

  const handleDateChange = date => {
    setState({
        ...state,
      deadline: date
    });
  };
  
  return (
    <Fragment>
    <Fab
    variant="extended"
    size="small"
    color="primary"
    aria-label="add"
    onClick={handleClickOpen}
    className={classes.extendedIcon}
    >
    <PlaylistAddCheckIcon />
    Add to-do
    </Fab>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Add new task:
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              Close
            </Button>
            <IconButton edge="end" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Grid container>
              <form className={classes.form} noValidate onSubmit={handleSubmit}>
                
                <Grid container style={{marginTop:'10px'}}>
                    <Grid item xs={12}>
                        <TextField
                        fullWidth
                        id="body"
                        name="body"
                        type="body"
                        label="What is to be done?"
                        helperText={state.errors.body}
                        error={state.errors.body ? true : false}
                        className={classes.textField}
                        value={state.body}
                        onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid container justify="space-around">
                            <KeyboardDatePicker
                            margin="normal"
                            id="date-picker-dialog"
                            label="Due date"
                            format="MM/dd/yyyy"
                            name="deadline"
                            value={state.deadline}
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                            />
                            <KeyboardTimePicker
                            margin="normal"
                            id="time-picker"
                            label="Due time"
                            name="dueTime"
                            value={state.deadline}
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change time',
                            }}
                            />
                        </Grid>
                        </MuiPickersUtilsProvider>
                    </Grid>
                    <Grid item xs={12}>
                    <FormControl className={classes.formControl} justify="space-around">
                        <InputLabel id="controlled-open-select">Repeat</InputLabel>
                        <Select
                        labelId="controlled-open-select"
                        id="controlled-open-select"
                        name="repeat"
                        open={repeat}
                        onClose={handleRepeatClose}
                        onOpen={handleRepeatOpen}
                        value={state.repeat}
                        onChange={handleChange}
                        >
                        {repeats.map(branch=>(<MenuItem key={branch} value={branch}>{branch}</MenuItem>))}
                        </Select>
                    </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                    <FormControl className={classes.formControl} justify="space-around">
                        <InputLabel id="demo-controlled-open-select">Category</InputLabel>
                        <Select
                        labelId="demo-controlled-open-select"
                        id="demo-controlled-open-select"
                        name='category'
                        open={category}
                        onClose={handleSelectClose}
                        onOpen={handleSelectOpen}
                        value={state.category}
                        onChange={handleChange}
                        >
                        {categories.map(branch=>(<MenuItem key={branch} value={branch}>{branch}</MenuItem>))}
                        </Select>
                    </FormControl>
                    </Grid>
                </Grid>
                {state.errors.error && (
                  <Typography variant="caption" className={classes.caption}>
                    {state.errors.error}!
                  </Typography>
                )}
                <Button
                  type="submit"
                  style={{marginTop:0,marginRight:0}}
                  variant="contained"
                  color="primary"
                  disabled={state.loading}
                  className={classes.button}
                  onClick={handleSubmit}
                >
                  Save new task
                  {state.loading &&(
                      <CircularProgress size={30} className={classes.spinner} />
                  )}
                </Button>
              </form>
        </Grid>
      </Dialog>
    </Fragment>
  );
}
