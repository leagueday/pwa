import React from 'react'
import MyCreators from './MyCreators'
import { useDispatch, useSelector } from 'react-redux'
import cx from 'classnames'
import Loading from '../Loading'
import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import { actions, selectors } from '../../store'
import { colors } from '../../styling'
import { addScrollStyle } from '../util'
import Expander from './Expander'
// import LiveAndUpcomingLozenge from './LiveAndUpcomingLozenge'
import MyChannels from './MyChannels'
import MyPodcasts from './MyPodcasts'
// import SearchLozenge from './SearchLozenge'
import SignInOutButton from './SignInOutButton'

const useStyles = makeStyles(theme => ({
  clickable: {
    cursor: 'pointer',
  },
  controls: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'none',
    justifyContent: 'space-around',
    padding: '0.5vw',
    width: '100%',
  },
  expander: {
    paddingLeft: '0.5em',
    paddingRight: '0.5em',
    paddingTop: '0.5em',
    marginBottom: '1rem',
  },
  logo: {
    cursor: 'pointer',
    display: 'block',
    width: '100%',
    marginBottom: '0',
  },
  logoContainer: {
    position: 'relative',
    flex: 2,
    paddingRight: '5%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  logoText: {
    position: 'absolute',
    top: 0,
    right: '5%',
    opacity: 0.8,
    textAlign: 'top',
    fontWeight: theme.typography.fontWeightBold,
    fontSize: '150%',
    color: colors.magenta,
  },
  scroller: addScrollStyle(
    colors.blue,
    theme
  )({
    minHeight: 0,
    overflowY: 'auto',
    width: '100%',
  }),
  scrollerChild: {
    minHeight: '100%',
    width: '100%',
  },
  sideNav: {
    backgroundColor: colors.darkerGray,
    display: 'flex',
    flexDirection: 'column',
    fontSize: 'max(min(1.6vw, 14px), 12px)',
    height: '100%',
    width: 'min(19%, 15em)',
  },
  signInOutButton: {
    fontSize: '95%',
    whiteSpace: 'nowrap',
    width: '45%',
    position: 'absolute',
    color: 'white',
  },
  signInOutButtonContainer: {
    paddingTop: '0.25vw',
    position: 'relative',
    marginTop: '25px',
    marginBottom: '25px',
    width: '100%',
  },
  signInOut: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inNOutButton: {
    '&:hover': {
      backgroundColor: theme.palette.primary.active,
    },
    // flex: 1,
    marginLeft: '5%',
    color: '#ffffff',
    width: '45%',
    paddingBottom: '0.25vw',
    text: ({ skinny }) => ({
      flex: 1,
      fontSize: skinny ? '60%' : null,
      fontWeight: theme.typography.weight.bold,
      marginLeft: '0.25em',
      userSelect: 'none',
      whiteSpace: 'nowrap',
    }),
  },
}))

const FatSideNav = ({ className, home }) => {
  const classes = useStyles({ home })
  const user = useSelector(selectors.getUser)
  const [profileCreated, setProfileCreated] = React.useState(0)

  React.useEffect(() => {
    getProfileData()
  }, [])

  const getProfileData = () => {
    const baseId = 'appXoertP1WJjd4TQ'
    let fetchSearch
    if (user) {
      const userId = user['id']
      fetchSearch = `?filterByFormula=({userId}=${JSON.stringify(userId)})`
    }
    fetch('/.netlify/functions/airtable-getprofile', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: `${baseId}/UserProfile${fetchSearch}` }),
    })
      .then(response => response.json())
      .then(function (response) {
        if (response.records.length > 0) {
          setProfileCreated(true)
          localStorage.setItem(
            'profilecreated',
            response.records[0].fields.profileCreated
          )
        } else {
          setProfileCreated(false)
        }
      })
      .catch(error => {
        console.log('error while data fetching', error)
        //setProfileCreated(2)
      })
  }

  const dispatch = useDispatch()

  const goHome = () => dispatch(actions.pushHistory('/'))

  const myprofile = () => {
    dispatch(actions.pushHistory(`/profile/${user.id}`))
  }
  const createProfile = () => dispatch(actions.pushHistory('/create'))

  const golive = () => dispatch(actions.pushHistory('/live'))

  return (
    <div className={cx(classes.sideNav, className)}>
      <React.Suspense fallback={<Loading />}>
        <div className={classes.controls}>
          {/* <div className={classes.logoContainer}>
            <img
              className={classes.logo}
              onClick={goHome}
              src="/img/NEW_LDLogo.png"
            />
            <p className={classes.logoText}>BETA</p>
          </div> */}
          {/* <div className={classes.signInOutButtonContainer}>
            <SignInOutButton className={classes.signInOutButton} />
          </div> */}
        </div>
        <div className={classes.scroller}>
          <div className={classes.scrollerChild}>
            <Expander
              className={classes.expander}
              text="MY CHANNELS"
              tag="chan"
            >
              <MyChannels />
            </Expander>
              <Expander
              className={classes.expander}
              text="MY CREATORS"
              tag="poca"
              >
              <MyCreators />
              </Expander>
            <MyPodcasts />
            {/* <React.Suspense fallback={<Loading />}>
              {user &&
                (profileCreated ? (
                  <Button
                    className={classes.inNOutButton}
                    color="primary"
                    onClick={myprofile}
                    size="small"
                    variant="contained"
                  >
                    PROFILE
                  </Button>
                ) : (
                  <Button
                    className={classes.inNOutButton}
                    color="primary"
                    onClick={createProfile}
                    size="small"
                    variant="contained"
                  >
                    CREATE PROFILE
                  </Button>
                ))}
            </React.Suspense> */}
          </div>
        </div>
      </React.Suspense>
    </div>
  )
}

export default FatSideNav
