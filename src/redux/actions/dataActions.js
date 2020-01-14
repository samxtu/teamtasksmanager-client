import { DELETE_COMMENT, LOADING_DATA, SET_SCREAM, SET_SCREAMS, LIKE_SCREAM, UNLIKE_SCREAM, DELETE_SCREAM, CLEAR_ERRORS, ADD_SCREAM, SET_ERRORS, LOADING_UI, ADD_COMMENT, STOP_LOADING, COMMENT, CLEAR_SCREAM } from '../types';
import axios from 'axios';

export const getScreams = () => (dispatch) =>{
    dispatch({ type: LOADING_DATA })
    axios.get('/screams')
    .then(res=>{
        dispatch({
            type: SET_SCREAMS,
            payload: res.data
        })
    })
    .catch(err=>{
        dispatch({
            type: SET_SCREAMS,
            payload: []
        })
    })
}

export const getScream = (screamId) => (dispatch) =>{
    dispatch({type: LOADING_UI})
    axios.get(`/scream/${screamId}`)
    .then(res=>{
        dispatch({
            type: SET_SCREAM,
            payload: res.data
        })
        dispatch({type: CLEAR_ERRORS})
    })
    .catch(err=>{
        dispatch({ type: STOP_LOADING})
        catchError(err)
    })

}

export const likeScream = (screamId) => (dispatch) =>{
    axios.get(`/scream/${screamId}/like`)
    .then(res=>{
        console.log(res.data)
        dispatch({
            type: LIKE_SCREAM,
            payload: res.data
        })
    })
    .catch(err=> console.log(err))
}

export const unlikeScream = (screamId) => (dispatch) =>{
    axios.get(`/scream/${screamId}/unlike`)
    .then(res=>{
        dispatch({
            type: UNLIKE_SCREAM,
            payload: res.data
        })
    })
    .catch(err=> console.log(err))
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

export const postScream = (body) => (dispatch) => {
    dispatch({ type: LOADING_UI })
    axios.post('/scream',body)
    .then((res)=>{
      dispatch({
          type: ADD_SCREAM,
          payload: res.data
      });
      dispatch({type: CLEAR_ERRORS})
    })
    .catch(err => {
      dispatch({
          type: SET_ERRORS,
          payload: err.response.data
      })
    })
  };

export const clearErrors = () => dispatch => {
    dispatch({type: CLEAR_ERRORS})
}
export const stopLoading = () => dispatch => {
    dispatch({type: STOP_LOADING})
}

export const comment = () => dispatch => {
    dispatch({type: COMMENT})
}

export const clearScream = () => dispatch => {
    dispatch({type: CLEAR_SCREAM})
}

export const postComment = (idd, body) => dispatch => {
    console.log(idd)
    axios.post(`/scream/${idd}/comment`,body).then((res)=>{
        dispatch({
            type: ADD_COMMENT, 
            payload: res.data
        })
        dispatch({type: CLEAR_ERRORS})
    }).catch(err=>{
        console.log(err)
    if (err.response) {
        dispatch({
            type: SET_ERRORS,
            payload: err.response.data
          });
        }
    })
}

export const catchError = (error) => (dispatch) => {
    // Error 😨
    if (error.response) {
      /*
       * The request was made and the server responded with a
       * status code that falls out of the range of 2xx
       */
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
      dispatch({
        type: SET_ERRORS,
        payload: error.response.data
      });
    } else if (error.request) {
      /*
       * The request was made but no response was received, `error.request`
       * is an instance of XMLHttpRequest in the browser and an instance
       * of http.ClientRequest in Node.js
       */
      console.log(error.request);
    } else {
      // Something happened in setting up the request and triggered an Error
      console.log("Error", error.message);
    }
    console.log(error.config);
}

export const deleteComment = (screamId,commentId) => (dispatch) => {
    console.log(screamId)
    console.log(commentId)
    axios.delete(`/scream/${screamId}/comment/${commentId}`).then((res)=>{
        dispatch({
            type: DELETE_COMMENT, 
            payload: {commentId,screamId}
        })
        dispatch({type: CLEAR_ERRORS})
    }).catch(err=>{
        dispatch({
            type: SET_ERRORS,
            payload: err.response.data
          });
    })
}