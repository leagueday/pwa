import React from 'react'
import {useDispatch} from 'react-redux'
import cx from 'classnames'

import { makeStyles } from '@material-ui/core/styles'

import useMyChannels from '../../api/useMyChannels'
import {actions} from '../../store'

const useStyles = makeStyles(theme => ({
  channelChildren: {
    // alignItems: 'center',
    backgroundColor: 'yellow',
    display: 'flex',
    flexDirection: 'row',
    height: '20%',
  },
  // child: {
  //   minWidth: 0,
  //   width: '100%',
  // },
  image: {
    cursor: 'pointer',
    marginRight: '1em',
    width: 'auto',
    objectFit: 'scale-down',
    height: 'auto',
  },
}))

const ChannelChildren = ({childTags, className}) => {
  const classes = useStyles()

  const dispatch = useDispatch()

  const makeOnclick = channelTag => () => dispatch(actions.pushHistory(`/channel/${channelTag}`))

  console.log(JSON.stringify(childTags, null, 2))

  const tagset = new Set(childTags)

  const channels = useMyChannels()

  const childChannels = channels.filter(({tag}) => tagset.has(tag))

  return (
    <div className={cx(classes.channelChildren, className)}>
      {
        childChannels.map(
          ({imageUrl, tag, title}) => (
            <img key={tag} className={classes.image} onClick={makeOnclick(tag)} src={imageUrl} />
          )
        )
      }
    </div>
  )
}

export default ChannelChildren
