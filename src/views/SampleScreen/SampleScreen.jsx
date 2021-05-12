c

const ChannelCategories = React.lazy(() => import('../ChannelCategories'))

const primaryColor = colors.magenta

const useStyles = makeStyles(theme => ({
  channelCategories: {
    marginTop: '0.5em',
  },
  homeContent: ({ primaryColor }) =>
    addScrollStyle(
      primaryColor,
      theme
    )({
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
      height: '100%',
      overflow: 'auto',
      padding: '0.5em 0.5em 0 0.5em',
      width: '100%',
    }),
  podcastTiles: {
    height: '100%',
    minHeight: 0,
  },
  primaryStripe: ({ primaryColor }) => ({
    backgroundColor: primaryColor,
    height: '0.25em',
    width: '100%',
  }),
  titleBar: {
    marginBottom: '0.25em',
  },
}))

const SampleScreen = () => {
  const facetedPodcasts = useFacets('Home')

  const classes = useStyles({ primaryColor })

  const user = useSelector(selectors.getUser)
  const userName = user?.user_metadata?.full_name

  return (
    <BasicLayout home>
      <div className={classes.homeContent}>
        <TitleBar
          className={classes.titleBar}
          primaryColor={primaryColor}
          text={userName ? `Welcome back, ${userName}!` : 'Home'}
        />
        <div className={classes.primaryStripe} />
        <div className={classes.podcastTiles}>
          Helloo
        </div>
      </div>
    </BasicLayout>
  )
}

export default SampleScreen
