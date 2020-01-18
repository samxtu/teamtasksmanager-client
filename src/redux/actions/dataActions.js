import {
    SET_TASK,
    SET_TASKS,
    ADD_TASK,
    EDIT_TASK,
    CHANGE_TASK_STATUS,
    LOADING_DATA,
    CLEAR_TASK,
    EDIT_TASK_DEADLINE,
    ADD_TASK_COMMENT,
    ADD_FILES_TO_TASK,
    ADD_PICS_TO_TASK,
    ADD_SUPERVISORS_TO_TASK,
    REMOVE_PICS_TO_TASK,
    REMOVE_SUPERVISORS_TO_TASK,
    DELETE_TASK_COMMENT,
    DELETE_TASK_RESPONSE,
    ADD_TASK_RESPONSE,
    EDIT_TASK_RESPONSE,
    ADD_FILES_TO_TASK_RESPONSE,
    ADD_TASK_RESPONSE_COMMENT,
    ADD_RESPONSE_RESPONSE,
    EDIT_RESPONSE_RESPONSE,
    ADD_RESPONSE_RESPONSE_COMMENT,
    ADD_FILES_TO_RESPONSE_RESPONSE,
    DELETE_TASK_RESPONSE_COMMENT,
    DELETE_RESPONSE_RESPONSE,
    DELETE_RESPONSE_RESPONSE_COMMENT,
    CLEAR_ERRORS
  } from "../types";
  import axios from 'axios';

export const getTasks = (status) => (dispatch) =>{
    dispatch({ type: LOADING_DATA })
    axios.get('/tasks/'+status)
    .then(res=>{
        clearErrors()
        dispatch({
            type: SET_TASKS,
            payload: res.data
        })
    })
    .catch(err=>{
        catchError(err)
        dispatch({
            type: SET_TASKS,
            payload: []
        })
    })
}

export const getTask = (taskId) => (dispatch) =>{
    dispatch({ type: LOADING_DATA })
    axios.get('/task/'+taskId)
    .then(res=>{
        clearErrors()
        dispatch({
            type: SET_TASK,
            payload: res.data
        })
    })
    .catch(err=>{
        catchError(err)
        dispatch({
            type: SET_TASK,
            payload: {}
        })
    })
}

export const postTask = (files) => (dispatch) => {
    dispatch({ type: LOADING_UI })
    axios.post('/teamtask',files)
    .then((res)=>{
      dispatch({
          type: ADD_TASK,
          payload: res.data
      });
      dispatch({type: CLEAR_ERRORS})
    })
    .catch(err => {
      catchError(err)
    })
  };

export const editTask = (taskId, body) => dispatch => {
    axios.post(`/edittask/${taskId}`,body).then((res)=>{
        dispatch({
            type: EDIT_TASK, 
            payload: {taskId, body}
        })
        dispatch({type: CLEAR_ERRORS})
    }).catch(err=>{
        catchError(err)
    })
}

export const editTaskStatus = (taskId, status, deadline) => dispatch => {
    dispatch({ type: LOADING_UI })
    axios.post(`/edittaskstatus/${taskId}`,{status,deadline}).then((res)=>{
        dispatch({
            type: CHANGE_TASK_STATUS, 
            payload: {taskId, ...res.data}
        })
        dispatch({type: CLEAR_ERRORS})
    }).catch(err=>{
        catchError(err)
    })
}

export const editTaskDeadline = (taskId, deadline) => dispatch => {
    axios.post(`/edittaskdeadline/${taskId}`,deadline).then(()=>{
        dispatch({
            type: EDIT_TASK_DEADLINE, 
            payload: {taskId, deadline}
        })
        dispatch({type: CLEAR_ERRORS})
    }).catch(err=>{
        catchError(err)
    })
}

export const postTaskComment = (taskId, body) => dispatch => {
    axios.post(`/commenttotask`,{body,taskId}).then((res)=>{
        dispatch({
            type: ADD_TASK_COMMENT, 
            payload: res.data
        })
        dispatch({type: CLEAR_ERRORS})
    }).catch(err=>{
        catchError(err)
    })
}

export const addPics = (taskId, body) => dispatch => {
    axios.post(`/addpics/${taskId}`,{body:body}).then((res)=>{
        dispatch({
            type: ADD_PICS_TO_TASK, 
            payload: {taskId,PIC: res.data}
        })
        dispatch({type: CLEAR_ERRORS})
    }).catch(err=>{
        catchError(err)
    })
}

export const addSupervisors = (taskId, body) => dispatch => {
    axios.post(`/addsupervisors/${taskId}`,{body:body}).then((res)=>{
        dispatch({
            type: ADD_SUPERVISORS_TO_TASK, 
            payload: {taskId,supervisors: res.data}
        })
        dispatch({type: CLEAR_ERRORS})
    }).catch(err=>{
        catchError(err)
    })
}

export const addFilesToTask = (taskId, files) => dispatch => {
    axios.post(`/taskfiles/${taskId}`,files).then((res)=>{
        dispatch({
            type: ADD_FILES_TO_TASK, 
            payload: {taskId,files: res.data}
        })
        dispatch({type: CLEAR_ERRORS})
    }).catch(err=>{
        catchError(err)
    })
}

export const deleteTaskComment = (taskId,commentId) => (dispatch) => {
    axios.delete(`/deletetaskcomment/${taskId}/${commentId}`).then(()=>{
        dispatch({
            type: DELETE_TASK_COMMENT, 
            payload: {taskId,commentId}
        })
        dispatch({type: CLEAR_ERRORS})
    }).catch(err=>{
        catchError(err)
    })
}

export const deleteTaskResponse = (taskId,taskResponseId) => (dispatch) => {
    axios.delete(`/deletetaskresponse/${taskId}/${taskResponseId}`).then(()=>{
        dispatch({
            type: DELETE_TASK_RESPONSE, 
            payload: {taskId,taskResponseId}
        })
        dispatch({type: CLEAR_ERRORS})
    }).catch(err=>{
        catchError(err)
    })
}

export const removePics = (taskId,PICS) => (dispatch) => {
    axios.post(`/removepics/${taskId}`,PICS).then(()=>{
        dispatch({type: CLEAR_ERRORS})
        PICS.forEach(pic => {
            dispatch({
                type: REMOVE_PICS_TO_TASK, 
                payload: {taskId,handle:pic.handle}
            })
        });
    }).catch(err=>{
        catchError(err)
    })
}

export const removeSupervisors = (taskId,supervisors) => (dispatch) => {
    axios.post(`/removesupervisors/${taskId}`,supervisors).then(()=>{
        dispatch({type: CLEAR_ERRORS})
        supervisors.forEach(sup => {
            dispatch({
                type: REMOVE_SUPERVISORS_TO_TASK, 
                payload: {taskId,handle:sup.handle}
            })
        });
    }).catch(err=>{
        catchError(err)
    })
}

export const postTaskResponse = (files) => dispatch => {
    axios.post(`/teamtaskresponse`,files).then((res)=>{
        dispatch({
            type: ADD_TASK_RESPONSE, 
            payload: res.data
        })
        dispatch({type: CLEAR_ERRORS})
    }).catch(err=>{
        catchError(err)
    })
}

export const editTaskResponse = (taskId, taskResponseId, body) => dispatch => {
    axios.post(`/edittaskresponse/${taskId}/${taskResponseId}`,body).then((res)=>{
        dispatch({
            type: EDIT_TASK_RESPONSE, 
            payload: {taskId, taskResponseId, body: res.data}
        })
        dispatch({type: CLEAR_ERRORS})
    }).catch(err=>{
        catchError(err)
    })
}

export const addFilesToTaskResponse = (taskId, taskResponseId, files) => dispatch => {
    axios.post(`/taskresponsefiles/${taskId}/${taskResponseId}`,files).then((res)=>{
        dispatch({
            type: ADD_FILES_TO_TASK_RESPONSE, 
            payload: {taskId, taskResponseId, files: res.data}
        })
        dispatch({type: CLEAR_ERRORS})
    }).catch(err=>{
        catchError(err)
    })
}

export const postTaskResponseComment = (taskId, taskResponseId, body) => dispatch => {
    axios.post(`/commenttotaskresponse`,{body,taskId,taskResponseId}).then((res)=>{
        dispatch({
            type: ADD_TASK_RESPONSE_COMMENT, 
            payload: res.data
        })
        dispatch({type: CLEAR_ERRORS})
    }).catch(err=>{
        catchError(err)
    })
}

export const postResponseResponse = (files) => dispatch => {
    axios.post(`/taskresponseresponse`,files).then((res)=>{
        dispatch({
            type: ADD_RESPONSE_RESPONSE, 
            payload: res.data
        })
        dispatch({type: CLEAR_ERRORS})
    }).catch(err=>{
        catchError(err)
    })
}

export const editResponseResponse = (taskId, taskResponseId, responseResponseId, body) => dispatch => {
    axios.post(`/editresponseresponse/${taskId}/${taskResponseId}/${responseResponseId}`,body).then((res)=>{
        dispatch({
            type: EDIT_RESPONSE_RESPONSE, 
            payload: {taskId, taskResponseId, responseResponseId, body: res.data}
        })
        dispatch({type: CLEAR_ERRORS})
    }).catch(err=>{
        catchError(err)
    })
}

export const postResponseResponseComment = (taskId, taskResponseId, responseResponseId, body) => dispatch => {
    axios.post(`/commenttoresponseresponse`,{body,taskId,taskResponseId,responseResponseId}).then((res)=>{
        dispatch({
            type: ADD_RESPONSE_RESPONSE_COMMENT, 
            payload: res.data
        })
        dispatch({type: CLEAR_ERRORS})
    }).catch(err=>{
        catchError(err)
    })
}

export const addFilesToResponseResponse = (taskId, taskResponseId, responseResponseId, files) => dispatch => {
    axios.post(`/responseresponsefiles/${taskId}/${taskResponseId}/${responseResponseId}`,files).then((res)=>{
        dispatch({
            type: ADD_FILES_TO_RESPONSE_RESPONSE, 
            payload: {taskId, taskResponseId, responseResponseId, files: res.data}
        })
        dispatch({type: CLEAR_ERRORS})
    }).catch(err=>{
        catchError(err)
    })
}

export const deleteResponseResponse = (taskId,taskResponseId,responseResponseId) => (dispatch) => {
    axios.delete(`/deleteresponseresponse/${taskId}/${taskResponseId}/${responseResponseId}`).then(()=>{
        dispatch({
            type: DELETE_RESPONSE_RESPONSE, 
            payload: {taskId,taskResponseId,responseResponseId}
        })
        dispatch({type: CLEAR_ERRORS})
    }).catch(err=>{
        catchError(err)
    })
}

export const deleteTaskResponseComment = (taskId, taskResponseId, commentId) => (dispatch) => {
    axios.delete(`/deletetaskresponsecomment/${taskId}/${taskResponseId}/${commentId}`).then(()=>{
        dispatch({
            type: DELETE_TASK_RESPONSE_COMMENT, 
            payload: {taskId, taskResponseId, commentId}
        })
        dispatch({type: CLEAR_ERRORS})
    }).catch(err=>{
        catchError(err)
    })
}

export const deleteResponseResponseComment = (taskId,taskResponseId, responseResponseId, commentId) => (dispatch) => {
    axios.delete(`/deleteresponseresponsecomment/${taskId}/${taskResponseId}/${responseResponseId}/${commentId}`).then(()=>{
        dispatch({
            type: DELETE_RESPONSE_RESPONSE_COMMENT, 
            payload: {taskId, taskResponseId, responseResponseId, commentId}
        })
        dispatch({type: CLEAR_ERRORS})
    }).catch(err=>{
        catchError(err)
    })
}

export const clearErrors = () => dispatch => {
    dispatch({type: CLEAR_ERRORS})
}

export const clearTask = () => dispatch => {
    dispatch({type: CLEAR_TASK})
}

export const catchError = (error) => (dispatch) => {
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
      dispatch({
        type: SET_ERRORS,
        payload: error.response.data
      });
    }
}

export const deleteScream = (screamId) => (dispatch) =>{
    axios.delete(`/scream/${screamId}`)
    .then(()=>{
        dispatch({
            type: DELETE_SCREAM,
            payload: screamId
        })
    })
    .catch(err=> console.log(err))
}
