import React from 'react'
import cx from 'classnames'

import { makeStyles } from '@material-ui/core/styles'

import useChannels from '../api/useChannels'
import useChannelCategories from '../api/useChannelCategories'
import ChannelTilesRow from './ChannelTilesRow'

const useStyles = makeStyles({
  channelCategories: {},
})

const ChannelCategories = ({ className }) => {
  const classes = useStyles()

  const channels = useChannels().list
  const channelCategories = useChannelCategories()

  const channelsByCat = React.useMemo(() => {
    if (channelCategories.size === 0 || channels.length === 0) return []

    const channelMap = new Map(channels.map(record => [record.tag, record]))

    const result = []
    for (let [title, tagSet] of channelCategories.entries()) {
      const channels = []
      for (let tag of tagSet.values()) {
        channels.push(channelMap.get(tag))
      }
      result.push([title, channels])
    }
    return result
  }, [channels, channelCategories])

  return (
    <div className={cx(className, classes.channelCategories)}>
      {
        channelsByCat.map(
          ([title, channels]) => (
            <ChannelTilesRow id={`chan.${title}`} channels={channels} key={title} title={title} />
          )
        )
      }
    </div>
  )
}

export default ChannelCategories
