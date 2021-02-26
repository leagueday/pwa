import React from 'react'
import cx from 'classnames'

import {makeStyles} from '@material-ui/core/styles'

import * as colors from '../../styling/colors'

const useStyles = makeStyles({
  image: {
    cursor: 'pointer',
    height: '1.5em',
    marginRight: '0.5em',
    width: '1.5em',
  },
  imageBox: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
  item: {
    alignItems: 'stretch',
    display: 'flex',
    flexDirection: 'row',
    height: '2em',
    marginBottom: '0.5em',
    userSelect: 'none',
  },
  itemSelected: {
    backgroundColor: colors.charcoal,
  },
  title: {
    cursor: 'pointer',
  },
  titleBox: {
    alignItems: 'center',
    borderRadius: '1em',
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    paddingLeft: '0.5em',
    paddingRight: '0.5em',
  },
})

const Item = ({ title,
                imageClass,
                imageUrl,
                isSelected,
                onClick,
              }) => {
  const classes = useStyles()

  return (
    <div className={classes.item} onClick={onClick}>
      <div className={classes.imageBox}>
        <img className={cx(classes.image, imageClass)} src={imageUrl} />
      </div>
      <div className={cx(classes.titleBox, {[classes.itemSelected]: isSelected})}>
        <div className={classes.title}>
          {title}
        </div>
      </div>
    </div>
  )
}

export default Item
