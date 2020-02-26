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
  ADD_TODO,
  SET_TODOS,
  EDIT_TODO
} from "../types";

const initialState = {
  tasks: [],
  task: {},
  loading: false,
  todos:[]
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
    case SET_TODOS:
    return {
        ...state,
        todos: action.payload,
        loading: false
    };
    case SET_TASK:
      return {
        ...state,
        task: action.payload,
        loading: false
      };
    case ADD_TASK:
      return {
        ...state,
        loading: false,
        tasks: [action.payload,...state.tasks],
        task: action.payload
      };
    case ADD_TODO:
    return {
        ...state,
        loading: false,
        todos: [action.payload,...state.todos]
    };
    case CHANGE_TASK_STATUS:
      let index = state.tasks.findIndex(
        task => task.taskId === action.payload.taskId
      );
      state.tasks[index] = action.payload;
      if (state.task.taskId === action.payload.taskId) {
        state.task = {...state.task,...action.payload};
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
    case EDIT_TASK:
        let indexxed = state.tasks.findIndex(
            task => task.taskId === action.payload.taskId
        );
        state.tasks[indexxed] = {...state.tasks[indexxed],...action.payload.body};
        if (state.task.taskId === action.payload.taskId) {
          //behind should lie trouble try exchanging order action.payload spread first
          //didnt work? state items to edit
            state.task = {...state.task,...action.payload.body};
        }
        return {
            ...state
        };
    case EDIT_TODO:
        let indetted = state.todos.findIndex(
            todo => todo.todoId === action.payload.todoId
        );
        state.todos[indetted] = {...state.todos[indetted],...action.payload};
        return {
            ...state
        };
    case ADD_TASK_COMMENT:
        let indexxxed = state.tasks.findIndex(
            task => task.taskId === action.payload.taskId
        );
        state.tasks[indexxxed].comments = [action.payload,...state.tasks[indexxxed].comments];
        if (state.task.taskId === action.payload.taskId) {
            state.task.comments = [action.payload,...state.task.comments];
        }
        return {
            ...state
        };
    case ADD_FILES_TO_TASK:
        let indexxxxed = state.tasks.findIndex(
            task => task.taskId === action.payload.taskId
        );
        state.tasks[indexxxxed].files = [...state.tasks[indexxxxed].files,...action.payload.files];
        if (state.task.taskId === action.payload.taskId) {
            state.task.files = [...state.task.files,...action.payload.files];
        }
        return {
            ...state
        };
    case ADD_PICS_TO_TASK:
        let indexxxxxed = state.tasks.findIndex(
            task => task.taskId === action.payload.taskId
        );
        state.tasks[indexxxxxed].PIC = [...state.tasks[indexxxxxed].PIC,...action.payload.PIC];
        if (state.task.taskId === action.payload.taskId) {
            state.task.PIC = [...state.task.PIC,...action.payload.PIC];
        }
        return {
            ...state
        };
    case ADD_SUPERVISORS_TO_TASK:
        let indexxxxxxed = state.tasks.findIndex(
            task => task.taskId === action.payload.taskId
        );
        state.tasks[indexxxxxxed].supervisors = [...state.tasks[indexxxxxxed].supervisors,...action.payload.supervisors];
        if (state.task.taskId === action.payload.taskId) {
            state.task.supervisors = [...state.task.supervisors,...action.payload.supervisors];
        }
        return {
            ...state
        };
    case REMOVE_PICS_TO_TASK:
        let indexxxxxxxed = state.tasks.findIndex(
            task => task.taskId === action.payload.taskId
        );
        let lowindexxxxxxxed = state.tasks[indexxxxxxxed].PIC.findIndex(
            pic => pic.handle === action.payload.handle
        );
        state.tasks[indexxxxxxxed].PIC.splice(lowindexxxxxxxed,1)
        if (state.task.taskId === action.payload.taskId) {
            state.task.PIC.splice(lowindexxxxxxxed,1)
        }
        return {
            ...state
        };
    case REMOVE_SUPERVISORS_TO_TASK:
        let indexxxxxxxxed = state.tasks.findIndex(
            task => task.taskId === action.payload.taskId
        );
        let lowindexxxxxxxxed = state.tasks[indexxxxxxxxed].supervisors.findIndex(
            supervisor => supervisor.handle === action.payload.handle
        );
        state.tasks[indexxxxxxxxed].supervisors.splice(lowindexxxxxxxxed,1)
        if (state.task.taskId === action.payload.taskId) {
            state.task.supervisors.splice(lowindexxxxxxxxed,1)
        }
        return {
            ...state
        };
    case DELETE_TASK_COMMENT:
        let cindexxxxxxxxed = state.tasks.findIndex(
            task => task.taskId === action.payload.taskId
        );
        let lowcindexxxxxxxxed = state.tasks[cindexxxxxxxxed].comments.findIndex(
            comment => comment.commentId === action.payload.commentId
        );
        state.tasks[cindexxxxxxxxed].comments.splice(lowcindexxxxxxxxed,1)
        if (state.task.taskId === action.payload.taskId) {
            state.task.comments.splice(lowcindexxxxxxxxed,1)
        }
        return {
            ...state
        };
    case ADD_TASK_RESPONSE:
        let indexd = state.tasks.findIndex(
            task => task.taskId === action.payload.taskId
        );
        state.tasks[indexd].taskResponses = [...state.tasks[indexd].taskResponses,action.payload];
        if (state.task.taskId === action.payload.taskId) {
            state.task.taskResponses = [...state.task.taskResponses,action.payload];
        }
        return {
            ...state
        };
    case EDIT_TASK_RESPONSE:
        let indexxd = state.tasks.findIndex(
            task => task.taskId === action.payload.taskId
        );
        let lowindexxd = state.tasks[indexxd].taskResponses.findIndex(
            taskres => taskres.taskResponseId === action.payload.taskResponseId
        );
        state.tasks[indexxd].taskResponses[lowindexxd] = {...state.tasks[indexxd].taskResponses[lowindexxd],...action.payload};
        if (state.task.taskId === action.payload.taskId) {
          //behind should lie trouble try exchanging order action.payload spread first
          //didnt work? state items to edit
            state.task.taskResponses[lowindexxd] = {...state.task.taskResponses[lowindexxd],...action.payload};
        }
        return {
            ...state
        };
    case DELETE_TASK_RESPONSE:
        let ccindexxxxxxxxed = state.tasks.findIndex(
            task => task.taskId === action.payload.taskId
        );
        let lowccindexxxxxxxxed = state.tasks[ccindexxxxxxxxed].taskResponses.findIndex(
            tasres => tasres.taskResponseId === action.payload.taskResponseId
        );
        state.tasks[ccindexxxxxxxxed].taskResponses.splice(lowccindexxxxxxxxed,1)
        if (state.task.taskId === action.payload.taskId) {
            state.task.taskResponses.splice(lowccindexxxxxxxxed,1)
        }
        return {
            ...state
        };
    case ADD_FILES_TO_TASK_RESPONSE:
        let indexxxd = state.tasks.findIndex(
            task => task.taskId === action.payload.taskId
        );
        let lowindexxxd = state.tasks[indexxxd].taskResponses.findIndex(
            taskres => taskres.taskResponseId === action.payload.taskResponseId
        );
        state.tasks[indexxxd].taskResponses[lowindexxxd].files = [...state.tasks[indexxxd].taskResponses[lowindexxxd].files,...action.payload.files];
        if (state.task.taskId === action.payload.taskId) {
          //behind should lie trouble try exchanging order action.payload spread first
          //didnt work? state items to edit
            state.task.taskResponses[lowindexxxd].files = [...state.task.taskResponses[lowindexxxd].files,...action.payload.files];
        }
        return {
            ...state
        };
    case ADD_TASK_RESPONSE_COMMENT:
        let indexxxxd = state.tasks.findIndex(
            task => task.taskId === action.payload.taskId
        );
        let lowindexxxxd = state.tasks[indexxxxd].taskResponses.findIndex(
            taskres => taskres.taskResponseId === action.payload.taskResponseId
        );
        state.tasks[indexxxxd].taskResponses[lowindexxxxd].comments = [action.payload,...state.tasks[indexxxxd].taskResponses[lowindexxxxd].comments];
        if (state.task.taskId === action.payload.taskId) {
          //behind should lie trouble try exchanging order action.payload spread first
          //didnt work? state items to edit
            state.task.taskResponses[lowindexxxxd].comments = [action.payload,...state.task.taskResponses[lowindexxxxd].comments];
        }
        return {
            ...state
        };
    case ADD_RESPONSE_RESPONSE:
        let idexd = state.tasks.findIndex(
            task => task.taskId === action.payload.taskId
        );
        let lowidexd = state.tasks[idexd].taskResponses.findIndex(
            taskres => taskres.taskResponseId === action.payload.taskResponseId
        );
        state.tasks[idexd].taskResponses[lowidexd].responses = [...state.tasks[idexd].taskResponses[lowidexd].responses,action.payload];
        if (state.task.taskId === action.payload.taskId) {
            state.task.taskResponses[lowidexd].responses = [...state.task.taskResponses[lowidexd].responses,action.payload];
        }
        return {
            ...state
        };
    case EDIT_RESPONSE_RESPONSE:
        let idexxd = state.tasks.findIndex(
            task => task.taskId === action.payload.taskId
        );
        let lowidexxd = state.tasks[idexxd].taskResponses.findIndex(
            taskres => taskres.taskResponseId === action.payload.taskResponseId
        );
        let lowidexxdd = state.tasks[idexxd].taskResponses[lowidexxd].responses.findIndex(
            responseres => responseres.responseResponseId === action.payload.responseResponseId
        );
        state.tasks[idexxd].taskResponses[lowidexxd].responses[lowidexxdd] = {...state.tasks[idexxd].taskResponses[lowidexxd].responses[lowidexxdd],...action.payload};
        if (state.task.taskId === action.payload.taskId) {
          //behind should lie trouble try exchanging order action.payload spread first
          //didnt work? state items to edit
            state.task.taskResponses[lowidexxd].responses[lowidexxdd] = {...state.task.taskResponses[lowidexxd].responses[lowidexxdd],...action.payload};
        }
        return {
            ...state
        };
    case DELETE_RESPONSE_RESPONSE:
        let cccindexxxxxxxxed = state.tasks.findIndex(
            task => task.taskId === action.payload.taskId
        );
        let lowcccindexxxxxxxxed = state.tasks[cccindexxxxxxxxed].taskResponses.findIndex(
            tasres => tasres.taskResponseId === action.payload.taskResponseId
        );
        let lowcccindexxxxxxxxedd = state.tasks[cccindexxxxxxxxed].taskResponses[lowcccindexxxxxxxxed].responses.findIndex(
            responseres => responseres.responseResponseId === action.payload.responseResponseId
        );
        state.tasks[cccindexxxxxxxxed].taskResponses[lowcccindexxxxxxxxed].responses.splice(lowcccindexxxxxxxxedd,1)
        if (state.task.taskId === action.payload.taskId) {
            state.task.taskResponses[lowcccindexxxxxxxxed].responses.splice(lowcccindexxxxxxxxedd,1)
        }
        return {
            ...state
        };
    case DELETE_TASK_RESPONSE_COMMENT:
        let cccindexaxed = state.tasks.findIndex(
            task => task.taskId === action.payload.taskId
        );
        let lowcccindexaxed = state.tasks[cccindexaxed].taskResponses.findIndex(
            tasres => tasres.taskResponseId === action.payload.taskResponseId
        );
        let lowcccindexaxedd = state.tasks[cccindexaxed].taskResponses[lowcccindexaxed].comments.findIndex(
            responseres => responseres.commentId === action.payload.commentId
        );
        state.tasks[cccindexaxed].taskResponses[lowcccindexaxed].comments.splice(lowcccindexaxedd,1)
        if (state.task.taskId === action.payload.taskId) {
            state.task.taskResponses[lowcccindexaxed].comments.splice(lowcccindexaxedd,1)
        }
        return {
            ...state
        };
    case ADD_FILES_TO_RESPONSE_RESPONSE:
        let idexxxxd = state.tasks.findIndex(
            task => task.taskId === action.payload.taskId
        );
        let lowidexxxxd = state.tasks[idexxxxd].taskResponses.findIndex(
            taskres => taskres.taskResponseId === action.payload.taskResponseId
        );
        let lowidexxxxdd = state.tasks[idexxxxd].taskResponses[lowidexxxxd].responses.findIndex(
            responseres => responseres.responseResponseId === action.payload.responseResponseId
        );
        state.tasks[idexxxxd].taskResponses[lowidexxxxd].responses[lowidexxxxdd].files = [...state.tasks[idexxxxd].taskResponses[lowidexxxxd].responses[lowidexxxxdd].files,...action.payload.files];
        if (state.task.taskId === action.payload.taskId) {
          //behind should lie trouble try exchanging order action.payload spread first
          //didnt work? state items to edit
            state.task.taskResponses[lowidexxxxd].responses[lowidexxxxdd].files = [...state.task.taskResponses[lowidexxxxd].responses[lowidexxxxdd].files,...action.payload.files];
        }
        return {
            ...state
        };
    case ADD_RESPONSE_RESPONSE_COMMENT:
        let idexxxxxd = state.tasks.findIndex(
            task => task.taskId === action.payload.taskId
        );
        let lowidexxxxxd = state.tasks[idexxxxxd].taskResponses.findIndex(
            taskres => taskres.taskResponseId === action.payload.taskResponseId
        );
        let lowidexxxxxdd = state.tasks[idexxxxxd].taskResponses[lowidexxxxxd].responses.findIndex(
            responseres => responseres.responseResponseId === action.payload.responseResponseId
        );
        state.tasks[idexxxxxd].taskResponses[lowidexxxxxd].responses[lowidexxxxxdd].comments = [action.payload,...state.tasks[idexxxxxd].taskResponses[lowidexxxxxd].responses[lowidexxxxxdd].comments];
        if (state.task.taskId === action.payload.taskId) {
          //behind should lie trouble try exchanging order action.payload spread first
          //didnt work? state items to edit
            state.task.taskResponses[lowidexxxxxd].responses[lowidexxxxxdd].comments = [action.payload,...state.task.taskResponses[lowidexxxxxd].responses[lowidexxxxxdd].comments];
        }
        return {
            ...state
        };
    case DELETE_RESPONSE_RESPONSE_COMMENT:
        let cccindexaaxed = state.tasks.findIndex(
            task => task.taskId === action.payload.taskId
        );
        let lowcccindexaaxed = state.tasks[cccindexaaxed].taskResponses.findIndex(
            tasres => tasres.taskResponseId === action.payload.taskResponseId
        );
        let lowcccindexaaxedd = state.tasks[cccindexaaxed].taskResponses[lowcccindexaaxed].responses.findIndex(
            responseres => responseres.commentId === action.payload.commentId
        );
        let lowercccindexaaxedd = state.tasks[cccindexaaxed].taskResponses[lowcccindexaaxed].responses[lowcccindexaaxedd].comments.findIndex(
            comment => comment.commentId === action.payload.commentId
        );
        state.tasks[cccindexaaxed].taskResponses[lowcccindexaaxed].responses[lowcccindexaaxedd].comments.splice(lowercccindexaaxedd,1)
        if (state.task.taskId === action.payload.taskId) {
            state.task.taskResponses[lowcccindexaaxed].responses[lowcccindexaaxedd].comments.splice(lowercccindexaaxedd,1)
        }
        return {
            ...state
        };
    default:
      return state;
  }
}
