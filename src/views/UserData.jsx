import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { base } from '..'
import { actions, selectors } from '../store'

const UserData = () => {
  const dispatch = useDispatch()
  const user = useSelector(selectors.getUser)
  const taps = useSelector(selectors.getTaps)

  React.useEffect(() => {
    if (user) {
      const userId = user['id']
      base('UserProfile').select({
        filterByFormula: `{userId} = '${userId}'`,
        view: "Grid view"
    }).eachPage(async function page(records, fetchNextPage) {
        dispatch(actions.setUserData(records[0]))
    }, function done(err) {
        if (err) { console.error(err); return; }
    });
    }
  }, [user, taps])

  return null
}

export default UserData
