import React, { useState, useEffect } from 'react'
import AudioCard from './AudioCard'
import { useSelector, useDispatch } from 'react-redux'
import { selectors, actions } from '../../store'
import('buffer').then(({ Buffer }) => {
  global.Buffer = Buffer
})
import { makeStyles } from '@material-ui/styles'
import axios from 'axios'

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
    axios.post('https://leagueday-api.herokuapp.com/proxies/commingsoon', {
      url: `${baseId}/ChannelLiveData?${urladd}`
    }).then((response) => {
      setUserAudio(
        response.data.data.records.filter(item => !!item.fields.liveStreamId)
      )
    }).catch(error => {
      console.log('error from LiveStream.jsx getLiveData', error)
    })
  }

  useEffect(() => {
    getLiveData()
  }, [channelTag])

  const MuxComponent = ({ livestreamid, count, audio }) => {
    const [active, setActive] = useState(false)

    axios.post('https://leagueday-api.herokuapp.com/proxies/mux', {
      url: `video/v1/live-streams/${livestreamid}`,
    }).then(({ data }) => {
      if (data.data.data.status === 'active') {
        setActive(true)
      }
    }).catch(error => {
      console.log('error in LiveStream.jsx MuxComponent', error)
    });

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
