import React, { useState, useEffect } from 'react'
import AudioCard from './AudioCard'
import { useSelector } from 'react-redux'
import { selectors } from '../../store'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'space-evenly',
    },
  },
}));

const LiveStreams = ({ channelTag }) => {
  const classes = useStyles()
  const user = useSelector(selectors.getUser)
  const [userAudio, setUserAudio] = useState([])
  const baseId = 'appXoertP1WJjd4TQ'

  const getUserAudio = () => {
    let urladd = `filterByFormula={channelTag}='${channelTag}'&sort%5B0%5D%5Bfield%5D=uploadDate&sort%5B0%5D%5Bdirection%5D=desc`
    fetch('/.netlify/functions/commingsoon-proxy', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: `${baseId}/ChannelLiveData?${urladd}` }),
    })
      .then(response => response.json())
      .then(function (response) {
        setUserAudio(
          response.records.filter(item => !!item.fields.liveStreamId)
        )
      })
      .catch(error => {
        console.log('error from LiveStream.jsx', error)
      })
  }

  useEffect(() => {
    getUserAudio()
  }, [user, channelTag])

  const MuxComponent = ({ livestreamid, count, audio }) => {
    const [active, setActive] = useState(false)

    fetch('/.netlify/functions/mux-proxy', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: `video/v1/live-streams/${livestreamid}?limit=200`,
      }),
    })
      .then(response => response.json())
      .then(function (response) {
        console.log('response from mux ', response)
        if (response.data.status === 'active') {
          setActive(true)
        }
      })
      .catch(error => {
        console.log('error in LiveStream.jsx', error)
      })

    return (
      active && (
        <AudioCard
          channelTag={channelTag}
          indexData={count}
          audio={audio}
          live={true}
        />
      )
    )
  }

  return (
    <div className={classes.wrapper}>
      {userAudio?.map((item, ind) => (
        <MuxComponent
          livestreamid={item?.fields?.liveStreamId}
          key={ind}
          count={ind}
          audio={item}
        />
      ))}
    </div>
  )
}

export default LiveStreams
