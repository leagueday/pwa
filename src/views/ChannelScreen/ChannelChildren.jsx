import React from 'react'
import {useDispatch} from 'react-redux'
import cx from 'classnames'

import { makeStyles } from '@material-ui/core/styles'

import * as colors from '../../styling/colors'
import useMyChannels from '../../api/useMyChannels'
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
    // alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    minHeight: 0,
    overflow: 'hidden',
  },
  // child: {
  //   minWidth: 0,
  //   width: '100%',
  // },
  image: {
    cursor: 'pointer',
    // marginRight: '1em',
    // width: 'auto',
    // height: 'auto',
    // height: '100%',
    // width: '100%',
    marginLeft: '0.5em',
    width: '10vw',
    height: '10vw',
    borderRadius: '5vw',
    objectFit: 'cover',
  },
  imageBorderLive: {
    border: `0.33em solid ${colors.lime}`,
  },
  imageBorderDefault: {
    border: `0.33em solid ${colors.white80}`,
  },
  imageContainer: {
    width: '10vw',
    height: '10vw',
  },
}))

const ChannelChildren = ({childTags, className}) => {
  const classes = useStyles()

  const dispatch = useDispatch()

  const makeOnclick = channelTag => () => dispatch(actions.pushHistory(`/channel/${channelTag}`))

  const tagset = new Set(childTags)

  const channels = useMyChannels()

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
