import React, { createContext, useState, useEffect } from 'react';
import Airtable from 'airtable'
import { selectors } from '..'
import { useSelector } from 'react-redux';
import useAirtable from '../../api/useAirtable';
export const UserStateContext = createContext();
const UserStateProvider = UserStateContext.Provider
const baseId = 'appXoertP1WJjd4TQ'
const apiKey = "keymd23kpZ12EriVi"

function UserProfileProvider(props) {
    const base = new Airtable({ apiKey }).base(baseId)
    const activeUser = useSelector(selectors.getUser)
    const userProfile = useSelector(selectors.getUserData)
    const [userData, setUserData] = useState([])
    const [userId, setUserId] = useState('')
    const [loading, setLoading] = useState(false);
    const { data } = useAirtable(baseId, 'UserProfile')

    const currentUser = data?.filter(
        user => user?.fields?.userId === activeUser?.id
    )

    const currentUserId = currentUser?.shift()?.id

    const getData = async (idx) => {
        setLoading(true)
        const id = activeUser?.id

        base('UserProfile').select({
            filterByFormula: `{userId} = '${userId}'`,
            view: "Grid view"
        }).eachPage(async function page(records, fetchNextPage) {
            setUserData(records.shift())
        }, function done(err) {
            if (err) { console.error(err); return; }
        });
        setLoading(false)
    }

    const refreshData = () => {
        getData();
    }

    useEffect(() => {
        getData();
    }, [userId])



    return (
        <UserStateProvider value={{ loading, userData, setUserData, refreshData, getData, setUserId, currentUserId }}>
            {props?.children}
        </UserStateProvider>
    )
}

export default UserProfileProvider;