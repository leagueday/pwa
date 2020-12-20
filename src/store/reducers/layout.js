import { TOGGLE_SIDEBAR_VIS } from "../actionTypes";

const initialState = {
  sidebarVis: true
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_SIDEBAR_VIS: {
      return {
        ...state,
        sidebarVis: !state.sidebarVis
      }
    }
    default:
      return state;
  }
}

export default reducer
