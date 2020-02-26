import {
    LOADING_TEAM,
    ADD_TEAM_MEMBER,
    SET_TEAM_MEMBER,
    SET_TEAM_MEMBERS,
    CHANGE_MEMBER_ONDUTY_STATUS,
    MEMBER_ADDING_MEMBER_STATUS,
    SEND_MESSAGE,
    MARK_MESSAGE_READ
  } from "../types";
  import {catchError} from './userActions';
  import axios from 'axios';

export const sendMessage = (request) => (dispatch) => {
  axios
  .post('/sendmessage/'+request.userHandle,{body: request.body})
  .then(res => {
    dispatch({
      type: SEND_MESSAGE,
      payload: res.data
    });
  })
  .catch(error => {
    catchError(error)
  });
}

export const getTeam = () => (dispatch) => {
  dispatch({type: LOADING_TEAM})
  axios
  .get('/team')
  .then(res => {
    dispatch({
      type: SET_TEAM_MEMBERS,
      payload: res.data.team
    });
  })
  .catch(error => {
    catchError(error)
    dispatch({
      type: SET_TEAM_MEMBERS,
      payload: []
    });
  });
}

export const getTeamMember = (userHandle,status) => (dispatch) => {
  dispatch({type: LOADING_TEAM})
  axios
  .get(`/team/${userHandle}/${status}`)
  .then(res => {
    dispatch({
      type: SET_TEAM_MEMBER,
      payload: res.data
    });
  })
  .catch(error => {
    catchError(error)
    dispatch({
      type: SET_TEAM_MEMBER,
      payload: {}
    });
  });
}

export const allowMemberToAddUsers = (boolevard, userHandle) => (dispatch) => {
  if(boolevard){
    axios
    .get(`/allowadduser/${userHandle}`)
    .then(() => {
      dispatch({
        type: MEMBER_ADDING_MEMBER_STATUS,
        payload: {
          userHandle,
          status: boolevard
        }
      });
    })
    .catch(error => {
      catchError(error)
    });
  } else{
    axios
    .get(`/denyadduser/${userHandle}`)
    .then(res => {
      dispatch({
        type: MEMBER_ADDING_MEMBER_STATUS,
        payload: {
          userHandle,
          status: boolevard
        }
      });
    })
    .catch(error => {
      catchError(error)
    });
  }
}

export const changeMemberOnDutyStatus = (boolevard, deadline, userHandle) => (dispatch) => {
    axios
    .post(`/changeonduty/${userHandle}`,{onDuty: boolevard,deadline})
    .then(() => {
      dispatch({
        type: CHANGE_MEMBER_ONDUTY_STATUS,
        payload: {
          userHandle,
          status: boolevard
        }
      });
    })
    .catch(error => {
      catchError(error)
    });
}

export const addTeamMember = (details) => (dispatch) => {
    dispatch({
      type: ADD_TEAM_MEMBER,
      payload: details
    });
}