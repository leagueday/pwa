import React, { useState, useEffect, useMemo, useContext } from 'react'
import { UserStateContext } from '../../store/stateProviders/userState'
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
import { base, baseId } from '../..'
import { getMyList } from '../../api/getChannelList'
const useStyles = makeStyles(theme => ({
  channelTile: {
    cursor: 'pointer',
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    maxHeight: '100%',
    maxWidth: '100%',
    minHeight: '100%',
    height: '100%',
    minWidth: '100%',
    userSelect: 'none',
    width: '100%',
    margin: '10px 0',
    [theme.breakpoints.down('sm')]: {
      width: '114px',
    },
  },
  image: ({ textColor }) => ({
    height: '100%',
    width: '100%',
    maxHeight: '100%',
    objectFit: 'cover',
    [theme.breakpoints.up('md')]: {
      minHeight: '115px',
      width: '193px',
    },
    [theme.breakpoints.only('md')]: {
      width: '170px',
    },
    [theme.breakpoints.down('sm')]: {
      height: '98px',
      width: '98px',
      objectFit: 'cover',
      borderRadius: '50%',
      border: `0.25em solid ${textColor ?? colors.white80}`,
    },
  }),
  imageSquare: {
    [theme.breakpoints.up('md')]: {
      width: '100%',
      height: '250px',
    },
    [theme.breakpoints.down('sm')]: {
      width: '80%',
    },
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
    [theme.breakpoints.down('sm')]: {
      height: '25px',
      width: '25px',
      bottom: '0.25em',
      position: 'absolute',
      background: colors.lightGray,
      right: '0.25em',
      zIndex: 3,
    },
  },
  textBox: {
    display: 'flex',
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    minHeight: '15%',
    overflow: 'hidden',
    marginTop: '12px',
    color: 'white',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      paddingLeft: '0.25em',
      paddingRight: '0.25em',
      marginTop: '0px',
    },
  },
}))

const ChannelTile = ({ channel }) => {
  const classes = useStyles({ textColor: channel.color })
  const { liveChannels } = useContext(UserStateContext)
  const theme = useTheme()
  const xs = useMediaQuery(theme.breakpoints.down('sm'))
  const mdUp = useMediaQuery(theme.breakpoints.up('md'))
  const dispatch = useDispatch()
  const gotoThisChannel = () =>
    dispatch(actions.pushHistory(`/channel/${channel.tag}`))
  const [userAudio, setUserAudio] = useState([])
  const [active, setActive] = useState(false)
  const channelTag = channel.tag
  const audiocastLength = liveChannels[`${channel?.tag}`]?.length ?? 0

  useMemo(() => {
    if (channel.tag) {
      let urladd = `filterByFormula={channelTag}='${channelTag}'&sort%5B0%5D%5Bfield%5D=uploadDate&sort%5B0%5D%5Bdirection%5D=desc`
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
    }
  }, [channel])

  useMemo(() => {
    userAudio?.forEach(item => {
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
          src={xs ? channel.xsImageurl : channel.largeImageUrl}
          onClick={gotoThisChannel}
          width={mdUp ?? '193px'}
          height={mdUp ?? '240px'}
        />
        {active && (
          <Button onClick={gotoThisChannel} className={classes.liveSign}>
            <b style={{ fontWeight: 900 }}>Live</b>
          </Button>
        )}
        {xs && (
          <PlusMinusButton
            size="25px"
            className={classes.plusMinusButton}
            subjectId={channel.tag}
            subjectKind="channel"
            channel={channel}
          />
        )}
      </Square>
      <div className={classes.textBox} onClick={gotoThisChannel}>
        {mdUp && (
          <PlusMinusButton
            size="25px"
            className={classes.plusMinusButton}
            subjectId={channel.tag}
            subjectKind="channel"
            channel={channel}
          />
        )}
        <div className={classes.text}>{channel.title}</div>
      </div>
      <p className={classes.text}>Number of Audiocasts: {audiocastLength}</p>
    </div>
  )
}

export default ChannelTile
