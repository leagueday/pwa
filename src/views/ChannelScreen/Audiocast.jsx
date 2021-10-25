import React, { useState, useEffect, useContext } from 'react'
import { UserStateContext } from '../../store/stateProviders/userState'
import { makeStyles } from '@material-ui/styles'
import ReplayBroadcastsMockup from './ReplayBroadcastsMockup'
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

const Audiocast = ({ channelTag, channel, parClasses }) => {
  const classes = useStyles()
  const { liveChannels } = useContext(UserStateContext)
  const [userAudio, setUserAudio] = useState([])

  useEffect(() => {
    if (liveChannels[`${channelTag}`]) {
      setUserAudio(
        liveChannels[`${channelTag}`].sort((a, b) => {
          return b.fields.upvotes - a.fields.upvotes
        })
      )
    }
  }, [liveChannels, channelTag])

  return (
    <div className={classes.wrapper}>
      <ReplayBroadcastsMockup
        className={parClasses.replayBroadcasts}
        channel={channel}
        channelColor={channel.color}
        leagueNight={false}
      />
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
