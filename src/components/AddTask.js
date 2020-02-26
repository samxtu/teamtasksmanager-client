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
import PostAddIcon from '@material-ui/icons/PostAdd';
import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
  } from '@material-ui/pickers';
  import SelectorBaby from './ChipSelector';
  import FileBaby from './FileInput';

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

export default function FullScreenDialog({addNewTask,user,team}) {
  const valuetext = (value) =>{
        return value===1?'Low':value===2?'Normal':value===3?'High':''
      }
  const classes = useStyles();
  const marks =[
      {
          value:1,
          label:'Low'
      },
      {
          value:2,
          label:'Normal'
      },
      {
          value:3,
          label:'High'
      }
  ]
  const repeats = ['Never','Everyday','Every week day','Monday to saturday','Every week','Every month','Every year'];
  const [open, setOpen] = React.useState(false);
  const [repeat, setRepeatOpen] = React.useState(false);
  const [state, setState] = React.useState({
    title: "",
    details: "",
    priority: 2,
    deadline: new Date(),
    repeat: "Never",
    selected: [user],
    selectedInSups:[],
    selectedInPics:[],
    PIC: [],
    supervisor:[{
        handle: user.handle,
        email: user.email,
        imageUrl: user.imageUrl,
        department: user.department,
        branch: user.branch,
        position: user.position
    }],
    files:[],
    loading: false,
    errors: {}
  })
  const handleSubmit = event => {
    event.preventDefault();
    const newTodoData = {
        details: state.details,
        title: state.title,
        deadline: state.deadline,
        repeat: state.repeat,
        priority: state.priority,
        status: 'ongoing',
        PIC:state.selectedInPics,
        Supervisors: state.selectedInSups
    };
    var data = new Blob([JSON.stringify(newTodoData)], {type: 'application/json'})
    data.lastModifiedDate = new Date();
    data.name = 'data.json';
    setState({
      ...state,
    files:state.files.push(data),
    loading: true
  });
  var formData = Array.prototype.reduce.call(
    state.files,
    function (formData, file, i) {
      console.log(i)
      formData.append('file' + i, file);
      return formData;
    },
    new FormData()
  );
  // let arrtose = new FormData()
  // state.files.forEach((fl,o)=>{
  //   arrtose.append('files'+o,fl)
  // })
    axios
      .post("/teamtask", formData,{
        headers: {
            'content-type': 'multipart/form-data'
        }
    })
      .then(res => {
        addNewTask(res.data)
        setState({
          title: "",
          details: "",
          priority: 2,
          deadline: new Date(),
          repeat: "Never",
          selected: [user],
          selectedInSups:[],
          selectedInPics:[],
          PIC: [],
          supervisor:[{
              handle: user.handle,
              email: user.email,
              imageUrl: user.imageUrl,
              department: user.department,
              branch: user.branch,
              position: user.position
          }],
          files:[],
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
    setState({
      title: "",
      details: "",
      priority: 2,
      deadline: new Date(),
      repeat: "Never",
      selected: [user],
      selectedInSups:[],
      selectedInPics:[],
      PIC: [],
      supervisor:[{
          handle: user.handle,
          email: user.email,
          imageUrl: user.imageUrl,
          department: user.department,
          branch: user.branch,
          position: user.position
      }],
      files:[],
      loading: false,
      errors: {}
    });
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

  const selectMember = (arr,source) =>{
    if(source==='Supervisors'){
      setState({
        ...state,
        selectedInSups: arr,
        selected: state.selectedInPics.concat(arr)
      })
    } else{
      setState({
        ...state,
        selectedInPics: arr,
        selected: state.selectedInSups.concat(arr)
      })
    }
    console.log(state.selected)
  }
  const selectFile = (blobs)=>{
    setState({
      ...state,
      files: state.files.concat(blobs)
    })
 }  
  const removeFile = (blobs)=>{
    setState({
      ...state,
      files:blobs
    })
  }

  
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
    <PostAddIcon />
    Add task
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
                        <SelectorBaby selectMember={selectMember} data={team} selected={state.selected} user={user} label={'Supervisors'} />
                    </Grid>
                    <Grid item xs={12}>
                        <SelectorBaby selectMember={selectMember} data={team} selected={state.selected} user={user} label={'People in charge'} />
                    </Grid>
                    <Grid item xs={12} style={{marginTop:'10px'}}>
                        <TextField
                        fullWidth
                        id="title"
                        name="title"
                        type="title"
                        variant="outlined"
                        label="Task title:"
                        helperText={state.errors.title}
                        error={state.errors.title ? true : false}
                        className={classes.textField}
                        value={state.title}
                        onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} style={{marginTop:'10px'}}>
                        <TextField
                        fullWidth
                        id="details"
                        name="details"
                        type="details"
                        variant="outlined"
                        multiline
                        rows={3}
                        rowsMax={4}
                        label="Task details:"
                        helperText={state.errors.details}
                        error={state.errors.details ? true : false}
                        className={classes.textField}
                        value={state.details}
                        onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} style={{marginTop:'10px'}}>
                    <FileBaby selectFile={selectFile} removeFile={removeFile} />
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
                    <Grid item xs={6}>
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
                    <Grid item xs={6}>
                        <Typography id="discrete-slider" gutterBottom>
                            Priority: 
                        </Typography>
                        <Slider
                            defaultValue={2}
                            getAriaValueText={valuetext}
                            aria-labelledby="discrete-slider"
                            valueLabelDisplay="auto"
                            name='priority'
                            onChange={handleChange}
                            step={1}
                            marks={marks}
                            min={1}
                            max={3}
                        />
                    </Grid>
                </Grid>
                {state.errors.error && (
                  <Typography variant="caption" className={classes.caption}>
                    {state.errors.error}!
                  </Typography>
                )}
                <Button
                  style={{marginTop:0,marginRight:0}}
                  type="submit"
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
