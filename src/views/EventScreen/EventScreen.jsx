import React, { useState, useEffect, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import cx from 'classnames'
import Airtable from 'airtable'
import { colors } from '../../styling'
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import useChannels from '../../api/useChannels'
import { actions } from '../../store'
import BasicLayout from '../BasicLayout'
import ContentLayout from '../ContentLayout'
import Square from '../Square'
import Item from './Item'

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
  searchBar: {
    backgroundColor: colors.lightGray,
    margin: '0.5vw',
    outline: 'none',
    border: 'none',
    color: 'white',
    borderRadius: '5px',
    padding: '12px 50px 12px 5px',
    width: '25%',
    // fontSize: '120%',
    fontFamily: theme.typography.family.primary,
    '&::placeholder': {
      color: 'white',
      fontFamily: theme.typography.family.primary,
      fontSize: '120%',
      opacity: 0.8,
    },
    [theme.breakpoints.down('sm')]: {
      width: '80%',
    },
  },
  searchBtn: {
    background: colors.blue,
    borderRadius: '5px',
    '&:hover': {
      backgroundColor: theme.palette.primary.active,
    },
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
  const [eventDataFetch, seteventDataFetch] = useState([])
  const [eventDataFetchlCS, seteventDataFetchlCS] = useState([])
  const [secondPage, setSecondPage] = useState([])
  const [loading, setisloading] = useState(0)
  const [criteria, setCriteria] = useState('')
  const classes = useStyles()
  const [expandedIndex, setExpandedIndex] = useState()

  useEffect(() => {
    if (tag == 'leaguenight') {
      EvenScreeDatalCS()
    }

    if (tag == 'lcs') {
      EvenScreeDatalOL()
    }
  }, [tag])

  
  let allRecords = []
  const EvenScreeDatalOL = async () => {
    const apiKey = 'keymd23kpZ12EriVi'
    const baseId = 'appXoertP1WJjd4TQ'
    const base = new Airtable({ apiKey }).base(baseId)

    base('ChannelLiveData')
      .select({
        filterByFormula: "{channelTag} = 'lol'",
        view: 'Grid view',
      })
      .eachPage(
        async function page(records, fetchNextPage) {
          // records.forEach(rec => {
          //   allRecords.push(rec)
          // })
          allRecords = [...allRecords.reverse(), ...records]
          seteventDataFetch(allRecords.reverse())
          // setSecondPage(records)
          fetchNextPage();
          console.log('records  ', allRecords)
        },
        function done(err) {
          if (err) {
            console.error(err)
            return
          }
        }
      )
  }

  const EvenScreeDatalCS = () => {
    const baseId = 'appXoertP1WJjd4TQ'
    let urladd = `filterByFormula={channelTag}='lolnight'`
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
        console.log('error while data fetching', error.type)
      })
  }

  const color = colors.yellow
  const imageUrl =
    tag === 'lcs'
      ? '/img/restyle_demo/lcs.png'
      : '/img/restyle_demo/LeagueNight2.png'
  const subTitle =
    tag === 'lcs'
      ? 'LCS Spring Replays 2021'
      : 'LeagueNight Spring Replays 2021'
  const title = tag === 'lcs' ? 'LCS Replays' : 'LeagueNigh Replays'

  const makeToggleIsExpanded = itemIndex =>
    expandedIndex === itemIndex
      ? () => {
          setExpandedIndex(null)
        }
      : () => {
          setExpandedIndex(itemIndex)
        }

  console.log('length  ', eventDataFetch?.length)

  return (
    <BasicLayout>
      <ContentLayout
        accentColor={colors.charcoal}
        renderTopLeft={() => <Logo imageUrl={imageUrl} classes={classes} />}
        renderTopRight={() => (
          <Headline
            color={colors.charcoal}
            classes={classes}
            subTitle={subTitle}
            title={title}
          />
        )}
      >
        <input
          className={classes.searchBar}
          type="text"
          placeholder="Search for Recordings..."
          value={criteria}
          onChange={e => setCriteria(e.target.value)}
        />
        <>
          {eventDataFetch?.length &&
            eventDataFetch
              ?.filter(rec =>
                rec.fields.title
                  ?.toLowerCase()
                  .includes(criteria?.toLowerCase())
              )
              .map((item, index) => {
                return (
                  <Item
                    key={index}
                    accentColor={color}
                    className={classes.item}
                    date={
                      item.fields.liveDate
                        ? item.fields.liveDate.split('T')[0]
                        : ''
                    }
                    duration={''}
                    itemIndex={index}
                    key={index}
                    title={item.fields.title}
                    description={item.fields.description}
                    itemAudioUrl={item.fields.playbackUrl}
                    isExpanded={expandedIndex === index}
                    toggleIsExpanded={makeToggleIsExpanded(index)}
                    dataFetch={eventDataFetch}
                  />
                )
              })}
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
