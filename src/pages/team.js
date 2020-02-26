import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
//mui stuff
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Skeleton from '@material-ui/lab/Skeleton';

import MemberProfile from '../components/MemberProfile';
import SearchMember from '../components/SearchMember';
import FocusedMember from '../components/FocusedMember';
import AddToTeam from '../components/AddToTeam';
import {addTeamMember} from '../redux/actions/teamActions';

const styles = (theme) =>({  
  root: {
    width: '100%',
    display: 'flex',
    backgroundColor: theme.palette.background.Paper,
  },
  inline: {
    display: 'inline',
  },
  cover: {
    display: 'flex',
    width: 151
  },
})
const listRef = React.createRef();

class team extends Component {
    constructor(props){
        super(props);
        this.state = {
            active: {},
            searchable: this.props.team.team?this.props.team.team:[]
        }
    }

    search = (nameKey, myArray) =>{
        let res = [];
        for (var i=0; i < myArray.length; i++) {
            if (myArray[i].department === nameKey) {
                res.push(myArray[i]);
            }
        }
        return res;
    }

    sortDepartment = (department) =>{
       if(department === '') return this.setState({ searchable: this.props.team.team })
       let departmentMembers = this.search(department,this.props.team.team);
       this.setState({
           searchable: departmentMembers
       })
    }

    setTheMember = (memberData) =>{
        return this.setState({
            active: memberData
        })
    }

    focusTo = (handleToFocus) =>{
        if(handleToFocus !== null){
            let index = this.state.searchable.findIndex(
              item => item.handle === handleToFocus
            );
            listRef.current.scrollToItem(index,'center');
        } 
    }
    isEmpty = (obj) => {
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    dispatchGetTeam = (data)=>{
        this.props.addTeamMember(data)
    }

    render() {
        const {classes,company,team,user:{credentials:{clearance}}} = this.props;
        const {active,searchable} = this.state;

        const Row = ({ index,data }) => {
            const member = data[index];
            return (
            <MemberProfile member={member} key={index} focusOnMe={this.setTheMember} />
          );
        }
        
        return (
        <Grid container style={{paddingTop:0}}>
        <SearchMember searchTo={searchable} team={team.team} company={company} departmentSelect={this.sortDepartment} searchMember={this.focusTo} />
            <Grid item sm={6} style={{height:'420px'}}> 
            <AutoSizer>
                {({height,width})=>(
                    <List 
                    ref={listRef}
                    height={height} 
                    itemCount={searchable.length} 
                    itemSize={167} 
                    width={width} 
                    itemData={searchable}
                    className={classes.root}>
                    {Row}
                    </List>
                )}
            </AutoSizer>
            </Grid>
            <Grid item sm={6}>
                {active && !this.isEmpty(active)?(
            <FocusedMember member={active} clearance={clearance} />
                ):(
            <Card style={{height:'100%',width:'100%'}}>
                <CardHeader 
                avatar={<Skeleton variant="circle" width={100} height={100} />}
                    title={<Skeleton height={25} width="80%" style={{ marginBottom: 6 }} />}
                    subheader={<Skeleton height={25} width="40%" />}
                />
                <Skeleton variant="rect"/>
                <CardContent>
                    <Fragment>
                        <Skeleton height={30} style={{ marginBottom: 6 }} />
                        <Skeleton height={30} width="80%" />
                        <Skeleton height={30} style={{ marginBottom: 6 }} />
                        <Skeleton height={30} width="80%" />
                        <Skeleton height={30} style={{ marginBottom: 6 }} />
                        <Skeleton height={30} width="80%" />
                    </Fragment>
                </CardContent>
                <Skeleton variant="rect"/>
                </Card>)}
            </Grid>
            <AddToTeam branches={company.branches} departments={company.departments} user={this.props.user.credentials} dispatchGetTeam={this.dispatchGetTeam} />
        </Grid>
        )
    }
}

team.prototypes = {
    company: PropTypes.object.isRequired,
    team: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    addTeamMember: PropTypes.func.isRequired
}

// const mapActionsToProps = {
//     uploadProfileImage
// }

const mapStateToProps = (state) => ({
    team: state.team,
    company: state.UI.company,
    user: state.user
})

export default connect(mapStateToProps,{addTeamMember})(withStyles(styles)(team))