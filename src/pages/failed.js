import React , { Component,Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getTasks} from '../redux/actions/dataActions';

//Components
import Task from '../components/TaskListed';
import NoTaskTutorial from '../components/NoTaskTutorial';
// mui stuff
import Typography  from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import PostAddIcon from '@material-ui/icons/PostAdd';
import withStyles from "@material-ui/core/styles/withStyles";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import Skeleton from '@material-ui/lab/Skeleton';

const styles = (theme) => ({
    ...theme.common,
    extendedIcon: {
      position: 'absolute',
      right: theme.spacing(1),
      bottom: theme.spacing(1)
    },
    divBtn: {
      width:'40%'
    }
  });

class failed extends Component {
    constructor(props){
        super(props)
        this.state = {
            pno: 1
        }
    }
    componentDidMount(){
        this.props.getTasks('ongoing')
    }
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
        const {classes, data: {tasks,loading}} = this.props;
        const {pno}=this.state;
        let nothingToShowMarkup =  !loading && tasks.length < 1?(
            <Fragment>
            <NoTaskTutorial page='failed' pageNo={pno} />
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
        let ongoingTasksMarkup = !loading?tasks.map((task)=><Task key={task.taskId} task={task}/>):(
        <Fragment>
            <div>
            <Skeleton variant="text" />
            <Skeleton variant="circle" height={40} />
            <Skeleton variant="rect" height={118} />
            </div>
            <div>
            <Skeleton variant="text" />
            <Skeleton variant="circle" height={40} />
            <Skeleton variant="rect" height={118} />
            </div>
            <div>
            <Skeleton variant="text" />
            <Skeleton variant="circle" height={40} />
            <Skeleton variant="rect" height={118} />
            </div>
            <div>
            <Skeleton variant="text" />
            <Skeleton variant="circle" height={40} />
            <Skeleton variant="rect" height={118} />
            </div>
            <div>
            <Skeleton variant="text" />
            <Skeleton variant="circle" height={40} />
            <Skeleton variant="rect" height={118} />
            </div>
            <div>
            <Skeleton variant="text" />
            <Skeleton variant="circle" height={40} />
            <Skeleton variant="rect" height={118} />
            </div>
        </Fragment>
            )
        return (
            <Grid container spacing={2}>
                <Grid item sm={12} xs={12}>
                    {nothingToShowMarkup}
                    {ongoingTasksMarkup}
                </Grid>
                <Fab
                variant="extended"
                size="small"
                color="primary"
                aria-label="add"
                className={classes.extendedIcon}
                >
                <PostAddIcon />
                Add task
                </Fab>
            </Grid>
        )
    }
}

failed.propTypes = {
    getTasks: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    data: state.data
})

export default connect(mapStateToProps, {getTasks})(withStyles(styles)(failed));