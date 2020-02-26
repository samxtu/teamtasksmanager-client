import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';

//comps
import Profile from '../components/Profile';
import TaskRecord from '../components/TaskRecord';

class user extends Component {
    render() {
        return (
            <Grid container>
                <Grid item md={4} sm={4} xm={12}>
                    <Profile />
                </Grid>
                <TaskRecord />
                {/* <Grid item md={12} sm={12} xm={12}>
                    
                </Grid> */}
            </Grid>
        )
    }
}

export default user
