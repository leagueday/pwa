import React from 'react'
import { gql, useQuery } from '@apollo/client'

import { makeStyles } from '@material-ui/core/styles'

import BasicLayout from '../BasicLayout'
import Loading from '../Loading'

const Content = React.lazy(() => import('./Content'))

// test with slow import
// const Content = React.lazy(
//   () => new Promise(
//     resolve => {
//       setTimeout(
//         () => resolve(import('./Content')),
//         1500
//       )
//     }
//   )
// )

const useStyles = makeStyles({
  podcastScreenContent: {
    maxHeight: '100%',
    width: '100%',
  },
})

const PodcastScreen = ({ podcastId }) => {
  const classes = useStyles()

  const { loading, error, data } = useQuery(
    gql`
      query($id: Int!) {
        podcastFeed(id: $id) {
          imageUrl
          description
          id
          title
          episodes {
            audioUrl
            description
            title
            duration
            pubDate
          }
        }
      }
    `,
    {
      variables: {
        id: parseInt(podcastId),
      },
    }
  )

  return (
    <BasicLayout>
      {data && (
        <React.Suspense fallback={<Loading />}>
          <Content
            className={classes.podcastScreenContent}
            podcast={data.podcastFeed}
          />
        </React.Suspense>
      )}
    </BasicLayout>
  )
}

export default PodcastScreen
