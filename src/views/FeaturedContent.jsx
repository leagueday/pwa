import React from 'react'
import Color from 'color'

import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'

import * as colors from '../styling/colors'
import usePodcasts from '../api/usePodcasts'

import { addScrollStyle } from './util'
import PodcastsGrid from './PodcastsGrid'

const useStyles = makeStyles(theme => ({
  featuredCategory: {
    backgroundColor: colors.blackPlum,
    marginBottom: '0.5em',
    padding: '0.5em',
  },
  featuredCategoryName: {
    color: colors.vintageTubeBright,
    fontFamily: theme.typography.nav,
    paddingBottom: '0.25em',
  },
  featuredContent: addScrollStyle({
    height: '100%',
    maxHeight: '100%',
    overflowY: 'auto',
    padding: '0.5em',
    width: '100%',
  }),
}))

const categorize = (data, categoryKey) => {
  const result = {
    categories: [],
    uncategorized: [],
  }

  if (!data) return result

  const categorySet = new Set()

  data.forEach(
    record => {
      const category = record[categoryKey]

      if (!category) {
        result.uncategorized.push(record)
      }
      else {
        if (categorySet.has(category)) {
          result[category].push(record)
        }
        else {
          categorySet.add(category)
          result[category] = [record]
        }
      }
    }
  )

  result.categories = Array.from(categorySet.keys())

  return result
}

const FeaturedCategory = ({cat, members}) => {
  const classes = useStyles()

  return (
    <Card className={classes.featuredCategory}>
      <div className={classes.featuredCategoryName}>{cat}</div>
      <PodcastsGrid data={members}/>
    </Card>
  )
}

const FeaturedContent = () => {
  const classes = useStyles()

  const {filteredData} = usePodcasts()

  const catData = categorize(filteredData, 'displayCategory')

  return (
    <Card className={classes.featuredContent}>
      {
        catData.categories.map(
          cat => (<FeaturedCategory key={cat} cat={cat} members={catData[cat]} />)
        )
      }
      {
        catData.uncategorized && (<FeaturedCategory cat="Uncategorized" members={catData.uncategorized} />)
      }
    </Card>
  )
}

export default FeaturedContent
