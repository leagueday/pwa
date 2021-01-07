import * as actions from '../../actions'

export const initStarred =
  loadStarred => (dispatch, getState) => {
    const starred = getState().app.starred

    if (starred) {
      return
    }

    dispatch(actions.setStarred({}))

    loadStarred().then(
      starred => {
        // To be super correct we could merge the result with `getState().app.starred`.
        // Here in the promise chain it's a fresh snapshot versus `starred` determined above.
        // The user would have to be in an extreme hurry to star some podcasts, and Airtable slow,
        // to surface the edge case, seems autistic to cover the edge case
        dispatch(actions.setStarred(starred))
      }
    ).catch(
      e => {
        console.error('error while loading out starred podcasts', e)
      }
    )
  }
