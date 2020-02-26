import React , { Component,Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getTodos,addTodo,editTodo} from '../redux/actions/dataActions';

//Components
import Todo from '../components/TodoComp';
import AddToDo from '../components/AddToDo';
import NoTaskTutorial from '../components/NoTaskTutorial';
// mui stuff
import withStyles from "@material-ui/core/styles/withStyles";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import Skeleton from '@material-ui/lab/Skeleton';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SwipeableViews from 'react-swipeable-views';

const styles = (theme) => ({
    ...theme.common,
    divBtn: {
      width:'40%'
    },
    root:{
    flexGrow: 1,
    paddingTop:0,
    marginTop:0
    }
});

let thetheme = {direction:'rtl'};


function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <Grid container
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Grid item sm={12} style={{width:'100%'}}>{children}</Grid>}
      </Grid>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  

class todo extends Component {
    constructor(props){
        super(props)
        this.state = {
            pno: 1,
            activeTab: 0
        }
    }
    componentDidMount(){
        this.props.getTodos()
    }
    AddToDo = (newTodo) =>{
        this.props.addTodo(newTodo)
    }
    EditToDo = (newTodo) =>{
        this.props.editTodo(newTodo)
    }
    handleTabChange = (event, newValue) => {
        this.setState({ activeTab: newValue });
      };
    handleChangeIndex = index => {
        this.seState({ activeTab: index });
      };
     add=()=>{
        this.setState({
            pno: this.state.pno+1
        })
    }
     sub=()=>{
        this.setState({
            pno: this.state.pno-1
        })
    }
    render (){
        const {classes, data: {todos,loading}} = this.props;
        const {pno,activeTab}=this.state;
        let nothingToShowMarkup =  !loading && todos.length < 1?(
            <Fragment>
            <NoTaskTutorial page='todo' pageNo={pno} />
            <Card>
            <CardActions className={classes.controls}>
              <IconButton disabled={pno===1} onClick={this.sub} aria-label="previous">
                 <SkipPreviousIcon />
              </IconButton>
              <div className={classes.divBtn} />
              <IconButton disabled={pno === 3} onClick={this.add} aria-label="next">
                <SkipNextIcon />
              </IconButton>
            </CardActions>
            </Card>
            </Fragment>
        ):null;
        let ongoingTodosMarkup = todos.map((todo)=>todo.status==='pending'?<Todo key={todo.todoId} todo={todo} toEdit={this.EditToDo} />:null)

        let completeTodosMarkup = todos.map((todo)=>todo.status==='complete'?<Todo key={todo.todoId} todo={todo} toEdit={this.EditToDo} />:null)

        return (
            <Grid container style={{paddingTop:0,marginTop:0}}>
                <Grid item sm={12} xs={12} className={classes.root}>
                    {!loading && todos.length > 0?(
                <Fragment>
                    <AppBar position="static">
                    <Tabs
                        value={activeTab}
                        indicatorColor="secondary"
                        onChange={this.handleTabChange}
                        aria-label="disabled tabs example"
                    >
                        <Tab label="Pending" {...a11yProps(0)} />
                        <Tab label="Completed" {...a11yProps(1)} />
                    </Tabs>   
                    </AppBar>
                    <SwipeableViews
                        axis={thetheme.direction === 'rtl' ? 'x-reverse' : 'x'}
                        index={activeTab}
                        onChangeIndex={this.handleChangeIndex}
                    >
                        <TabPanel value={activeTab} index={0} dir={thetheme.direction}>
                        {ongoingTodosMarkup}
                        </TabPanel>
                        <TabPanel value={activeTab} index={1} dir={thetheme.direction}>
                        {completeTodosMarkup}
                        </TabPanel>
                    </SwipeableViews>
                </Fragment>
                ): loading?(            <Fragment>
                    <div>
                    <Skeleton variant="text" />
                    <Skeleton variant="circle" height={30} width={200} />
                    <Skeleton variant="rect" height={68} />
                    </div>
                    <div>
                    <Skeleton variant="text" />
                    <Skeleton variant="circle" height={30} width={200} />
                    <Skeleton variant="rect" height={68} />
                    </div>
                    <div>
                    <Skeleton variant="text" />
                    <Skeleton variant="circle" height={30} width={200} />
                    <Skeleton variant="rect" height={68} />
                    </div>
                    <div>
                    <Skeleton variant="text" />
                    <Skeleton variant="circle" height={30} width={200} />
                    <Skeleton variant="rect" height={68} />
                    </div>
                    <div>
                    <Skeleton variant="text" />
                    <Skeleton variant="circle" height={30} width={200} />
                    <Skeleton variant="rect" height={68} />
                    </div>
                    <div>
                    <Skeleton variant="text" />
                    <Skeleton variant="circle" height={30} width={200} />
                    <Skeleton variant="rect" height={68} />
                    </div>
                    <div>
                    <Skeleton variant="text" />
                    <Skeleton variant="circle" height={30} width={200} />
                    <Skeleton variant="rect" height={68} />
                    </div>
                    <div>
                    <Skeleton variant="text" />
                    <Skeleton variant="circle" height={30} width={200} />
                    <Skeleton variant="rect" height={68} />
                    </div>
                    <div>
                    <Skeleton variant="text" />
                    <Skeleton variant="circle" height={30} width={200} />
                    <Skeleton variant="rect" height={68} />
                    </div>
                </Fragment>):null}
                    
                </Grid>
                <AddToDo addNewToDo={this.AddToDo} />
            </Grid>
        )
    }
}

todo.propTypes = {
    getTodos: PropTypes.func.isRequired,
    addTodo: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    editTodo: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    data: state.data
})

const mapActionsToProps = {
    getTodos,
    addTodo,
    editTodo
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(todo));