import React, { createContext, useState, useEffect } from 'react';
import Airtable from 'airtable'
import { selectors } from '..'
import { useSelector } from 'react-redux';

export const UserStateContext = createContext();
const UserStateProvider = UserStateContext.Provider
const baseId = 'appXoertP1WJjd4TQ'
const apiKey = "keymd23kpZ12EriVi"

function UserProfileProvider(props) {
    const base = new Airtable({ apiKey }).base(baseId)
    const activeUser = useSelector(selectors.getUser)
    const [userData, setUserData] = useState([])
    const [loading, setLoading] = useState(false);

    const getData = async () => {
        setLoading(true)
        const id = activeUser?.id

        base('UserProfile').select({
            filterByFormula: `{userId} = '${id}'`,
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
        setTimeout(() => {
            getData();
        }, 1000)
    }, [activeUser])

    return (
        <UserStateProvider value={{ loading, userData, setUserData, refreshData, getData }}>
            {props?.children}
        </UserStateProvider>
    )
}

export default UserProfileProvider;