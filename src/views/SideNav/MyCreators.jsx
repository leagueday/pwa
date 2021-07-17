import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { MyListContext } from '../../store/stateProviders/listState';
import { actions } from '../../store';
import Item from './Item';

const MyCreators = () => {
  const dispatch = useDispatch()
  const { creatorList } = useContext(MyListContext)
  
  return (
    <div>
      {creatorList?.map((user, ind) => {
        const { fields } = user
        return (
          <Item
            key={ind}
            title={fields?.creatorName}
            imageUrl={fields?.creatorImg ? fields?.creatorImg : 'https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1214428300?k=6&m=1214428300&s=170667a&w=0&h=hMQs-822xLWFz66z3Xfd8vPog333rNFHU6Q_kc9Sues=' }
            // isSelected={isChannelSelected(
            //   locationPathname,
            //   fields?.channelTag
            // )}
            onClick={() =>
              dispatch(actions.pushHistory(`/profile/${fields?.creatorId}`))
            }
            // skinny={skinny}
          />
        )
      })}
    </div>
  )
}

export default MyCreators;