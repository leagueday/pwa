import React from 'react'
import cx from 'classnames'

import { makeStyles } from '@material-ui/core/styles'

import useChannelCategories from '../api/useChannelCategories'
import useMyChannels from '../api/useMyChannels'
import BottomBlock from './BottomBlock'
import ChannelTiles from './ChannelTiles'

const useStyles = makeStyles({
  channelCategories: { },
})

const ChannelCategories = ({className}) => {
  const classes = useStyles()

  const myChannels = useMyChannels()
  const channelCategories = useChannelCategories()

  const channelsByCat = React.useMemo(() => {
    if (channelCategories.size === 0 || myChannels.length === 0) return []

    const channelMap = new Map(myChannels.map(record => ([record.tag, record])))

    const result = []
    for (let [title, tagSet] of channelCategories.entries()) {
      const channels = []
      for (let tag of tagSet.values()) {
        channels.push(channelMap.get(tag))
      }
      result.push([title, channels])
    }
    return result
  }, [myChannels, channelCategories])

  return (
    <div className={cx(className, classes.channelCategories)}>
      {
        channelsByCat.map(
          ([title, channels]) => (
            <BottomBlock key={title} titleRest={title}>
              <ChannelTiles id={`chan.${title}`} channels={channels} />
            </BottomBlock>
          )
        )
      }
    </div>
  )
}

export default ChannelCategories
