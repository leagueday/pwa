import React from 'react'
import { useDispatch } from 'react-redux'
import cx from 'classnames'

import { makeStyles } from '@material-ui/core/styles'
import useChannels from '../../api/useChannels'
import { actions } from '../../store'
import BasicLayout from '../BasicLayout'
import ContentLayout from '../ContentLayout'
import Square from '../Square'
import Item from './Item'
import { REACT_APP_BASE_ID } from '../../config'
const mockData = {
  lcs: {
    color: 'orange',
    imageUrl: '/img/restyle_demo/lcs.png',
    items: [
      ['FlyQuest vs. Immortals', '03/07/2021', '00:47:11'],
      ['Team Liquid vs. Counter Logic Gaming', '03/07/2021', '00:45:16'],
      ['TSM vs. Cloud8', '03/07/2021', '00:46:45'],
      ['Evil Geniuses vs. Dignitas', '03/07/2021', '00:44:53'],
      ['100 Thieves vs. Golden Guardians', '03/07/2021', '00:45:43'],
      ['Counter Logic Gaming vs. FlyQuest', '03/06/2021', '00:48:34'],
      ['Evil Geniuses vs. Immortals', '03/06/2021', '00:47:11'],
      ['Cloud9 vs. Team Liquid', '03/06/2021', '00:45:16'],
      ['100 Thieves vs. TSM', '03/06/2021', '00:46:45'],
      ['Dignitas vs. Golden Guardians', '03/06/2021', '00:44:53'],
      ['Immortals vs. Counter Logic Gaming', '03/05/2021', '00:45:43'],
      ['Team Liquid vs. Golden Guardians', '03/05/2021', '00:48:34'],
      ['FlyQuest vs. Cloud9', '03/05/2021', '00:47:11'],
      ['100 Thieves vs. Evil Geniuses', '03/05/2021', '00:45:16'],
      ['TSM vs. Dignitas', '03/05/2021', '00:46:45'],
      ['Dignitas vs. Counter Logic Gaming', '02/28/2021', '00:44:53'],
      ['Evil Geniuses vs. Golden Guardians', '02/28/2021', '00:45:43'],
      ['Immortals vs. Team Liquid', '02/28/2021', '00:48:34'],
      ['100 Thieves vs. Cloud9', '02/28/2021', '00:47:11'],
      ['FlyQuest vs. TSM', '02/28/2021', '00:45:16'],
      ['Golden Guardians vs. Immortals', '02/27/2021', '00:46:45'],
      ['TSM vs. Counter Logic Gaming', '02/27/2021', '00:44:53'],
      ['Dignitas vs. 100 Thieves', '02/27/2021', '00:45:43'],
      ['Cloud9 vs. Evil Geniuses', '02/27/2021', '00:48:34'],
      ['Team Liquid vs. FlyQuest', '02/27/2021', '00:47:11'],
      ['Immortals vs. Dignitas', '02/26/2021', '00:45:16'],
      ['Counter Logic Gaming vs. 100 Thieves', '02/26/2021', '00:46:45'],
      ['Evil Geniuses vs. FlyQuest', '02/26/2021', '00:44:53'],
      ['Team Liquid vs. TSM', '02/26/2021', '00:45:43'],
      ['Cloud9 vs. Golden Guardians', '02/26/2021', '00:48:34'],
    ],
    subTitle: 'LCS Spring Split 2021',
    title: 'LCS Replays',
  },
  leaguenight: {
    color: 'orange',
    imageUrl: '/img/restyle_demo/LeagueNight2.png',
    items: [
      ['FlyQuest vs. Immortals', '03/07/2021', '00:47:11'],
      ['Team Liquid vs. Counter Logic Gaming', '03/07/2021', '00:45:16'],
      ['TSM vs. Cloud8', '03/07/2021', '00:46:45'],
      ['Evil Geniuses vs. Dignitas', '03/07/2021', '00:44:53'],
      ['100 Thieves vs. Golden Guardians', '03/07/2021', '00:45:43'],
      ['Counter Logic Gaming vs. FlyQuest', '03/06/2021', '00:48:34'],
      ['Evil Geniuses vs. Immortals', '03/06/2021', '00:47:11'],
      ['Cloud9 vs. Team Liquid', '03/06/2021', '00:45:16'],
      ['100 Thieves vs. TSM', '03/06/2021', '00:46:45'],
      ['Dignitas vs. Golden Guardians', '03/06/2021', '00:44:53'],
      ['Immortals vs. Counter Logic Gaming', '03/05/2021', '00:45:43'],
      ['Team Liquid vs. Golden Guardians', '03/05/2021', '00:48:34'],
      ['FlyQuest vs. Cloud9', '03/05/2021', '00:47:11'],
      ['100 Thieves vs. Evil Geniuses', '03/05/2021', '00:45:16'],
      ['TSM vs. Dignitas', '03/05/2021', '00:46:45'],
      ['Dignitas vs. Counter Logic Gaming', '02/28/2021', '00:44:53'],
      ['Evil Geniuses vs. Golden Guardians', '02/28/2021', '00:45:43'],
      ['Immortals vs. Team Liquid', '02/28/2021', '00:48:34'],
      ['100 Thieves vs. Cloud9', '02/28/2021', '00:47:11'],
      ['FlyQuest vs. TSM', '02/28/2021', '00:45:16'],
      ['Golden Guardians vs. Immortals', '02/27/2021', '00:46:45'],
      ['TSM vs. Counter Logic Gaming', '02/27/2021', '00:44:53'],
      ['Dignitas vs. 100 Thieves', '02/27/2021', '00:45:43'],
      ['Cloud9 vs. Evil Geniuses', '02/27/2021', '00:48:34'],
      ['Team Liquid vs. FlyQuest', '02/27/2021', '00:47:11'],
      ['Immortals vs. Dignitas', '02/26/2021', '00:45:16'],
      ['Counter Logic Gaming vs. 100 Thieves', '02/26/2021', '00:46:45'],
      ['Evil Geniuses vs. FlyQuest', '02/26/2021', '00:44:53'],
      ['Team Liquid vs. TSM', '02/26/2021', '00:45:43'],
      ['Cloud9 vs. Golden Guardians', '02/26/2021', '00:48:34'],
    ],
    subTitle: '',
    title: 'LeagueNight',
  },
}

// this is just for the data hardcoded in this component
const reformatExcelDate = dateString => {
  const [mm, dd, yyyy] = dateString.split('/')

  const yy = yyyy.substr(2, 2)

  return `${1 * mm}/${1 * dd}/${yy}`
}

// this is just for the data hardcoded in this component
const reformatExcelDuration = hmsString => {
  const [hh, mm, ss] = hmsString.split(':')

  const maybeHh = hh === '00' ? '' : `${1 * hh}:`
  return `${maybeHh}${mm}:${ss}`
}

const useStyles = makeStyles(theme => ({
  accentColor: ({ color }) => ({
    color,
  }),
  headline: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    minWidth: 0,
    padding: '2em 1em 1em 1em',
    width: '100%',
  },
  headlineTitleRow: {
    minWidth: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: '100%',
    fontSize: '150%',
    fontWeight: theme.typography.weight.bold,
    userSelect: 'none',
  },
  headlineTypename: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    textTransform: 'uppercase',
    userSelect: 'none',
    whiteSpace: 'nowrap',
  },
  item: {},
  logoImage: {
    width: '100%',
  },
  logoImageContainer: {
    margin: '1em',
  },
  logoImageSquare: {
    width: '7em',
  },
}))

const Logo = ({ imageUrl, classes }) => (
  <div className={classes.logoImageContainer}>
    <Square className={classes.logoImageSquare}>
      <img className={classes.logoImage} src={imageUrl} />
    </Square>
  </div>
)

const Headline = ({ classes, subTitle, title }) => (
  <div className={classes.headline}>
    <div className={classes.headlineTypename}>Event Archive</div>
    <div className={cx(classes.headlineTitleRow, classes.accentColor)}>
      {title}
    </div>
    <div className={classes.headlineTitleRow}>{subTitle}</div>
  </div>
)

const EventScreen = ({ tag }) => {
  const baseId = REACT_APP_BASE_ID
  const channels = useChannels().list
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
  let livestreamingId = channels.map(item => item.liveStreamId)
  const dispatch = useDispatch()
  const data = mockData[tag] ?? mockData['lcs']
  const [eventDataFetch, seteventDataFetch] = React.useState([])
  const [eventDataFetchlCS, seteventDataFetchlCS] = React.useState([])
  const [loading, setisloading] = React.useState(0)
  const [rescentAsscetid, setrescentAsscetId] = React.useState([])
  const classes = useStyles({ color: data?.color })
  const [liveUrl, setLiveUrl] = React.useState([])
  const [expandedIndex, setExpandedIndex] = React.useState()
  const [duration, setduration] = React.useState([])

  React.useEffect(() => {
    if (!data) {
      dispatch(actions.pushHistory('/'))
    }
    if (tag == 'leaguenight') {
      EvenScreeDatalCS()
    }

    if (tag == 'lcs') {
      EvenScreeDatalOL()
    }
  }, [data])

  const EvenScreeDatalOL = () => {
    let urladd = `filterByFormula={channelTag}='lol'&sort%5B0%5D%5Bfield%5D=liveDate&sort%5B0%5D%5Bdirection%5D=desc`
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
        if (response.records.length) {
          setisloading(1)
          seteventDataFetch(response.records)
        } else {
          setisloading(2)
        }
      })
      .catch(error => {
        setisloading(0)
      })
  }

  const EvenScreeDatalCS = () => {
    let urladd = `filterByFormula={channelTag}='lolnight'&sort%5B0%5D%5Bfield%5D=liveDate&sort%5B0%5D%5Bdirection%5D=desc`
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
        if (response.records.length) {
          seteventDataFetchlCS(response.records)
          setisloading(2)
        } else {
          setisloading(3)
        }
      })
      .catch(error => {
        setisloading(8)
      })
  }
  const color = data?.color
  const imageUrl = data?.imageUrl
  const subTitle = data?.subTitle
  const title = data?.title
  const makeToggleIsExpanded = itemIndex =>
    expandedIndex === itemIndex
      ? () => {
          setExpandedIndex(null)
        }
      : () => {
          setExpandedIndex(itemIndex)
        }
  return (
    <BasicLayout>
      <ContentLayout
        accentColor={color}
        renderTopLeft={() => <Logo imageUrl={imageUrl} classes={classes} />}
        renderTopRight={() => (
          <Headline
            color={color}
            classes={classes}
            subTitle={subTitle}
            title={title}
          />
        )}
      >
        <>
          {loading == 1
            ? eventDataFetch.length &&
              eventDataFetch?.map((title, index) => (
                <Item
                  key={index}
                  accentColor={color}
                  className={classes.item}
                  date={
                    title.fields.liveDate
                      ? title.fields.liveDate.split('T')[0]
                      : ''
                  }
                  duration={''}
                  itemIndex={index}
                  key={index}
                  title={title.fields.title}
                  description={title.fields.description}
                  itemAudioUrl={title.fields.playbackUrl}
                  isExpanded={expandedIndex === index}
                  toggleIsExpanded={makeToggleIsExpanded(index)}
                  dataFetch={eventDataFetch}
                />
              ))
            : ''}
        </>
        <>
          {loading == 2
            ? eventDataFetchlCS &&
              eventDataFetchlCS?.map((title, index) => (
                <Item
                  key={index}
                  accentColor={color}
                  className={classes.item}
                  date={
                    title.fields.liveDate
                      ? title.fields.liveDate.split('T')[0]
                      : ''
                  }
                  duration={''}
                  itemIndex={index}
                  key={index}
                  title={title.fields.title}
                  description={title.fields.description}
                  itemAudioUrl={title.fields.playbackUrl}
                  isExpanded={expandedIndex === index}
                  toggleIsExpanded={makeToggleIsExpanded(index)}
                />
              ))
            : ''}
        </>
      </ContentLayout>
    </BasicLayout>
  )
}

export default EventScreen
