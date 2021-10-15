import React, { useState, useEffect, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles'
import { actions } from '../../store'
import { colors } from '../../styling'
import { Button } from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import PlusMinusButton from '../PlusMinusButton'
import Square from '../Square'

const useStyles = makeStyles(theme => ({
  channelTile: {
    cursor: 'pointer',
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    maxHeight: '100%',
    maxWidth: '100%',
    minHeight: 0,
    minWidth: 0,
    userSelect: 'none',
    width: '100%',
  },
  image: ({ textColor }) => ({
    border: `0.25em solid ${textColor ?? colors.white80}`,
    borderRadius: '50%',
    height: '100%',
    width: '100%',
    [theme.breakpoints.only('xs')]: {
      border: `0.5vw solid ${textColor ?? colors.white80}`,
    },
  }),
  imageSquare: {
    width: '80%',
  },
  plusMinusButton: {
    bottom: '0.25em',
    position: 'absolute',
    right: '0.25em',
    zIndex: 3,
  },
  '@keyframes blinker': {
    '0%': { filter: 'brightness(100%)' },
    '49%': { filter: 'brightness(100%)' },
    '50%': { filter: 'brightness(200%)' },
    '100%': { filter: 'brightness(200%)' },
  },
  liveSign: {
    top: '0.25em',
    position: 'absolute',
    left: '0.25em',
    zIndex: 3,
    padding: '10 20',
    width: '15%',
    background: 'red',
    borderRadius: '5px',
    '&:hover': {
      background: 'red',
      filter: 'brightness(150%)',
    },
    animationName: '$blinker',
    animationTimingFunction: 'linear',
    animationDuration: '1.5s',
    animationIterationCount: 'infinite',
  },
  text: ({ textColor }) => ({
    color: textColor ?? colors.white80,
    fontSize: '75%',
    fontWeight: theme.typography.weight.bold,
    height: '100%',
    textOverflow: 'ellipsis',
    width: '100%',
    display: 'inline-flex',
  }),
  textBox: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '15%',
    overflow: 'hidden',
    paddingLeft: '0.25em',
    paddingRight: '0.25em',
  },
}))
const baseId = 'appXoertP1WJjd4TQ'

const ChannelTile = ({ channel }) => {
  const classes = useStyles({ textColor: channel.color })
  const theme = useTheme()
  const xs = useMediaQuery(theme.breakpoints.down('xs'))
  const dispatch = useDispatch()
  const gotoThisChannel = () =>
    dispatch(actions.pushHistory(`/channel/${channel.tag}`))

  const [userAudio, setUserAudio] = useState([])
  const [active, setActive] = useState(false)

  useMemo(() => {
    if (!xs) {
      let urladd = `filterByFormula={channelTag}='${channel?.tag}'&sort%5B0%5D%5Bfield%5D=uploadDate&sort%5B0%5D%5Bdirection%5D=desc`
      axios
        .post('https://leagueday-api.herokuapp.com/proxies/commingsoon', {
          url: `${baseId}/ChannelLiveData?${urladd}`,
        })
        .then(response => {
          setUserAudio(
            response.data.data.records.filter(
              item => !!item.fields.liveStreamId
            )
          )
        })
        .catch(error => {
          console.log('error from LiveStream.jsx getLiveData', error)
        })
    }
  }, [baseId])

  useMemo(() => {
    if (!xs) {
      userAudio?.map(item => {
        axios
          .post('https://leagueday-api.herokuapp.com/proxies/mux', {
            url: `video/v1/live-streams/${item?.fields?.liveStreamId}`,
          })
          .then(({ data }) => {
            if (data.data.data.status === 'active') {
              setActive(true)
            }
          })
          .catch(error => {
            console.log('error in LiveStream.jsx MuxComponent', error)
          })
      })
    }
  }, [userAudio])

  return (
    <div className={classes.channelTile}>
      <Square className={classes.imageSquare}>
        <img
          className={classes.image}
          src={channel.imageUrl}
          onClick={gotoThisChannel}
        />
        {active && <Button onClick={gotoThisChannel} className={classes.liveSign}><b style={{ fontWeight: 900 }}>Live</b></Button>}
        <PlusMinusButton
          size="25%"
          className={classes.plusMinusButton}
          subjectId={channel.tag}
          subjectKind="channel"
          channel={channel}
        />
      </Square>
      <div className={classes.textBox} onClick={gotoThisChannel}>
        <div className={classes.text}>{channel.title}</div>
      </div>
    </div>
  )
}

export default ChannelTile
