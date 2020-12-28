import * as ActionType from '../actionTypes';

const initialState = {
  selectedPodcast: null,
  showCategories: false,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SELECT_PODCAST: {
      return {
        ...state,
        selectedPodcast: action.payload?.podcast
      }
    }
    case ActionType.SHOW_CATEGORIES: {
      return {
        ...state,
        showCategories: true
      }
    }
    case ActionType.HIDE_CATEGORIES: {
      return {
        ...state,
        showCategories: false
      }
    }
    default:
      return state;
  }
}

export default reducer
