import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card'

import useGameboard from '../api/useGameboard'
import Error from './Error'
import Loading from './Loading'

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  item: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    marginBottom: '0.5em',
  },
  itemImage: {
    height: '1.5em',
    marginRight: '0.5em',
  },
  itemName: {
    fontSize: '90%',
  },
}))

const SidenavGameboard_Item = ({data}) => {
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
      <Card className={classes.container}>
        {
          data.map(
            (data) => (
              <SidenavGameboard_Item key={data.id} data={data} />
            )
          )
        }
      </Card>
    )
}

export default SidenavGameboard
