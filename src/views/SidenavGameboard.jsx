import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles'

import useGameboard from '../api/useGameboard'
import Error from './Error'
import Loading from './Loading'

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: '0.5em',
  },
  item: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    marginBottom: '0.5em',
  },
  itemImage: {
    height: '1.25em',
    marginRight: '0.5em',
  },
  itemName: {
    color: theme.palette.text.secondary,
    fontSize: '85%',
  },
}))

const Item = ({data}) => {
  const {id, name, filterKind, filterParam, imageUrl} = data

  const classes = useStyles()

  return (
    <div className={classes.item}>
      <img className={classes.itemImage} src={imageUrl} alt={name} />
      <div className={classes.itemName}>
        {name}
      </div>
    </div>
  )
}

const SidenavGameboard = () => {
  const classes = useStyles()

  const {data, error} = useGameboard()

  return error
    ? (<Error e={error} />)
    : !data
    ? (<Loading />)
    : (
      <div className={classes.container}>
        {
          data.map(
            (data) => (
              <Item key={data.id} data={data} />
            )
          )
        }
      </div>
    )
}

export default SidenavGameboard
