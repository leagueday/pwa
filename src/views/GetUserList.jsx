import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectors, actions } from '../store'
import Airtable from 'airtable'

const baseId = 'appXoertP1WJjd4TQ'
const apiKey = 'keymd23kpZ12EriVi'
const base = new Airtable({ apiKey }).base(baseId)

const GetMyList = () => {
  const user = useSelector(selectors.getUser)
  const dispatch = useDispatch()

  useEffect(() => {
    base('UserList')
    .select({
      filterByFormula: `{userId} = '${user?.id}'`,
      view: 'Grid view',
    })
    .eachPage(
      async function page(records, fetchNextPage) {
        dispatch(actions.setChannelList(records))
      },
      function done(err) {
        if (err) {
          console.error(err)
          return
        }
      }
    )

    base('UserCreatorsList')
    .select({
      filterByFormula: `{userId} = '${user?.id}'`,
      view: 'Grid view',
    })
    .eachPage(
      async function page(records, fetchNextPage) {
        dispatch(actions.setCreatorList(records))
      },
      function done(err) {
        if (err) {
          console.error(err)
          return
        }
      }
    )
  }, [user])

  return null
}

export default GetMyList;