import React from 'react'
import cx from 'classnames'
import Color from 'color'
import { makeStyles } from '@material-ui/core'
import ToggleImageButton from './ToggleImageButton'
import { colors } from '../styling'
import ReactHlsPlayer from 'react-hls-player';
const useStyles = makeStyles(theme => ({
  comingSoon: {
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'column',
  },

  comingSoonRow: {
    alignItems: 'center',
    borderRadius: '1em',
    display: 'flex',
    height: '2em',
    minWidth: 0,
    padding: '0.35em 0.35em',
    [theme.breakpoints.up('sm')]: {
      backgroundColor: colors.brandBlack,
      color: colors.white80,
    },
    [theme.breakpoints.only('xs')]: {
      backgroundColor: colors.lightGray,
      color: colors.darkGray,
    },
  },
  logo: {
    display: 'block',
    maxHeight: '100%',
    width: 'auto',
  },
  logoContainer: {
    height: '100%',
  },
  eventImageAndText: {
    display: 'flex',
    width: '100%',
  },
  text: {
    fontFamily: theme.typography.family.primary,
    fontSize: '100%',
    fontWeight: theme.typography.weight.bold,
    margin: '0 0.25em',
    textTransform: 'uppercase',
  },
  sectionTitle: ({ channelColor }) => ({
    color: channelColor,
    display: 'flex',
    fontSize: '125%',
    overflowX: 'hidden',
    textTransform: 'uppercase',
    [theme.breakpoints.only('xs')]: {
      fontSize: '85%',
    },
  }),
  sectionVariety: {
    display: 'flex',
    fontSize: '125%',
    overflowX: 'hidden',
    fontWeight: theme.typography.weight.bold,
    [theme.breakpoints.only('xs')]: {
      fontSize: '85%',
    },
  },
  textEllipsisOverflow: {
    overflowX: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  liveBroadcasts: {
    alignItems: 'stretch',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  eventTextplate: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '0.5em',
    minWidth: 0,
    [theme.breakpoints.only('xs')]: {
      marginLeft: '2vw',
    },
  },
  eventImage: {
    height: '6vw',
    width: '6vw',
  },
  liveness: {
    display: 'flex',
    width: '100%',
  },
  livenessLeftPad: {
    flex: 0.5,
  },
  livenessContent: {
    backgroundColor: '#070709',

    display: 'flex',
    flex: 2,
    flexDirection: 'column',
    padding: '1em 0 1em 1em',
    [theme.breakpoints.only('xs')]: {
      padding: '2vw 0 2vw 2vw',
    },
  },
  trackText: {
    color: colors.white80,
    flex: 1,
    minWidth: '12vw',
    paddingLeft: '2vw',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
}))
const mockupData = [
  {
    episodes: [],
    imageUrl: localStorage.getItem('image'),
    name: localStorage.getItem('title'),
    tags: ['riot', 'lol'],
    variety: localStorage.getItem('description'),
  },
]
const buttonShadowColor = Color(colors.brandBlack).darken(0.5).string()
const filterMockupData = tag =>
  mockupData.filter(({ tags }) => tags.find(thisTag => thisTag === tag))
const EventImage = ({ classes, imageUrl }) => (
  <img className={cx(classes.eventImage)} src={imageUrl} />
)
const EventTextplate = ({ channelColor, sectionData }) => {
  const { name, variety } = sectionData
  console.log('channels',channelColor)
  const classes = useStyles({ channelColor })

  return (
    <div className={classes.eventTextplate}>
      <div className={cx(classes.sectionTitle)}>
        <div className={classes.textEllipsisOverflow}>{name}</div>
      </div>
      <div className={cx(classes.sectionVariety)}>
        <div className={classes.textEllipsisOverflow}>{variety}</div>
      </div>
    </div>
  )
}


const Track = ({ classes }) => {
  const [isPlaying, setIsPlaying] = React.useState(false)
  const [plyerOn,setPlayerOn]=React.useState(false)
  let playbackurl=localStorage.getItem('playback')
const playerRef = React.useRef();
  const onClick = isPlaying
    ? () => setIsPlaying(false)
    : () => setIsPlaying(true)
    const playVideo=()=> {
      playerRef.current.play();
      setPlayerOn(true)
      console.log("palyref",playerRef)
    }
  return (
    <div className={classes.track}>
      <ToggleImageButton
        className={classes.logoButton}
        size="8vw"
        on={isPlaying}
        onClick={onClick}
        onImage="/img/logo_live_pause.png"
        offImage="/img/logo_live_play.png"
        shadowColor={buttonShadowColor}
        src={playbackurl}
      />
      <div className={classes.trackText}>
        Live</div>
        {isPlaying &&(
            <ReactHlsPlayer
            playerRef={playerRef}
            src={playbackurl}
            autoPlay={false}
            onClick={playVideo}
            controls={true}
            width="20%"
            height="auto"
            />
        )}
    </div>
  )
}
const ComingSoon = ({ className,channel,channelColor, text }) => {
  const classes = useStyles()
  let urlIsthere=  localStorage.getItem('playback')
  console.log("urlis",urlIsthere)
  return (
    <div className={cx(classes.comingSoon,className)}>
      {!urlIsthere ?(
      <div className={classes.comingSoonRow}>
        <div className={classes.logoContainer}>
          <img
            className={classes.logo}
            src="/img/logo_square_transparent.png"
          />
        </div>
        <div className={classes.text}>{ text || 'Coming Soon' }</div>
      </div>
      ):(
        <>
      {filterMockupData('riot').map((sectionData)=>{
        console.log("channelcolor",channelColor)
        return (
        <div key={sectionData.name} className={classes.liveBroadcast}>
      <div className={classes.eventImageAndText}>
            <EventImage classes={classes} imageUrl={sectionData.imageUrl} />
            <EventTextplate
              channelColor={channelColor}
              sectionData={sectionData}
            />
          </div>
          <div className={classes.liveness}>
            <div className={classes.livenessLeftPad}>&nbsp;</div>
            <div className={classes.livenessContent}>
              <Track classes={classes} />
            </div>
          </div>
    </div>
        )})}
        </>
      )}
    
      </div>
    
    
  )
}
export const mockupGetHasBroadcasts = channel => {
  const data = filterMockupData(channel.tag)
  return data.length > 0
}
export default ComingSoon
