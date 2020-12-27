import { SELECT_PODCAST } from '../actionTypes';

const initialState = {
  selectedPodcast: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_PODCAST: {
      return {
        ...state,
        selectedPodcast: action.payload?.podcast
      }
    }
    default:
      return state;
  }
}

export default reducer
