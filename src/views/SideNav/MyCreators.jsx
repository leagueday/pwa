import React from 'react'
import { useDispatch } from 'react-redux'
import useAirtable from '../../api/useAirtable';
import { actions } from '../../store';
import Item from './Item';
const MyCreators = () => {
  const { data } = useAirtable('appXoertP1WJjd4TQ', 'UserProfile')
  const dispatch = useDispatch();

  return (
    <div>
      {data?.map((user, ind) => {
          const { fields } = user
        return (
          <Item
            key={ind}
            title={fields?.name}
            imageUrl={fields?.image}
            // isSelected={isChannelSelected(
            //   locationPathname,
            //   fields?.channelTag
            // )}
            onClick={() => dispatch(actions.pushHistory(`/profile/${fields?.userId}`))}
            // skinny={skinny}
          />
        )
      })}
    </div>
  )
}

export default MyCreators