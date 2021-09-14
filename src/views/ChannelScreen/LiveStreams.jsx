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
      console.log('error from LiveStream.jsx', error)
    })
  }

  useEffect(() => {
    getLiveData()
  }, [channelTag])

  const MuxComponent = ({ livestreamid, count, audio }) => {
    const [active, setActive] = useState(false)

    // const userName = 'e6dc9a66-fb63-414b-b187-6a39aaa6583f'
    // const accessToken =
    //   '2bGfOofUHoMPq5PtL6yb/peOp80MyN2VGsgLb5nIaREZhQ51iAtDdd4yR0pIp0bXYWWki2lcHVS'
    // const authString = `${userName}:${accessToken}`
    // const authStringEncoded = Buffer.from(authString).toString('base64')
    // const headers = {
    //   'Access-Control-Allow-Headers': 'Content-Type',
    //   'Access-Control-Allow-Origin': '*',
    //   'Access-Control-Allow-Methods': 'POST, GET, HEAD, OPTIONS',
    //   Authorization: `Basic ${authStringEncoded}`,
    //   'Content-Type': 'application/json',
    // }

    // axios
    //   .get(
    //     'https://api.mux.com/video/v1/live-streams/mIMTxXLqtyB7mOwKWr1zavoEMjtqbqWqZ902prJY01g6k',
    //     {
    //       headers,
    //     }
    //   )
    //   .then(res => console.log('res', res))
    //   .catch(err => console.log(err))
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
        console.log('esp', response)
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
