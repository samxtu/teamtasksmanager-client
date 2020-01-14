import React, { Fragment} from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import "./App.css";
import mainTheme from './util/mainTheme';
import UnAuthRoute from './util/UnAuthRoute';
import AuthRoute from './util/AuthRoute';
import jwtDecode from 'jwt-decode';
import { Provider } from 'react-redux';
import store from './redux/store';
import {logoutUser, getUserData} from './redux/actions/userActions';
import {SET_AUTHENTICATED} from './redux/types';
import axios from 'axios';

// MUI stufff
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

//pages
import home from "./pages/home";
import login from "./pages/login";
import repass from "./pages/repass";

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
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
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
  }
}));


const theme = createMuiTheme(mainTheme);
let authenticated = false;

const token = localStorage.FBIdToken;
if(token){
  const decodedToken = jwtDecode(token);
  if(decodedToken.exp*1000 < Date.now()){
    store.dispatch(logoutUser())
    window.location.href = '/login';
  } else {
    authenticated  = true
    store.dispatch({ type: SET_AUTHENTICATED})
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData())
  }
}

function App() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false
  });
  const toggleDrawer = (side, open) => event => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [side]: open });
  };
  
  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
      <div className={classes.root}>
        <Router>
          <Navbar navatarClass={classes.navatar} newClass={classes.appBar} toClick={toggleDrawer('left', true)} />
          {authenticated?(
          <Fragment>  
          <Hidden mdDown>
          <Drawer
                    className={classes.drawer}
                    variant="permanent"
                    classes={{
                    paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.toolbar} />
                    <List>
                    {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                        <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                        <ListItemText primary={text} />
                        </ListItem>
                    ))}
                    </List>
                    <Divider />
                    <List>
                    {['All mail', 'Trash', 'Spam'].map((text, index) => (
                        <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                        <ListItemText primary={text} />
                        </ListItem>
                    ))}
                    </List>
                </Drawer>
          </Hidden>
          <Hidden mdUp>
          <SwipeableDrawer
            open={state.left}
            onClose={toggleDrawer('left', false)}
            onOpen={toggleDrawer('left', true)}
          >
            {sideList('left')}
          </SwipeableDrawer>
          </Hidden>
          </Fragment>
          ): true}

          <div className="container">
            <Switch>
              <UnAuthRoute exact path="/" component={home} />
              <AuthRoute exact path="/login"  component={login} />
              <AuthRoute exact path="/renewpassword"  component={repass} />
            </Switch>
          </div>
        </Router>
      </div>
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;
