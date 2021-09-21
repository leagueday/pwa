import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { selectors } from '..'
import { useSelector } from 'react-redux';
export const ChatStateContext = createContext();
const FriendsStateProvider = ChatStateContext.Provider

function ChatStateProvider(props) {
    const [message, setMessage] = useState()
    const [allChatsByRoom, setAllChatsByRoom] = useState([])
    const [newChats, setNewChats] = useState([])
    const userData = useSelector(selectors.getUserData);
    const user = useSelector(selectors.getUser);

    const sendChat = (roomId, socket) => {
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

    const getMessagesByRoom = id => {
        axios
            .post('https://leagueday-api.herokuapp.com/chats/list', {
                roomId: id,
            })
            .then(res => {
                setAllChatsByRoom(res.data.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const getAllMessages = () => {
        axios
            .post('https://leagueday-api.herokuapp.com/chats/all', {
                userId: user.id,
            })
            .then(res => {
                console.log('all chats ', res.data.data.filter(chat => chat.authorId !== user.id && chat.read === false))
                setNewChats(res.data.data.filter(chat => chat.authorId !== user.id && chat.read === false))
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        if (user) {
            getAllMessages()
        }
    }, [user])

    return (
        <FriendsStateProvider value={{ message, setMessage, allChatsByRoom, sendChat, getMessagesByRoom, getAllMessages, newChats }}>
            {props?.children}
        </FriendsStateProvider>
    )
}

export default ChatStateProvider