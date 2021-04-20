import React from 'react'
import {useDispatch} from 'react-redux'
import cx from 'classnames'

import { makeStyles, useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'

import useChannels from '../../api/useChannels'
import {actions} from '../../store'
import {colors} from '../../styling'

const useStyles = makeStyles(theme => ({
  channelChildren: {
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
    minHeight: 0,
    overflow: 'hidden',
  },
  image: {
    cursor: 'pointer',
    marginLeft: '0.5em',
    width: '7em',
    height: '7em',
    borderRadius: '3.5em',
    objectFit: 'cover',
    [theme.breakpoints.only('xl')]: {
      borderRadius: '4em',
      height: '8em',
      width: '8em',
    },
    [theme.breakpoints.only('sm')]: {
      borderRadius: '3em',
      height: '6em',
      width: '6em',
    },
    [theme.breakpoints.only('xs')]: {
      borderRadius: '4.5vw',
      height: '9vw',
      marginLeft: '2vw',
      width: '9vw',
    },
  },
  imageBorderLive: {
    border: `0.33em solid ${colors.lime}`,
    [theme.breakpoints.only('xs')]: {
      border: `0.5vw solid ${colors.lime}`,
    },
  },
  imageBorderDefault: {
    border: `0.33em solid ${colors.white80}`,
    [theme.breakpoints.only('xs')]: {
      border: `0.5vw solid ${colors.white80}`,
    },
  },
  imageContainer: {
    width: '7em',
    height: '7em',
    [theme.breakpoints.only('xl')]: {
      height: '8em',
      width: '8em',
    },
    [theme.breakpoints.only('sm')]: {
      height: '6em',
      width: '6em',
    },
    [theme.breakpoints.only('xs')]: {
      height: '9vw',
      width: '9vw',
    },
  },
}))

const ChannelChildren = ({childTags, className}) => {
  const theme = useTheme()

  const classes = useStyles()

  const dispatch = useDispatch()

  const makeOnclick = channelTag => () => dispatch(actions.pushHistory(`/channel/${channelTag}`))

  const tagset = new Set(childTags)

  const channels = useChannels().list

  const childChannels = channels.filter(({tag}) => tagset.has(tag))

  return (
    <div className={cx(classes.channelChildren, className)}>
      {
        childChannels.map(
          ({imageUrl, tag, title}) => (
            <img key={tag}
                 className={cx(
                   classes.image,
                   tag === 'lol' ? classes.imageBorderLive : classes.imageBorderDefault
                 )}
                 onClick={makeOnclick(tag)}
                 src={imageUrl} />
          )
        )
      }
    </div>
  )
}

export default ChannelChildren
