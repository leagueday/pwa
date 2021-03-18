import React from 'react'
import {useDispatch} from 'react-redux'
import cx from 'classnames'

import { makeStyles } from '@material-ui/core/styles'

import {actions} from '../../store'
import BasicLayout from '../BasicLayout'
import ContentLayout from '../ContentLayout'
import Square from '../Square'
import Item from './Item'

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
  }
}

// this is just for the data hardcoded in this component
const reformatExcelDate = dateString => {
  const [mm, dd, yyyy] = dateString.split('/')

  const yy = yyyy.substr(2, 2)

  return `${1*mm}/${1*dd}/${yy}`
}

// this is just for the data hardcoded in this component
const reformatExcelDuration = hmsString => {
  const [hh, mm, ss] = hmsString.split(':')

  const maybeHh = hh === '00' ? '' : `${1*hh}:`
  return `${maybeHh}${mm}:${ss}`
}

const useStyles = makeStyles(theme => ({
  accentColor: ({color}) => ({
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
  item: { },
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

const Logo = ({imageUrl, classes}) => (
  <div className={classes.logoImageContainer}>
    <Square className={classes.logoImageSquare}>
      <img className={classes.logoImage} src={imageUrl} />
    </Square>
  </div>
)

const Headline = ({classes, subTitle, title}) => (
  <div className={classes.headline}>
    <div className={classes.headlineTypename}>
      Event Archive
    </div>
    <div className={cx(classes.headlineTitleRow, classes.accentColor)}>
      {title}
    </div>
    <div className={classes.headlineTitleRow}>
      {subTitle}
    </div>
  </div>
)

const EventScreen = ({tag}) => {
  const dispatch = useDispatch()

  const data = mockData[tag]

  const classes = useStyles({color: data?.color})

  React.useEffect(
    () => {
      if (!data) {
        dispatch(actions.pushHistory('/'))
      }
    },
    [data]
  )

  const color = data?.color
  const imageUrl = data?.imageUrl
  const subTitle = data?.subTitle
  const title = data?.title

  let index = 0
  const nextIndex = () => {
    const result = index
    index = index + 1
    return result
  }

  return (
    <BasicLayout>
      <ContentLayout
        accentColor={color}
        renderTopLeft={
          () => (<Logo imageUrl={imageUrl} classes={classes} />)
        }
        renderTopRight={
          () => (<Headline color={color} classes={classes} subTitle={subTitle} title={title} />)
        }>
        <>
          {data.items.map(
            ([title, date, duration]) => (
              itemIndex => (
                <Item
                  accentColor={color}
                  className={classes.item}
                  date={reformatExcelDate(date)}
                  duration={reformatExcelDuration(duration)}
                  itemIndex={itemIndex}
                  key={itemIndex}
                  title={title}
                />
              )
            )(
              nextIndex()
            )
          )}
        </>
      </ContentLayout>
    </BasicLayout>
  )
}

export default EventScreen
