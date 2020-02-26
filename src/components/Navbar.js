import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import MyButton from '../util/MyButton';
//MUI stuff
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
// mui icons 
import MenuIcon from '@material-ui/icons/Menu';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';

  
class Navbar extends Component {
    render (){
        const { authenticated, newClass, toClick} = this.props;
        return (
            <AppBar className={newClass}>
                <Toolbar className="nav-container">
                    {authenticated?(
                        <Fragment>
                            <Hidden mdUp>
                                <MyButton tip='Menu' onClick={toClick}>
                                    <MenuIcon />
                                </MyButton>
                            </Hidden>
                            <Button color="inherit" component={Link} to="/login">
                            <Typography variant='h5'>Office task manager</Typography>
                            </Button>
                        </Fragment>
                    ):(
                        <Button color="inherit" component={Link} to="/login"><Typography variant='h5'>Office task manager</Typography></Button>
                    )}
                </Toolbar>
            </AppBar>
        )
    }
}

Navbar.propTypes = {
    authenticated: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
    authenticated: state.user.authenticated
})

export default connect(mapStateToProps)(Navbar);