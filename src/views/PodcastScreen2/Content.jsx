import React from 'react'

import { makeStyles } from '@material-ui/core/styles'

import * as colors from '../../styling/colors'
import { channelSelectors } from '../../model/rss'
import usePodcast from '../../api/usePodcast'
import { stripHtml } from '../util'
import BottomBlock from '../BottomBlock'
import ContentLayout from '../ContentLayout'
import Square from '../Square'
import cx from 'classnames'

const useStyles = makeStyles(theme => ({
  accentColor: ({accentColor}) => ({
    color: accentColor,
  }),
  logoImage: {
    width: '100%',
  },
  logoImageContainer: {
    marginRight: '1em',
    padding: '1em',
  },
  logoImageSquare: ({accentColor}) => ({
    border: `1px solid ${accentColor}`,
    width: '100%',
  }),
  textplate: {
    padding: '1em',
    width: '100%',
    overflow: 'hidden',
    userSelect: 'none',
  },
  textplateTitleRow: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: '100%',
    fontSize: '150%',
    fontWeight: theme.typography.weight.bold,
  },
  textplateDescription: {
    paddingTop: '0.5em',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
    [theme.breakpoints.up('md')]: {
      width: '85%',
    },
    [theme.breakpoints.up('lg')]: {
      width: '65%',
    },
  },
  textplateTypename: {
    textTransform: 'uppercase',
    userSelect: 'none',
  },
}))

const PodcastChannelImage = ({classes, imageUrl}) => (
  <div className={classes.logoImageContainer}>
    <Square className={classes.logoImageSquare}>
      <img className={classes.logoImage} src={imageUrl} />
    </Square>
  </div>
)

const TextPlate = ({classes, title, description}) => (
  <div className={classes.textplate}>
    <div className={classes.textplateTypename}>
      Podcast Listing
    </div>
    <div className={cx(classes.textplateTitleRow, classes.accentColor)}>
      {title}
    </div>
    <div className={classes.textplateDescription}>
      {description}
    </div>
  </div>
)

const Content = ({podcast}) => {
  const maybePodcastColor = podcast?.color // no such data atm

  const classes = useStyles({accentColor: maybePodcastColor ?? colors.white80})

  const {rss} = usePodcast(podcast, {forceRevalidate: true})

  const imageUrl = channelSelectors.v2.imageUrl(rss)
  const title = channelSelectors.v2.title(rss)
  const description = channelSelectors.v2.description(rss)
  const items = channelSelectors.v2.items(rss)

  const strippedDescription = React.useMemo(
    () => stripHtml(description),
    description
  )

  return (
    <ContentLayout
      accentColor={podcast.color}
      renderTopLeft={
        () => (<PodcastChannelImage classes={classes} imageUrl={imageUrl} />)
      }
      renderTopRight={
        () => (<TextPlate classes={classes} title={title} description={strippedDescription} />)
      }>
      <BottomBlock accentColor={maybePodcastColor} titleStart={title} titleRest="Podcasts">
      </BottomBlock>
    </ContentLayout>
  )
}

export default Content
