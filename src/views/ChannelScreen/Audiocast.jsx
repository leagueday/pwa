import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectors } from '../../store'
import { makeStyles } from '@material-ui/styles'
import { useDispatch } from 'react-redux'
import Airtable from 'airtable'
import AudioCard from './AudioCard'

const useStyles = makeStyles(theme => ({
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    height: '100%',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'space-evenly',
    },
  },
}))

const Audiocast = ({ channelTag }) => {
  const classes = useStyles()
  const user = useSelector(selectors.getUser)
  const [userAudio, setUserAudio] = useState([])
  const baseId = 'appXoertP1WJjd4TQ'
  const apiKey = 'keymd23kpZ12EriVi'
  const base = new Airtable({ apiKey }).base(baseId)

  const getUserAudio = () => {
    base('UserAudiocasts')
      .select({
        filterByFormula: `{channelTag} = '${channelTag}'`,
        view: 'Grid view',
      })
      .eachPage(
        async function page(records, fetchNextPage) {
          setUserAudio(
            records.sort((a, b) => {
              return b.fields.upvotes - a.fields.upvotes
            })
          )
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
    getUserAudio()
  }, [user, channelTag])

  return (
    <div className={classes.wrapper}>
      {userAudio?.map((audio, key) => {
        return (
          <AudioCard
            audio={audio}
            indexData={key}
            key={key}
            channelTag={channelTag}
          />
        )
      })}
    </div>
  )
}

export default Audiocast
