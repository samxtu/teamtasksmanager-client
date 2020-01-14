import React from 'react';
import { Route, Redirect } from'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

const UnAuthRoute =  ({ component: Component, user: {authenticated}, ...rest}) => (
        <Route {...rest}
        render={(props) =>(authenticated === false? (<Redirect to='/login' />):(<Component {...props} />))}
        />
    )

UnAuthRoute.prototypes = {
    user: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user
})

export default connect(mapStateToProps)(UnAuthRoute)