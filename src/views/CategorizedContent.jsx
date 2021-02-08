import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'

import * as colors from '../styling/colors'
import usePodcasts from '../api/usePodcasts'

import { addScrollStyle } from './util'
import PodcastsGrid from './PodcastsGrid'

const useStyles = makeStyles(theme => ({
  displayCategory: {
    backgroundColor: colors.blackPlum,
    marginBottom: '0.5em',
    padding: '0.5em',
    userSelect: 'none',
  },
  displayCategoryContent: addScrollStyle({
    height: '100%',
    maxHeight: '100%',
    overflowY: 'auto',
    padding: '0.5em',
    width: '100%',
  }),
  displayCategoryName: {
    color: colors.vintageTubeBright,
    fontFamily: theme.typography.nav,
    paddingBottom: '0.25em',
  },
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

const Category = ({cat, members}) => {
  const classes = useStyles()

  return (
    <Card className={classes.displayCategory}>
      { cat && (<div className={classes.displayCategoryName}>{cat}</div>) }
      <PodcastsGrid data={members}/>
    </Card>
  )
}

const CategorizedContent = ({categoryFieldname, rankFieldname}) => {
  const classes = useStyles()

  const {filteredData} = usePodcasts(rankFieldname)

  const catData = categorize(filteredData, categoryFieldname)

  const hasUncat = catData.uncategorized && catData.uncategorized.length > 0

  return (
    <Card className={classes.displayCategoryContent}>
      {
        catData.categories.map(
          cat => (<Category key={cat} cat={cat} members={catData[cat]} />)
        )
      }
      {
        hasUncat && (<Category members={catData.uncategorized} />)
      }
    </Card>
  )
}

CategorizedContent.defaultProps = {
  categoryFieldname: 'displayCategory',
  rankFieldname: 'displayRank',
}

export default CategorizedContent
