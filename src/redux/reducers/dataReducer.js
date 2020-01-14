import {
  SET_TASK,
  SET_TASKS,
  ADD_TASK,
  ADD_TASK_COMMENT,
  ADD_FILES_TO_TASK,
  ADD_FILES_TO_RESPONSE_RESPONSE,
  ADD_FILES_TO_TASK_RESPONSE,
  ADD_PICS_TO_TASK,
  ADD_RESPONSE_RESPONSE,
  ADD_RESPONSE_RESPONSE_COMMENT,
  ADD_SUPERVISORS_TO_TASK,
  ADD_TASK_RESPONSE,
  ADD_TASK_RESPONSE_COMMENT,
  EDIT_RESPONSE_RESPONSE,
  EDIT_TASK,
  EDIT_TASK_DEADLINE,
  EDIT_TASK_RESPONSE,
  DELETE_RESPONSE_RESPONSE,
  DELETE_RESPONSE_RESPONSE_COMMENT,
  DELETE_TASK_COMMENT,
  DELETE_TASK_RESPONSE,
  DELETE_TASK_RESPONSE_COMMENT,
  CHANGE_TASK_STATUS,
  LOADING_DATA,
  CLEAR_TASK,
  REMOVE_PICS_TO_TASK,
  REMOVE_SUPERVISORS_TO_TASK
} from "../types";

const initialState = {
  tasks: [],
  task: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true
      };
    case SET_TASKS:
      return {
        ...state,
        tasks: action.payload,
        loading: false
      };
    case SET_TASK:
      return {
        ...state,
        task: action.payload,
        loading: false
      };
    case CHANGE_TASK_STATUS:
      let index = state.tasks.findIndex(
        task => task.taskId === action.payload.taskId
      );
      state.tasks[index] = action.payload;
      if (state.task.taskId === action.payload.taskId) {
        state.task = action.payload;
      }
      return {
        ...state
      };
    case EDIT_TASK_DEADLINE:
        let indexed = state.tasks.findIndex(
            task => task.taskId === action.payload.taskId
        );
        state.tasks[indexed].deadline = action.payload.deadline;
        if (state.task.taskId === action.payload.taskId) {
            state.task.deadline = action.payload.deadline;
        }
        return {
            ...state
        };
    case CLEAR_TASK:
        return {
        ...state,
        task: {}
        };
    case DELETE_SCREAM:
      let newindex = state.screams.findIndex(
        scream => scream.screamId === action.payload
      );
      state.screams.splice(newindex, 1);
      return {
        ...state
      };
    case DELETE_COMMENT:
      let newindexxx = state.screams.findIndex(
        scream => scream.screamId === action.payload.screamId
      );
      state.screams[newindexxx] = {
        ...state.screams[newindexxx],
        commentCount: state.screams[newindexxx].commentCount - 1
      };
      let newindexxxx = state.scream.comments.findIndex(
        comment => comment.commentId === action.payload.commentId
      );
      state.scream.comments.splice(newindexxxx, 1);
      return {
        ...state,
        scream: {
          ...state.scream,
          commentCount: state.scream.commentCount - 1
        }
      };
    case ADD_SCREAM:
      return {
        ...state,
        screams: [action.payload, ...state.screams]
      };
    case ADD_COMMENT:
      let newindexx = state.screams.findIndex(
        scream => scream.screamId === action.payload.screamId
      );
      state.screams[newindexx] = {
        ...state.screams[newindexx],
        commentCount: state.screams[newindexx].commentCount + 1
      };
      return {
        ...state,
        scream: {
          ...state.scream,
          commentCount: state.scream.commentCount + 1,
          comments: [action.payload, ...state.scream.comments]
        }
      };
    default:
      return state;
  }
}
