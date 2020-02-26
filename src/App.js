import React, { Fragment} from "react";
import { BrowserRouter as Router, Switch, Link, withRouter } from "react-router-dom";
import "./App.css";
import mainTheme from './util/mainTheme';
import UnAuthRoute from './util/UnAuthRoute';
import AuthRoute from './util/AuthRoute';
import jwtDecode from 'jwt-decode';
import { Provider } from 'react-redux';
import store from './redux/store';
import {logoutUser, getUserData} from './redux/actions/userActions';
import {SET_AUTHENTICATED,LOAD_COMPANY} from './redux/types';
import axios from 'axios';

// MUI stufff

import { ThemeProvider as MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

//pages
import home from "./pages/home";
import login from "./pages/login";
import repass from "./pages/repass";
import completed from "./pages/completed";
import failed from "./pages/failed";
import disco from "./pages/disco";
import addTeam from "./pages/addTeam";
import team from "./pages/team";
import leave from "./pages/leave";
import todo from "./pages/todo";
import scheduler from "./pages/scheduler";
import user from "./pages/user";

//Components
import Navbar from "./components/Navbar";

//mui stuff
import { makeStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ErrorIcon from '@material-ui/icons/Error';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ScheduleIcon from '@material-ui/icons/Schedule';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Typography from "@material-ui/core/Typography";
import PeopleIcon from '@material-ui/icons/People';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    position: 'fixed',
    zIndex: theme.zIndex.drawer + 1,
    width: "100%",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  navatar: {
    marginRight: theme.spacing(2)
  },
  h5ondrawer: {
    padding:'0 0 0 15px'
  },
  sidenavitem: {
    paddingTop: '0px'
  },
  itemtextside: {
    margin: '5px auto 0px auto'
  }
}));

const theme = createMuiTheme(mainTheme);
const token = localStorage.FBIdToken;
const company = localStorage.companyData;
if(token && company){
  const codata = JSON.parse(company)
  store.dispatch({
    type: LOAD_COMPANY,
    payload: codata
  })
  const decodedToken = jwtDecode(token);
  if(decodedToken.exp*1000 < Date.now()){
    store.dispatch(logoutUser())
  } else {
    store.dispatch({ type: SET_AUTHENTICATED})
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData())
  }
}

function App() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false,
    authenticated: false
  });
  function logOut (){
    store.dispatch(logoutUser())
  }
  store.subscribe(() => {
    if(state.authenticated !== store.getState().user.authenticated){
      setState({...state, 
        authenticated: store.getState().user.authenticated
      });
    }
  });
  const toggleDrawer = (open) => event => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, left: open });
  };
  
  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {[{label:'Ongoing',icon: DonutLargeIcon,to:'/'}, {label:'Completed',icon: CheckCircleIcon,to:'/completed'},{label:'Failed',icon:ErrorIcon,to:'/failed'}, {label:'Discontinued',icon: HighlightOffIcon,to:'/discontinued'}].map((text, index) => (
            <ListItem component={Link} to={text.to} className={classes.sidenavitem} button key={text.label}>
            <ListItemIcon><text.icon /></ListItemIcon>
            <ListItemText className={classes.itemtextside} primary={text.label} />
            </ListItem>
        ))}
      </List>
      <Divider />
      <List>
      {[{label:'My To-Do',icon:AssignmentIcon,to:'/todo'}, {label:'Scheduler',icon:ScheduleIcon,to:'/scheduler'}, {label:'Leave seeker',icon:HomeWorkIcon,to:'/leave'}, {label:'Team',icon:PeopleIcon,to:'/team'}].map((text, index) => (
          <ListItem component={Link} to={text.to} className={classes.sidenavitem} button key={text.label}>
          <ListItemIcon><text.icon /></ListItemIcon>
          <ListItemText className={classes.itemtextside} primary={text.label} />
          </ListItem>
      ))}
      </List>
      <Divider />
      <List>
        <ListItem component={Link} to={'/user'} className={classes.sidenavitem} button key={'My profile'}>
        <ListItemIcon><PersonIcon /></ListItemIcon>
        <ListItemText className={classes.itemtextside} primary={'My profile'} />
        </ListItem>
        <ListItem onClick={logOut} className={classes.sidenavitem} button key={'Logout'}>
        <ListItemIcon><ExitToAppIcon /></ListItemIcon>
        <ListItemText className={classes.itemtextside} primary={'Logout'} />
        </ListItem>
      </List>
    </div>
  );

  return (
    <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <div className={classes.root}>
        <Router>
          <Fragment>
          <Navbar newClass={classes.appBar} toClick={toggleDrawer(true)} />
          {state.authenticated?(
          <Fragment>  
          <Hidden smDown>
          <Drawer
                    className={classes.drawer}
                    variant="permanent"
                    classes={{
                    paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.toolbar} />
                    <Typography variant='h5' color='primary' className={classes.h5ondrawer}>Tasks:</Typography>
                    <List>
                    {[{label:'Ongoing',icon: DonutLargeIcon,to:'/'}, {label:'Completed',icon: CheckCircleIcon,to:'/completed'},{label:'Failed',icon:ErrorIcon,to:'/failed'}, {label:'Discontinued',icon: HighlightOffIcon,to:'/discontinued'}].map((text, index) => (
                        <ListItem component={Link} to={text.to} className={classes.sidenavitem} button key={text.label}>
                        <ListItemIcon><text.icon /></ListItemIcon>
                        <ListItemText className={classes.itemtextside} primary={text.label} />
                        </ListItem>
                    ))}
                    </List>
                    <Divider />
                    <List>
                    {[{label:'My To-Do',icon:AssignmentIcon,to:'/todo'}, {label:'Scheduler',icon:ScheduleIcon,to:'/scheduler'}, {label:'Leave seeker',icon:HomeWorkIcon,to:'/leave'}, {label:'Team',icon:PeopleIcon,to:'/team'}].map((text, index) => (
                        <ListItem component={Link} to={text.to} className={classes.sidenavitem} button key={text.label}>
                        <ListItemIcon><text.icon /></ListItemIcon>
                        <ListItemText className={classes.itemtextside} primary={text.label} />
                        </ListItem>
                    ))}
                    </List>
                    <Divider />
                    <List>
                        <ListItem component={Link} to={'/user'} className={classes.sidenavitem} button key={'My profile'}>
                        <ListItemIcon><PersonIcon /></ListItemIcon>
                        <ListItemText className={classes.itemtextside} primary={'My profile'} />
                        </ListItem>
                        <ListItem onClick={logOut} className={classes.sidenavitem} button key={'Logout'}>
                        <ListItemIcon><ExitToAppIcon /></ListItemIcon>
                        <ListItemText className={classes.itemtextside} primary={'Logout'} />
                        </ListItem>
                    </List>
                </Drawer>
          </Hidden>
          <Hidden mdUp>
          <SwipeableDrawer
            open={state.left}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
          >
            {sideList('left')}
          </SwipeableDrawer>
          </Hidden>
          </Fragment>
          ): true}
          <div className="container"  style={{paddingTop:0,marginTop:theme.spacing(8)}}>
            <Switch>
              <UnAuthRoute exact  path="/" component={home} />
              <UnAuthRoute exact  path="/addmember" component={addTeam} />
              <UnAuthRoute exact  path="/completed" component={completed} />
              <UnAuthRoute exact  path="/discontinued" component={disco} />
              <UnAuthRoute exact  path="/failed" component={failed} />
              <UnAuthRoute exact  path="/leave" component={leave} />
              <UnAuthRoute exact  path="/scheduler" component={scheduler} />
              <UnAuthRoute exact  path="/team" component={team} />
              <UnAuthRoute exact  path="/todo" component={todo} />
              <UnAuthRoute exact  path="/user" component={user} />
              <AuthRoute exact path="/login"  component={login} />
              <AuthRoute exact path="/renewpassword"  component={repass} />
            </Switch>
          </div>
          </Fragment>
        </Router>
      </div>
    </MuiThemeProvider>
    </Provider>
  );
}

export default withRouter(App);
