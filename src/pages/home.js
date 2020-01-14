import React , { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getTasks} from '../redux/actions/dataActions';


//Components
import Task from '../components/TaskListed';

// mui stuff
import Typography  from '@material-ui/core/Typography';


class home extends Component {
    componentDidMount(){
        this.props.getTasks()
    }
    render (){
        const {data: {tasks,loading}} = this.props;
        let ongoingTasksMarkup = !loading?tasks.map((task)=><Task key={task.taskId} task={task}/>):(<Typography variant="h5">Loading...</Typography>)
        return (
            <Grid container spacing={2}>
                <Grid item sm={12} xs={12}>
                    {ongoingTasksMarkup}
                </Grid>
            </Grid>
        )
    }
}

home.propTypes = {
    getTasks: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    data: state.data
})

export default connect(mapStateToProps, {getTasks})(home);