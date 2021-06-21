import React from 'react'
import cx from 'classnames'
import Color from 'color'
import { makeStyles } from '@material-ui/core'
import ToggleImageButton from './ToggleImageButton'
import { colors } from '../styling'
import { useSelector, useDispatch } from 'react-redux'
import { actions, selectors, constants as storeConstants } from '../store'
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
  eventImageFormobileView:{
    height: '15vw',
    width: '15vw',
  },
  liveness: {
    display: 'flex',
    width: '600%',
  },
  livenessLeftPad: {
    flex: -6,
  },
  liveBroadcast: {
    display: 'flex',
    flexDirection: 'row',
  },
  livenessContent: {
    backgroundColor: '#070709',
    display: 'flex',
    flex: 4,
    padding: '1em 0 1em 1em',
    [theme.breakpoints.only('xs')]: {
      padding: '2vw 0 2vw 2vw',
    },
  },
  trackText: {
    color: colors.white80,
    flex: 1,
    top: '-99%',
    position: 'relative',
    minWidth: '12vw',
    paddingLeft: '2.0vw',
    paddingTop: '0.5vw',
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
const EventImage = ({ classes, imageUrl }) => {

  return (
  
  <img className={cx(window.innerWidth>945?classes.eventImage:classes.eventImageFormobileView)} src={imageUrl} />
  )
}

const EventTextplate = ({ channelColor, sectionData }) => {
  const classes = useStyles({ channelColor })

  return (
    <div className={classes.eventTextplate}>
      <div className={cx(classes.sectionTitle)}>
        <div className={classes.textEllipsisOverflow}>
          {sectionData['title']}{' '}
        </div>
      </div>
      <div className={cx(classes.sectionVariety)}>
        <div className={classes.textEllipsisOverflow}>
          {sectionData['description']}
        </div>
      </div>
    </div>
  )
}

const Track = ({ classes, playbackurl }) => {
  const [isPlaying, setIsPlaying] = React.useState(false)
  const [plyerOn, setPlayerOn] = React.useState(false)
  const dispatch = useDispatch()
  const playerRef = React.useRef()
  const onClick = isPlaying
    ? () => setIsPlaying(false)
    : () => setIsPlaying(true)
  // const playVideo=()=> {
  //   playerRef.current.play();
  //   setPlayerOn(true)
  //   console.log("palyref",playerRef)
  // }
  const audioMode = useSelector(selectors.getAudioMode)
  const isSelectedAudio = playbackurl && playbackurl
  const isPlayings =
    isSelectedAudio && audioMode === storeConstants.AUDIO_MODE_PLAY
  const onPopClick = isPlayings
    ? ev => {
        dispatch(actions.pauseAudio())
        ev.stopPropagation()
        setIsPlaying(false)
        window.location.reload()
      }
    : ev => {
        if (isSelectedAudio) dispatch(actions.playAudio())
        dispatch(
          actions.selectAudio(
            '',
            '',
            '',
            isSelectedAudio ? isSelectedAudio : '',
            '',
            '',
            ''
          )
        )
        setIsPlaying(true)
        dispatch(actions.playAudio())
        ev.stopPropagation()
      }
  return (
    <div className={classes.track}>
      <ToggleImageButton
        className={classes.logoButton}
        size="8vw"
        on={isPlaying}
        onClick={onPopClick}
        onImage="/img/logo_live_pause.png"
        offImage="/img/logo_live_play.png"
        shadowColor={buttonShadowColor}
      />
      <div className={classes.trackText}>Stream</div>
      {/* {isPlaying &&(
           <ReactHlsPlayer
           playerRef={playerRef}
           src={playbackurl}
           autoPlay={true}
           onClick={playVideo}
           controls={true}
           width="20%"
           height="auto"
           />
       )} */}
    </div>
  )
}

const ComingSoon = ({ className, channel, channelColor }) => {
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
  const [fetchLiveData, setFetchLiveData] = React.useState([])
  const [liveStatus, setliveStatus] = React.useState(0)
  const [liveurlcheck, setliveurlchk] = React.useState('')

  const [url, setUrl] = React.useState('')
  React.useEffect(() => {
    liveData(channel['liveStreamId'])
    // return sleep(3000).then(() => {
    // muxliveData();
    // })
  }, [liveStatus])
  const liveData = channellivestream => {
    const baseId = 'appXoertP1WJjd4TQ'
    let urladd = `filterByFormula={channelTag}=${JSON.stringify(
      channel['tag']
    )}&sort%5B0%5D%5Bfield%5D=liveDate&sort%5B0%5D%5Bdirection%5D=desc`
    fetch('/.netlify/functions/commingsoon-proxy', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      // body: JSON.stringify({url: `video/v1/live-streams/${livestreamingId}`})
      body: JSON.stringify({ url: `${baseId}/ChannelLiveData?${urladd}` }),
    })
      .then(response => response.json())
      .then(function (response) {
        if (response.records.length) {
          muxliveData(response.records[0].fields.playbackUrl, channellivestream)
          setFetchLiveData([response.records[0]])
          localStorage.setItem(
            'livePlayurl',
            response.records[0].fields.playbackUrl
          )
          seturl(response.records[0].fields.playbackUrl)
          }
          else{
            //console.log('setlivestatus',liveStatus)
          }
        }
      ).catch((error)=>{
        console.log("error while data fetching",error.type)
      })
  }
  let checkChannel
  const muxliveData = (liveurl, livestreamid) => {
    const baseId = 'appXoertP1WJjd4TQ'
        if(liveurl)
        {
            fetch('/.netlify/functions/mux-proxy', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({url: `video/v1/live-streams/${livestreamid}`})
          }).then(response => response.json())
            .then(
              function(response){
                //console.log('abc',response)
                if(response.data.status=='active'){
                  setliveStatus(1)
                }
              }
            ).catch((error)=>{
              console.log("error while data fetching",error.type)
            })
        }
        else
        {
            setliveStatus(0)
        }
        
    }      

  const classes = useStyles()
 
//console.log('checkchannel',liveStatus)
  return (
    <div className={cx(classes.comingSoon, className)}>
      {liveStatus == 0 ? (
        <div></div>
      ) : (
        <>
          {fetchLiveData.length
            ? fetchLiveData?.map((sectionData, index) => {
                return (
                  <div
                    key={
                      sectionData.fields.title ? sectionData.fields.title : null
                    }
                    className={classes.liveBroadcast}
                  >
                    <div className={classes.eventImageAndText}>
                      <EventImage
                        classes={classes}
                        imageUrl={
                          sectionData.fields.thumbnailUrl
                            ? sectionData.fields.thumbnailUrl
                            : ''
                        }
                      />
                      <EventTextplate
                        channelColor={channelColor}
                        sectionData={sectionData.fields}
                      />
                    </div>
                    <div className={classes.liveness}>
                      <div className={classes.livenessLeftPad}>&nbsp;</div>
                      <div className={classes.livenessContent}>
                        <Track
                          classes={classes}
                          playbackurl={sectionData.fields.playbackUrl}
                        />
                      </div>
                    </div>
                  </div>
                )
              })
            : ''}
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
