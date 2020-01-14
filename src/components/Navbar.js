import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import MyButton from '../util/MyButton';
//MUI stuff
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
// mui icons 
import HomeIcon from '@material-ui/icons/Home';
import MenuIcon from '@material-ui/icons/Menu';
import Hidden from '@material-ui/core/Hidden';

  
class Navbar extends Component {
    render (){
        const {navatarClass, authenticated, newClass, toClick, avatarLink} = this.props;
        return (
            <AppBar className={newClass}>
                <Toolbar className="nav-container">
                    {authenticated?(
                        <Fragment className="fraginnav">
                            <Hidden mdUp>
                                <MyButton tip='Menu' onClick={toClick}>
                                    <MenuIcon />
                                </MyButton>
                            </Hidden>
                            <Button color="inherit" component={Link} to="/login">
                            <MyButton tip='Home'>
                                <HomeIcon />
                            </MyButton><h2>Office manager</h2></Button>
                            <Avatar position="relative" alt="Img" src={avatarLink} className={navatarClass,"navatar"} />
                        </Fragment>
                    ):(
                        <Button color="inherit" component={Link} to="/login"><h2>Office manager</h2></Button>
                    )}
                </Toolbar>
            </AppBar>
        )
    }
}

Navbar.propTypes = {
    authenticated: PropTypes.bool.isRequired,
    avatarLink: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
    authenticated: state.user.authenticated,
    avatarLink: state.user.credentials.imageUrl
})

export default connect(mapStateToProps)(Navbar);