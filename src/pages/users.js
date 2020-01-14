// import React , { Component } from 'react';
// import Grid from '@material-ui/core/Grid';
// import {connect} from 'react-redux';
// import PropTypes from 'prop-types';
// import {getScreams} from '../redux/actions/dataActions';

// //Components
// import Scream from '../components/Scream';
// import UserProfile from '../components/UserProfile';

// // mui stuff
// import Typography  from '@material-ui/core/Typography';


// class users extends Component {
//     componentDidMount(){
//         this.props.getUser()
//     }
//     render (){
//         const {data: {screams,loading}} = this.props;
//         let recentScreamMarkUp = !loading?screams.map((scream)=><Scream key={scream.screamId} scream={scream}/>):(<Typography variant="h5">Loading...</Typography>)
//         return (
//             <Grid container spacing={2}>
//                 <Grid item sm={8} xs={12}>
//                     {recentScreamMarkUp}
//                 </Grid>
//                 <Grid item sm={4} xs={12}>
//                     {/* <UserProfile user={user} /> */}
//                 </Grid>
//             </Grid>
//         )
//     }
// }

// users.propTypes = {
//     getUser: PropTypes.func.isRequired,
//     data: PropTypes.object.isRequired
// }

// const mapStateToProps = state => ({
//     data: state.data
// })

// export default connect(mapStateToProps, {getScreams})(users);
