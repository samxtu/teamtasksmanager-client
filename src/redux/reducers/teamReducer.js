import {
  LOADING_TEAM,
  ADD_TEAM_MEMBER,
  SET_TEAM_MEMBER,
  SET_TEAM_MEMBERS,
  CLEAR_MEMBER,
  CHANGE_MEMBER_ONDUTY_STATUS,
  MEMBER_ADDING_MEMBER_STATUS,
  SEND_MESSAGE,
  MARK_MESSAGE_READ
} from "../types";

const initialState = {
  team: [],
  member: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_TEAM:
      return {
        ...state,
        loading: true
      };
    case SET_TEAM_MEMBERS:
      return {
        ...state,
        team: action.payload,
        loading: false
      };
    case SET_TEAM_MEMBER:
      return {
        ...state,
        member: action.payload,
        loading: false
      };
    case ADD_TEAM_MEMBER:
      return {
        ...state,
        team: [action.payload, ...state.team]
      };
    case CLEAR_MEMBER:
      return {
        ...state,
        member: {}
      };
    case SEND_MESSAGE:
        member.messages = [action.payload,...state.member.messages]
        return {
            ...state
        };
    case CHANGE_MEMBER_ONDUTY_STATUS:
      let newindexx = state.team.findIndex(
        member => member.handle === action.payload.userHandle
      );
      state.team[newindexx] = {
        ...state.team[newindexx],
        onDuty: action.payload.status
      };
      return {
        ...state,
        member: {
          ...state.member,
          onDuty: action.payload.status
        }
      };
    case MEMBER_ADDING_MEMBER_STATUS:
    let newindex = state.team.findIndex(
        member => member.handle === action.payload.userHandle
    );
    state.team[newindex] = {
        ...state.team[newindex],
        addUser: action.payload.status
    };
    return {
        ...state,
        member: {
        ...state.member,
        addUser: action.payload.status
        }
    };
    default:
      return state;
  }
}
