import React, { useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MyListContext } from '../../store/stateProviders/listState'
import { getMyList } from '../GetUserList'
import { actions, selectors, useLocationPathname } from '../../store'
import Item from './Item'
import PlusMinusBtn from '../CreatorTilesRow/PlusMinusBtn'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
  likeItem: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  playPause: {
    position: 'absolute',
    right: 8,
  },
}))

const isChannelSelected = (locationPathname, channelTag) => {
  const path = locationPathname ?? ''

  if (path.substr(0, 9) !== '/profile/') {
    return false
  } else {
    return path.substr(9) === channelTag
  }
}

const MyCreators = ({ skinny }) => {
  const dispatch = useDispatch()
  const locationPathname = useLocationPathname()
  const user = useSelector(selectors.getUser)
  const { creatorList } = useContext(MyListContext)
  const classes = useStyles()

  return (
    <div>
      {creatorList?.map((user, ind) => {
        const { fields } = user
        return (
          <div className={classes.likeItem} key={ind}>
            <Item
              title={fields?.username}
              imageUrl={
                fields?.image
                  ? fields?.image
                  : 'https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1214428300?k=6&m=1214428300&s=170667a&w=0&h=hMQs-822xLWFz66z3Xfd8vPog333rNFHU6Q_kc9Sues='
              }
              isSelected={isChannelSelected(
                locationPathname,
                fields?.creatorId
              )}
              onClick={() =>
                dispatch(actions.pushHistory(`/profile/${fields?.creatorId}`))
              }
            />
            <div className={classes.playPause}>
              <PlusMinusBtn
                creator={fields}
                userId={fields.creatorId}
                size={'1.5em'}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default MyCreators
