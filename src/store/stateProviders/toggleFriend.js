import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { selectors } from '..'
import { useSelector } from 'react-redux';
export const FriendsStateContext = createContext();
const FriendsStateProvider = FriendsStateContext.Provider

function FriendsListProvider(props) {
    const user = useSelector(selectors.getUser);
    const [selectedFriend, setSelectedFriend] = useState({})

    const sendRequest = (userId) => {
        axios
            .post('https://leagueday-api.herokuapp.com/friends/invite', {
                userId: user.id,
                friendId: userId,
            })
            .then(res => {
                console.log('invited friend ', res)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const acceptFriendReq = id => {
        axios
            .post('https://leagueday-api.herokuapp.com/friends/accept', {
                id,
            })
            .then(res => {

                console.log('accepted friend ', res)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const declineFriendReq = id => {
        axios
            .post('https://leagueday-api.herokuapp.com/friends/decline', {
                id,
            })
            .then(res => {
                console.log('declined friend ', res)
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <FriendsStateProvider value={{ acceptFriendReq, sendRequest, declineFriendReq, selectedFriend, setSelectedFriend }}>
            {props?.children}
        </FriendsStateProvider>
    )
}

export default FriendsListProvider;