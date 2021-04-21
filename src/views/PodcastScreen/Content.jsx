import React from 'react'
import cx from 'classnames'

import { makeStyles } from '@material-ui/core/styles'

import * as colors from '../../styling/colors'
import * as rssSelectors from '../../model/rss'
import usePodcast from '../../api/usePodcast'

import { cycleColorSequence, stripHtml } from '../util'
import BottomBlock from '../BottomBlock'
import ContentLayout from '../ContentLayout'
import PlusMinusButton from '../PlusMinusButton'
import Item from './Item'

const useStyles = makeStyles(theme => ({
  accentColor: ({ accentColor }) => ({
    color: accentColor,
  }),
  items: {
    paddingTop: '0.25em',
  },
  logoImage: ({ accentColor }) => ({
    border: `0.15em solid ${accentColor}`,
    display: 'block',
    width: '100%',
    [theme.breakpoints.only('xs')]: {
      border: `0.25vw solid ${accentColor}`,
    },
  }),
  logoImageContainer: {
    fontSize: '150%',
    margin: '1em',
    width: '100%',
    [theme.breakpoints.only('xs')]: {
      fontSize: '90%',
      margin: '1vw',
    },
  },
  logoImageContainer2: {
    position: 'relative',
    width: '100%',
  },
  plusMinusButton: {
    bottom: '0.25em',
    position: 'absolute',
    right: '0.25em',
    [theme.breakpoints.only('xs')]: {
      bottom: '2vw',
      right: '2vw',
    },
  },
  textplate: {
    marginLeft: '1em',
    padding: '1em',
    width: '100%',
    overflow: 'hidden',
    userSelect: 'none',
    [theme.breakpoints.only('xs')]: {
      marginLeft: '2vw',
      padding: '2vw',
    },
  },
  textplateTitleRow: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: '100%',
    fontSize: '150%',
    fontWeight: theme.typography.weight.bold,
    [theme.breakpoints.only('xs')]: {
      fontSize: '90%',
    },
  },
  textplateDescription: {
    paddingTop: '0.5em',
    [theme.breakpoints.only('xs')]: {
      paddingTop: '1vw',
      width: '100%',
    },
    [theme.breakpoints.only('sm')]: {
      width: '100%',
    },
    [theme.breakpoints.only('md')]: {
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

const maybeMakeUpColor = (idString, maybeColor) => {
  if (maybeColor) return maybeColor

  const hash = (() => {
    if (!idString) return 0

    let result = 0
    for (let i = 0; i < idString.length; i++) {
      const c = idString.charCodeAt(i)
      result = (result << 5) - result + c
      result = result & result // Convert to 32bit integer
    }
    return Math.abs(result)
  })()

  return cycleColorSequence[hash % cycleColorSequence.length]
}

const PodcastChannelImage = ({ classes, imageUrl, podcastId }) => (
  <div className={classes.logoImageContainer}>
    <div className={classes.logoImageContainer2}>
      <img className={classes.logoImage} src={imageUrl} />
      <PlusMinusButton
        className={classes.plusMinusButton}
        subjectId={podcastId}
        subjectKind="podcast"
      />
    </div>
  </div>
)

const TextPlate = ({ classes, title, description }) => (
  <div className={classes.textplate}>
    <div className={classes.textplateTypename}>Podcast Listing</div>
    <div className={cx(classes.textplateTitleRow, classes.accentColor)}>
      {title}
    </div>
    <div className={classes.textplateDescription}>{description}</div>
  </div>
)

const Content = ({ podcast }) => {
  const [expandedIndex, setExpandedIndex] = React.useState()

  const podcastColor = React.useMemo(
    () => maybeMakeUpColor(podcast?.url, podcast?.color),
    [podcast?.url, podcast?.color]
  )

  const classes = useStyles({ accentColor: podcastColor ?? colors.white80 })

  const { rss } = usePodcast(podcast, { forceRevalidate: true })

  const imageUrl = rssSelectors.channelSelectors.v2.imageUrl(rss)
  const title = rssSelectors.channelSelectors.v2.title(rss)
  const description = rssSelectors.channelSelectors.v2.description(rss)
  const items = rssSelectors.channelSelectors.v2.items(rss)

  const strippedDescription = React.useMemo(() => stripHtml(description), [
    description,
  ])

  const makeToggleIsExpanded = itemIndex =>
    expandedIndex === itemIndex
      ? () => {
          setExpandedIndex(null)
        }
      : () => {
          setExpandedIndex(itemIndex)
        }

  return (
    <ContentLayout
      accentColor={podcastColor}
      renderTopLeft={() => (
        <PodcastChannelImage
          classes={classes}
          imageUrl={imageUrl}
          podcastId={podcast?.id}
        />
      )}
      renderTopRight={() => (
        <TextPlate
          classes={classes}
          title={title}
          description={strippedDescription}
        />
      )}
    >
      <BottomBlock accentColor={podcastColor}>
        <div className={classes.items}>
          {(() => {
            if (!items) return null

            const iterableItems = items.map ? items : [items]

            // Here the React key is inadvisably the track offset
            // in the list, it's not great and is strictly as good
            // as the Next-Track feature...
            let itemIndex = 0

            return iterableItems.map(item => {
              const result = (
                <Item
                  key={itemIndex}
                  accentColor={podcastColor}
                  podcastId={podcast?.id}
                  podcastName={podcast?.name}
                  podcastUrl={podcast?.url}
                  item={item}
                  itemIndex={itemIndex}
                  isExpanded={expandedIndex === itemIndex}
                  toggleIsExpanded={makeToggleIsExpanded(itemIndex)}
                />
              )

              itemIndex++

              return result
            })
          })()}
        </div>
      </BottomBlock>
    </ContentLayout>
  )
}

export default Content
