import React, { useState, useEffect, useMemo, useContext } from 'react'
import { useDispatch } from 'react-redux'
import { UserStateContext } from '../../store/stateProviders/userState'
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
    height: '100%',
    minWidth: 0,
    userSelect: 'none',
    width: '100%',
    margin: '10px 0',
    marginRight: '20px',
  },
  image: ({ textColor }) => ({
    height: '100%',
    maxHeight: '100%',
    width: '100%',
  }),
  imageSquare: {
    width: '100%',
    height: '250px',
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
    color: 'white',
    fontSize: '75%',
    fontWeight: theme.typography.weight.bold,
    height: '100%',
    textOverflow: 'ellipsis',
    width: '100%',
    display: 'inline-flex',
  }),
  plusMinusButton: {
    color: 'white',
    border: '1px solod red'
  },
  textBox: {
    display: 'flex',
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    minHeight: '15%',
    overflow: 'hidden',
    marginTop: '12px',
    color: 'white',
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
          console.log('error in ChannelTile.jsx', error)
        })
  }, [baseId])

  useMemo(() => {
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
            console.log('error in ChannelTile.jsx', error)
          })
      })
  }, [userAudio])

  return (
    <div className={classes.channelTile}>
      <Square className={classes.imageSquare}>
        <img
          className={classes.image}
          src={channel.imageUrl}
          onClick={gotoThisChannel}
        />
        {active && (
          <Button onClick={gotoThisChannel} className={classes.liveSign}>
            <b style={{ fontWeight: 900 }}>Live</b>
          </Button>
        )}
      </Square>
      <div className={classes.textBox} onClick={gotoThisChannel}>
        <PlusMinusButton
          size="25px"
          className={classes.plusMinusButton}
          subjectId={channel.tag}
          subjectKind="channel"
          channel={channel}
        />
        <div className={classes.text}>{channel.title}</div>
      </div>
    </div>
  )
}

export default ChannelTile
