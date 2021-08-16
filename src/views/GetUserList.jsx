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
  const [filteredListRecords, setFilteredListRecords] = useState([])
  const [creatorList, setCreatorList] = useState([])

  let result = []
  let result2 = []

  const getListData = async () => {
    // await fetch('/.netlify/functions/airtable-getprofile', {
    //   method: 'POST',
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ url: `${baseId}/UserList` }),
    // })
    //   .then(response => response.json())
    //   .then(function (response) {
    //     response?.records?.map(item => {
    //       if (item?.fields?.userId?.shift() === user?.id) {
    //         result.push(item)
    //       }
    //     })
    //     setFilteredListRecords(result)
    //     dispatch(actions.setChannelList(result))
    //   })
    //   .catch(error => {
    //     console.log('error while data fetching', error)
    //   })


  }

  const getCreatorData = async () => {
    // await fetch('/.netlify/functions/airtable-getprofile', {
    //   method: 'POST',
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ url: `${baseId}/UserCreatorsList` }),
    // })
    //   .then(response => response.json())
    //   .then(function (response) {
    //     response?.records?.map(item => {
    //       if (item?.fields?.userId?.shift() === user?.id) {
    //         result2.push(item)
    //       }
    //     })
    //     setCreatorList(result2)
    //     dispatch(actions.setCreatorList(result2))
    //   })
    //   .catch(error => {
    //     console.log('error while data fetching', error)
    //   })

    base('UserCreatorsList')
      .select({
        filterByFormula: `{userId} = '${user?.id}'`,
        view: 'Grid view',
      })
      .eachPage(
        async function page(records, fetchNextPage) {
          console.log('this is bullshit ', records)
          setCreatorList(records)
          dispatch(actions.setCreatorList(records))
        },
        function done(err) {
          if (err) {
            console.error(err)
            return
          }
        }
      )
  }

  useEffect(() => {
    base('UserList')
    .select({
      // filterByFormula: `{userId} = '${user?.id}'`,
      view: 'Grid view',
    })
    .eachPage(
      async function page(records, fetchNextPage) {
        console.log('this is bullshit ', records)
        setGlobalList(records)
        dispatch(actions.setChannelList('this is bullshit'))
        if (records === undefined) {
          console.log('EMPTY LIST')
        }
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
      // filterByFormula: `{userId} = '${user?.id}'`,
      view: 'Grid view',
    })
    .eachPage(
      async function page(records, fetchNextPage) {
        console.log('this is bullshit ', records)
        setCreatorList(records)
        dispatch(actions.setCreatorList('this is bullshit'))
      },
      function done(err) {
        if (err) {
          console.error(err)
          return
        }
      }
    )
    // getListData()
    // getCreatorData()
  }, [])

  return null
}

export default GetMyList
