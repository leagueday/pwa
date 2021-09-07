import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { selectors } from '..'
import { useSelector } from 'react-redux';
export const ChatStateContext = createContext();
const FriendsStateProvider = ChatStateContext.Provider

function ChatStateProvider(props) {
    const [message, setMessage] = useState('')
    const [allChats, setAllChats] = useState([])
    const userData = useSelector(selectors.getUserData);
    const user = useSelector(selectors.getUser);

    const sendChat = (roomId, socket) => {
        // e.preventDefault()
        console.log('called send ')
        axios
            .post('https://leagueday-api.herokuapp.com/chats/create', {
                userId: user.id,
                roomId: roomId,
                message: message,
                image: userData?.fields?.image
                    ? userData?.fields?.image
                    : 'https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1214428300?k=6&m=1214428300&s=170667a&w=0&h=hMQs-822xLWFz66z3Xfd8vPog333rNFHU6Q_kc9Sues=',
            })
            .then(res => {
                socket.emit('new_chat', { message })
                setMessage('')
                console.log('sent message ', res)
            })
            .catch(err => {
                console.log('message send error ', err)
            })
    }

    const getMessages = id => {
        axios
            .post('https://leagueday-api.herokuapp.com/chats/list', {
                roomId: id,
            })
            .then(res => {
                setAllChats(res.data.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <FriendsStateProvider value={{ message, setMessage, allChats, sendChat, getMessages }}>
            {props?.children}
        </FriendsStateProvider>
    )
}

export default ChatStateProvider