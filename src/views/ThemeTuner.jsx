import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import NativeSelect from '@material-ui/core/NativeSelect'

import * as actions from '../store/actions'
import * as constants from '../store/constants'
import * as selectors from '../store/selectors'

const useStyles = makeStyles({
  card: {
    display: 'flex',
    flexDirection: 'row',
  },
})

const ThemeTuner = () => {
  const classes = useStyles()

  const dispatch = useDispatch()

  const theme = useSelector(selectors.getTheme)

  const onSelectTheme = ev => {
    const val = ev?.target?.value
    console.log(ev, val)

    if (val) {
      dispatch(actions.setTheme(val))
    }
  }

  return (
    <Card className={classes.card}>
      <NativeSelect onChange={onSelectTheme} value={theme}>
        <option value={constants.UI_THEME_GENERIC}>generic</option>
        <option value={constants.UI_THEME_SPECIFIC}>specific</option>
      </NativeSelect>
    </Card>
  )
}

export default ThemeTuner
