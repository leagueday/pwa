import React, { useState, useEffect } from 'react'
import AudioCard from './AudioCard'
import { useSelector, useDispatch } from 'react-redux'
import { selectors, actions } from '../../store'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'space-evenly',
    },
  },
}))

const LiveStreams = ({ channelTag }) => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const [userAudio, setUserAudio] = useState([])
  const baseId = 'appXoertP1WJjd4TQ'

  const getLiveData = () => {
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
    getLiveData()
  }, [channelTag])

  const MuxComponent = ({ livestreamid, count, audio }) => {
    const [active, setActive] = useState(false)
    console.log('livestreamid ', livestreamid)

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
        if (response.data.status === 'active') {
          setActive(true)
        }
      })
      .catch(error => {
        console.log('error in LiveStream.jsx', error)
      })

    return (
      active && (
        // <div onClick={() => dispatch(`/audiocast/${livestreamid}`)}>
          <AudioCard
            channelTag={channelTag}
            indexData={count}
            audio={audio}
            live={true}
          />
        // </div>
      )
    )
  }

  return (
    <div className={classes.wrapper}>
      {userAudio?.map((item, ind) => (
        // <div
          // onClick={() => dispatch(`/audiocast/${item?.fields?.liveStreamId}`)}
        // >
          <MuxComponent
            livestreamid={item?.fields?.liveStreamId}
            key={ind}
            count={ind}
            audio={item}
          />
        // </div>
      ))}
    </div>
  )
}

export default LiveStreams
