import React, { useState, useEffect } from 'react'
import useAirTable from '../api/useAirtable'
import { makeStyles } from '@material-ui/core/styles'
import { colors } from '../styling'

const useStyles = makeStyles(theme => ({
  nextLive: {
    display: 'flex',
    width: '100%',
    // paddingTop: '1rem',
    alignItems: 'center',
    fontSize: '100%',
  },
  nextLiveText: {
    fontWeight: theme.typography.fontWeightBold,
    width: '70%',
    marginLeft: 10,
    textAlign: 'center'
  },
  liveSpan: {
    color: colors.magenta
  },
  nextLiveImg: {
    // flex: 0.5,
    // width: 'inherit',
    width: '18%',
    // flex: 1
  }
}))

const NextLive = ({ titleStart, titleRest }) => {
  const classes = useStyles();
  const [live, setlive] = useState(false)
  const [days, setDays] = useState(0)
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  let mockLiveDates = [
    'June 17, 2021 18:00:00',
    'June 18, 2021 18:00:00',
    'June 19, 2021 18:00:00',
    'June 20, 2021 18:00:00',
    'June 23, 2021 22:00:00',
    'June 25, 2021 18:00:00',
    'June 26, 2021 18:00:00',
    'June 27, 2021 18:00:00',
  ];

  const [liveDates, setLiveDates] = useState(mockLiveDates)

  const { data } = useAirTable('appXoertP1WJjd4TQ', 'ChannelLiveData')

  const [channelData, setChannelData] = useState(data)

  // console.log('channel data ', data)

  // const getChannelData = () => {
  //   setChannelData(data)
  // }

  const getLiveData = () => {
    data?.map(item => {
      while (item.fields.liveStatus !== undefined) {
        setlive(true)
        return
      }
    })
    return
  }

  // console.log(new Date().getTime() - new Date(liveDates[0]).getTime())

  const countDown = e => {
    const startDate = new Date(liveDates[0]).getTime()
    const today = new Date().getTime()

    const timeDiff = startDate - today

    const seconds = 1000
    const minutes = seconds * 60
    const hours = minutes * 60
    const days = hours * 24
    let timeDays = Math.floor(timeDiff / days)
    let timeHours = Math.floor((timeDiff % days) / hours)
    let timeMinutes = Math.floor((timeDiff % hours) / minutes)

    setDays(timeDays)
    setHours(timeHours)
    setMinutes(timeMinutes)

    // console.log('hello   ',mockLiveDates.filter((date) => startDate - date.getTime() > 1))

    // if (timeDiff < 1) {
    //   console.log('times up', mockLiveDates)
    //   mockLiveDates = mockLiveDates.slice(1)
    //   setLiveDates(mockLiveDates)
    // }
  }

  // useEffect(() => {
  //   let mounted = true
  //   if (mounted) {
  //     setInterval(countDown, 100)
  //   }
  //   return function cleanup() {
  //     mounted = false
  //   }
  // }, [])

  // useEffect(() => {
  //   getLiveData()
  // }, [data])

  return (
    <div classes={classes.nextLive}>
      {/* {titleStart === 'League of Legends' &&
        titleRest === 'Live' &&
        live === false && (
          <div className={classes.nextLive}>
            <img
              src="/img/NEW_LDLogo.png"
              className={classes.nextLiveImg}
              style={{ width: '120px', height: '30px' }}
            />
            <p>
              <span className={classes.nextLiveText}>Next Live: </span>
              {days} Day{days > 1 || days === 0 ? 's' : ''}, {hours} Hour
              {hours > 1 || hours === 0 ? 's' : ''}, {minutes} Minute
              {minutes > 1 || minutes === 0 ? 's' : ''}
            </p>
          </div>
        )} */}
        {titleStart === 'League of Legends' &&
          <div className={classes.nextLive}>
            <img
              src="/img/NEW_LDLogo.png"
              className={classes.nextLiveImg}
              // style={{ width: '120px', height: '30px' }}
            />
            <p className={classes.nextLiveText}>
              Live every Friday, Saturday and Sunday from <span className={classes.liveSpan}>6-10pm EST</span>, and Wednesdays from <span className={classes.liveSpan}>10-11pm EST</span>!
            </p>
          </div>
        }
    </div>
  )
}

export default NextLive
