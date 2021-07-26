import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectors } from '../../store'
import { makeStyles } from '@material-ui/styles'
import { useDispatch } from 'react-redux'
import { actions, constants } from '../../store'
import ToggleImageButton from '../ToggleImageButton'
import { colors } from '../../styling'
import Airtable from 'airtable'
import AudioCard from './AudioCard'

const useStyles = makeStyles(theme => ({
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    height: '100%',
    width: '100%',
  },
}))

const Audiocast = ({ channelTag }) => {
  const classes = useStyles()
  const user = useSelector(selectors.getUser)
  const [userAudio, setUserAudio] = useState([])
  const disptach = useDispatch()
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
          setUserAudio(records)
        },
        function done(err) {
          if (err) {
            console.error(err)
            return
          }
        }
      )
  }

  // console.log('where tf are the userProfiles ', userAudio)
  
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
