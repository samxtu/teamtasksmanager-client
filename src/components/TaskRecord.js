import React, { Component, Fragment } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
//mui
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ErrorIcon from '@material-ui/icons/Error';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Divider from '@material-ui/core/Divider';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
//dev chart
import {
    Chart,
    PieSeries,
    Title,
    Tooltip
} from '@devexpress/dx-react-chart-material-ui';
import {
    Animation,
    EventTracker
} from '@devexpress/dx-react-chart';


const styles = (theme) =>({
    charted: {
        height: '233px !important'
    },
    cardTitle: {
        fontSize: '20px !important'
    },
    listItem: {
        paddingTop: 0,
        paddingBottom: 0
    },
    paper: {
        marginLeft: '5px'
    }
})

class TaskRecord extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          sdata : [],
          picdata: []
        };
    }
    componentDidMount(){
            this.setState({
            sdata : [
                {
                    ttype: 'ongoing',
                    value: this.props.user.credentials.OTAS
                },
                {
                    ttype: 'failed',
                    value: this.props.user.credentials.FAS         
                },
                {
                    ttype: 'completed on time',
                    value: this.props.user.credentials.COTAS           
                },
                {
                    ttype: 'completed late',
                    value: this.props.user.credentials.CLAS           
                }
            ],
            picdata: [
                {
                    ttype: 'ongoing',
                    value: this.props.user.credentials.OTAPIC             
                },
                {
                    ttype: 'failed',
                    value: this.props.user.credentials.FAPIC         
                },
                {
                    ttype: 'completed on time',
                    value: this.props.user.credentials.COTAPIC
                },
                {
                    ttype: 'completed late',
                    value: this.props.user.credentials.COTAPIC
                }
            ]
        })
    }
    
    render() {
        const { sdata,picdata } = this.state;
        const {classes,user:{authenticated,loading, credentials:{
            OTAPIC,OTAS,COTAPIC,COTAS,CLAPIC,CLAS,FAPIC,FAS,DISCO
        }}} = this.props;
        return (
        <Fragment>
        <Grid item sm={4} xs={12}>
        <Paper className={classes.paper}>
            <Chart
            data={sdata}
            className={classes.charted}
            >
            <PieSeries
                valueField="value"
                argumentField="ttype"
                innerRadius={0.6}
            />
            <Title
                text="Task record as supervisor:"
                className={classes.cardTitle}
            />
            <Animation />
            <EventTracker />
            <Tooltip />
            </Chart>
            <List>
            <ListItem className={classes.listItem}>
                <ListItemAvatar style={{color:'#40C4FF'}}>
                <Avatar style={{color:'#40C4FF'}}>
                    <DonutLargeIcon  style={{color:'#40C4FF'}}/>
                </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Ongoing as supervisor" secondary={OTAS+': '+((OTAS*100)/(OTAS+COTAS+FAS+OTAPIC+COTAPIC+FAPIC+CLAPIC+CLAS))+'% of all tasks'} />
            </ListItem>
            <ListItem className={classes.listItem}>
                <ListItemAvatar style={{color:'#00C853'}} >
                <Avatar style={{color:'#00C853'}} >
                    <CheckCircleIcon style={{color:'#00C853'}}  />
                </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Completed on-time as supervisor" secondary={COTAS+': '+((COTAS*100)/(OTAS+COTAS+FAS+OTAPIC+COTAPIC+FAPIC+CLAPIC+CLAS))+'% of all tasks'} />
            </ListItem>
            <ListItem className={classes.listItem}>
                <ListItemAvatar style={{color:'#FFEB3B'}} >
                <Avatar style={{color:'#FFEB3B'}} >
                    <CheckCircleIcon  style={{color:'#FFEB3B'}} />
                </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Completed late as supervisor" secondary={CLAS+': '+((CLAS*100)/(OTAS+COTAS+FAS+OTAPIC+COTAPIC+FAPIC+CLAPIC+CLAS))+'% of all tasks'} />
            </ListItem>
            <ListItem className={classes.listItem}>
                <ListItemAvatar style={{color:'#FF5252'}} >
                <Avatar style={{color:'#FF5252'}} >
                    <ErrorIcon style={{color:'#FF5252'}}  />
                </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Failed as supervisor" secondary={FAS+': '+((FAS*100)/(OTAS+COTAS+FAS+OTAPIC+COTAPIC+FAPIC+CLAPIC+CLAS))+'% of all tasks'} />
            </ListItem>
            </List>
        </Paper>
        </Grid>
        <Grid item sm={4} xs={12}>
        <Paper className={classes.paper}>
            <Chart
            data={picdata}
            className={classes.charted}
            >
            <PieSeries
                valueField="value"
                argumentField="ttype"
                innerRadius={0.6}
            />
            <Title
                text="Task record as PIC:"
                className={classes.cardTitle}
            />
            <Animation />
            <EventTracker />
            <Tooltip />
            </Chart>
            <List>
            <ListItem className={classes.listItem}>
                <ListItemAvatar style={{color:'#40C4FF'}}>
                <Avatar style={{color:'#40C4FF'}}>
                    <DonutLargeIcon  style={{color:'#40C4FF'}}/>
                </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Ongoing as PIC" secondary={OTAPIC+': '+((OTAPIC*100)/(OTAS+COTAS+FAS+OTAPIC+COTAPIC+FAPIC+CLAPIC+CLAS))+'% of all tasks'} />
            </ListItem>
            <ListItem className={classes.listItem}>
                <ListItemAvatar style={{color:'#00C853'}}>
                <Avatar style={{color:'#00C853'}}>
                    <CheckCircleIcon style={{color:'#00C853'}} />
                </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Completed on-time as PIC" secondary={COTAPIC+': '+((COTAPIC*100)/(OTAS+COTAS+FAS+OTAPIC+COTAPIC+FAPIC+CLAPIC+CLAS))+'% of all tasks'} />
            </ListItem>
            <ListItem className={classes.listItem}>
                <ListItemAvatar style={{color:'#FFEB3B'}}>
                <Avatar style={{color:'#FFEB3B'}}>
                    <CheckCircleIcon  style={{color:'#FFEB3B'}}/>
                </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Completed late as PIC" secondary={CLAPIC+': '+((CLAPIC*100)/(OTAS+COTAS+FAS+OTAPIC+COTAPIC+FAPIC+CLAPIC+CLAS))+'% of all tasks'} />
            </ListItem>
            <ListItem className={classes.listItem}>
                <ListItemAvatar style={{color:'#FF5252'}}>
                <Avatar style={{color:'#FF5252'}}>
                    <ErrorIcon style={{color:'#FF5252'}} />
                </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Failed as PIC" secondary={FAPIC+': '+((FAPIC*100)/(OTAS+COTAS+FAS+OTAPIC+COTAPIC+FAPIC+CLAPIC+CLAS))+'% of all tasks'} />
            </ListItem>
            </List>
        </Paper>
        </Grid>
            {/* <Divider/>
            <Typography variant='body2'>{DISCO} tasks you were involved were discontinued!</Typography> */}
        </Fragment>
        );
    }
}

TaskRecord.prototypes = {
    user: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user,
})

export default  connect(mapStateToProps)(withStyles(styles)(TaskRecord))