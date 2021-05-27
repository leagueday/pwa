import React from 'react'
import cx from 'classnames'

import { gql, useQuery } from '@apollo/client'

import { makeStyles } from '@material-ui/core/styles'

import ChannelTilesRow from './ChannelTilesRow'
import Loading from './Loading'

const useStyles = makeStyles({
  channelCategories: {},
})

const ChannelCategories = ({ className }) => {
  const classes = useStyles()

  // const channels = useChannels().list
  // const channelCategories = useChannelCategories()

  // const channelsByCat = React.useMemo(() => {
  //   if (channelCategories.size === 0 || channels.length === 0) return []

  //   const channelMap = new Map(channels.map(record => [record.tag, record]))

  //   const result = []
  //   for (let [title, tagSet] of channelCategories.entries()) {
  //     const channels = []
  //     for (let tag of tagSet.values()) {
  //       channels.push(channelMap.get(tag))
  //     }
  //     result.push([title, channels])
  //   }
  //   return result
  // }, [channels, channelCategories])

  const { loading, error, data } = useQuery(gql`
    query {
      categories {
        title
        channels {
          imageUrl
          title
          slug
        }
      }
    }
  `)

  if (loading) return <Loading />
  if (error) return <p>{JSON.stringify(error)}</p>

  return (
    <div className={cx(className, classes.channelCategories)}>
      {data?.categories?.map(({ title, channels }) => (
        <ChannelTilesRow
          id={`chan.${title}`}
          channels={channels}
          key={title}
          title={title}
        />
      ))}
    </div>
  )
}

export default ChannelCategories
