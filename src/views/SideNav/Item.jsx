import React from 'react'
import cx from 'classnames'

import {makeStyles} from '@material-ui/core/styles'

import * as colors from '../../styling/colors'

const useStyles = makeStyles({
  image: ({skinny}) => ({
    cursor: 'pointer',
    height: 'auto',
    width: skinny ? 'max(min(2.8vw, 2.8em), 1.8em)' : 'min(2vw, 2em)',
  }),
  imageBox: ({skinny}) => ({
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: skinny ? 'center' : 'flex-start',
    width: skinny ? '100%' : null,
  }),
  item: ({skinny}) => ({
    alignItems: 'stretch',
    display: 'flex',
    flexDirection: 'row',
    height: skinny ? 'max(min(3vw, 3em), 2em)' : 'min(2vw, 2em)',
    overflow: 'hidden',
    marginBottom: 'min(0.25em, 0.25vw)',
    userSelect: 'none',
  }),
  itemSelected: {
    backgroundColor: colors.charcoal,
  },
  title: {
    cursor: 'pointer',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    width: '100%',
    whiteSpace: 'nowrap',
  },
  titleBox: {
    alignItems: 'center',
    borderRadius: '1em',
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    overflow: 'hidden',
    paddingLeft: '0.5em',
    paddingRight: '0.5em',
    width: '100%',
  },
})

const Item = ({ title,
                imageClass,
                imageUrl,
                isSelected,
                onClick,
                skinny,
              }) => {
  const classes = useStyles({skinny})

  const fat = !skinny

  return (
    <div className={classes.item} onClick={onClick}>
      <div className={classes.imageBox}>
        <img className={cx(classes.image, imageClass)} src={imageUrl} />
      </div>
      {
        fat && (
          <div className={cx(classes.titleBox, {[classes.itemSelected]: isSelected})}>
            <div className={classes.title}>
              {title}
            </div>
          </div>
        )
      }
    </div>
  )
}

export default Item
