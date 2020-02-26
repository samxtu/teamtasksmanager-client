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
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Slider from '@material-ui/core/Slider';
import Grid from '@material-ui/core/Grid';

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
  
function valuetext(value) {
    return `Clearance level: ${value}`;
  }

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({branches,departments,user,dispatchGetTeam}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [addUser, setChecked] = React.useState(false);
  const [changeDuty, setDChecked] = React.useState(false);
  const [branch, setSelectOpen] = React.useState(false);
  const [department, setdSelectOpen] = React.useState(false);
  const [state, setState] = React.useState({
    email: "",
    password: "",
    confirmPassword: "",
    handle: "",
    position: "",
    initial:"",
    branch:"",
    department:"",
    clearance:1,
    loading: false,
    errors: {}
  })

  const handleSubmit = event => {
    event.preventDefault();
    setState({
        ...state,
      loading: true
    });
    const newUserData = {
      email: state.email,
      password: state.password,
      confirmPassword: state.confirmPassword,
      handle: state.handle,
      position: state.position,
      firstname: state.firstname,
      lastname: state.lastname,
      initial: state.initial,
      branch: state.branch,
      department: state.department,
      clearance: state.clearance,
      addUser: addUser,
      changeDuty: changeDuty
    };
    axios
      .post("/signup", newUserData)
      .then(res => {
        newUserData.imageUrl = `https://firebasestorage.googleapis.com/v0/b/team-tasks-manager.appspot.com/o/noimage.png?alt=media`;
        dispatchGetTeam(newUserData)
        setState({
            ...state,
          loading: false
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
  const handledSelectClose = () => {
    setdSelectOpen(false);
  };
  const handledSelectOpen = () => {
    setdSelectOpen(true);
  };
  const toggleUserChecked = () => {
    setChecked(prev => !prev);
  };
  const toggleChecked = () => {
    setDChecked(prev => !prev);
  };
  
  return (
    <Fragment>
    {user.addUser?(<Fab
    variant="extended"
    size="small"
    color="primary"
    aria-label="add"
    onClick={handleClickOpen}
    className={classes.extendedIcon}
    >
    <GroupAddIcon />
      New to team
    </Fab>):null}
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Add new team member:
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
                    <Grid item xs={6}>
                        <TextField
                        fullWidth
                        id="email"
                        name="email"
                        type="email"
                        label="Email"
                        helperText={state.errors.email}
                        error={state.errors.email ? true : false}
                        className={classes.textField}
                        value={state.email}
                        onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                        fullWidth
                        id="position"
                        name="position"
                        type="position"
                        label="Position in company"
                        helperText={state.errors.position}
                        error={state.errors.position ? true : false}
                        className={classes.textField}
                        value={state.position}
                        onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                        fullWidth
                        id="password"
                        name="password"
                        type="password"
                        label="Password"
                        helperText={state.errors.password}
                        error={state.errors.password ? true : false}
                        className={classes.textField}
                        value={state.password}
                        onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                        fullWidth
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        label="Confirm Password"
                        helperText={state.errors.confirmPassword}
                        error={state.errors.confirmPassword ? true : false}
                        className={classes.textField}
                        value={state.confirmPassword}
                        onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                        fullWidth
                        id="initial"
                        name="initial"
                        type="text"
                        label="Name prefix: Dr, Mr, Mrs ..."
                        maxLength='5'
                        helperText={state.errors.initial}
                        error={state.errors.initial ? true : false}
                        className={classes.textField}
                        value={state.initial}
                        onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                        fullWidth
                        id="handle"
                        name="handle"
                        type="text"
                        label="Account handle: Mr.F.Lastname, Ms.Firstname ..."
                        helperText={state.errors.handle}
                        error={state.errors.handle ? true : false}
                        className={classes.textField}
                        value={state.handle}
                        onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                        fullWidth
                        id="firstname"
                        name="firstname"
                        type="text"
                        label="Firstname"
                        helperText={state.errors.firstname}
                        error={state.errors.firstname ? true : false}
                        className={classes.textField}
                        value={state.firstname}
                        onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                        fullWidth
                        id="lastname"
                        name="lastname"
                        type="text"
                        label="Lastname"
                        helperText={state.errors.lastname}
                        error={state.errors.lastname ? true : false}
                        className={classes.textField}
                        value={state.lastname}
                        onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-controlled-open-select">Branch</InputLabel>
                        <Select
                        labelId="demo-controlled-open-select"
                        id="demo-controlled-open-select"
                        name='branch'
                        open={branch}
                        onClose={handleSelectClose}
                        onOpen={handleSelectOpen}
                        value={state.branch}
                        onChange={handleChange}
                        >
                        {branches.map(branch=>(<MenuItem value={branch}>{branch}</MenuItem>))}
                        </Select>
                    </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-controlled-open-select-label">Department</InputLabel>
                        <Select
                        labelId="demo-controlled-open-select-label"
                        id="demo-controlled-open-select"
                        name='department'
                        open={department}
                        onClose={handledSelectClose}
                        onOpen={handledSelectOpen}
                        value={state.department}
                        onChange={handleChange}
                        >
                        {departments.map(branch=>(<MenuItem value={branch}>{branch}</MenuItem>))}
                        </Select>
                    </FormControl>
                    </Grid>
                </Grid>
                {Boolean(user.clearance===10)?(
                    <Grid container style={{width:'100%'}}>
                    <Grid item xs={6}>
                    <FormGroup>
                    <FormControlLabel
                        label="Allow user to add new users:"
                        control={<Switch checked={addUser} onChange={toggleUserChecked} />}
                    />
                    </FormGroup>
                    </Grid>
                    <Grid item xs={6}>
                    <FormGroup>
                    <FormControlLabel
                        label="Allow user to send users off-duty:"
                        control={<Switch checked={changeDuty} onChange={toggleChecked} />}
                    />
                    </FormGroup>    
                    </Grid> 
                    </Grid>):null} 
                <Typography id="discrete-slider" gutterBottom>
                    Clearance level: 
                </Typography>
                <Slider
                    defaultValue={1}
                    getAriaValueText={valuetext}
                    aria-labelledby="discrete-slider"
                    valueLabelDisplay="auto"
                    name='clearance'
                    onChange={handleChange}
                    step={1}
                    marks
                    min={1}
                    max={user.clearance}
                />
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
                >
                  Save new member
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
