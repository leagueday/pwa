import React from 'react'
import {useDispatch} from 'react-redux'
import cx from 'classnames'

import { makeStyles, useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'

import * as colors from '../../styling/colors'
import useChannels from '../../api/useChannels'
import {actions} from '../../store'

/*
.image-container{
    width:100px;
}
.image-container img {
    width:100%;
    height:100px;
    object-fit:cover;
}
 */
const useStyles = makeStyles(theme => ({
  channelChildren: {
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
    minHeight: 0,
    overflow: 'hidden',
  },
  // child: {
  //   minWidth: 0,
  //   width: '100%',
  // },
  image: ({circleSize, borderRadius}) => ({
    cursor: 'pointer',
    // marginRight: '1em',
    // width: 'auto',
    // height: 'auto',
    // height: '100%',
    // width: '100%',
    marginLeft: '0.5em',
    width: circleSize,
    height: circleSize,
    borderRadius: borderRadius,
    objectFit: 'cover',
  }),
  imageBorderLive: {
    border: `0.33em solid ${colors.lime}`,
  },
  imageBorderDefault: {
    border: `0.33em solid ${colors.white80}`,
  },
  imageContainer: ({circleSize}) => ({
    width: circleSize,
    height: circleSize,
  }),
}))

const ChannelChildren = ({childTags, className}) => {
  const theme = useTheme()

  const smDown = useMediaQuery(theme.breakpoints.down('sm'))
  const xlUp = useMediaQuery(theme.breakpoints.up('xl'))

  let borderRadius
  let circleSize

  if (xlUp) {
    borderRadius = '4em'
    circleSize = '8em'
  } else if (smDown) {
    borderRadius = '3em'
    circleSize = '6em'
  } else {
    borderRadius = '3.5em'
    circleSize = '7em'
    // borderRadius = '5vw'
    // circleSize = '10vw'
  }

  const classes = useStyles({borderRadius, circleSize})

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
