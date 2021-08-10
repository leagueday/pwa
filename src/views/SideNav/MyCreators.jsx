import React, { useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MyListContext } from '../../store/stateProviders/listState'
import { getMyList } from '../../api/getUserList'
import { actions, selectors } from '../../store'
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

const MyCreators = () => {
  const dispatch = useDispatch()
  const user = useSelector(selectors.getUser)
  const { creatorList: cl } = getMyList();
  const { creatorList, setCreatorList } = useContext(MyListContext)
  const classes = useStyles()

  useEffect(() => {
    if (user && creatorList.length === 0 && cl.length > 0) {
      console.log('set creator list')
      setCreatorList(cl)
    } 
  }, [cl])

  return (
    <div>
      {creatorList?.map((user, ind) => {
        const { fields } = user
        return (
          <div className={classes.likeItem}>
            <Item
              key={ind}
              title={fields?.name}
              imageUrl={
                fields?.image
                  ? fields?.image
                  : 'https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1214428300?k=6&m=1214428300&s=170667a&w=0&h=hMQs-822xLWFz66z3Xfd8vPog333rNFHU6Q_kc9Sues='
              }
              // isSelected={isChannelSelected(
              //   locationPathname,
              //   fields?.tag
              // )}
              onClick={() =>
                dispatch(actions.pushHistory(`/profile/${fields?.creatorId}`))
              }
              // skinny={skinny}
            />
            <div className={classes.playPause}>
              <PlusMinusBtn creator={fields} userId={fields.creatorId} size={'1.5em'} />
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default MyCreators
