import React, { createContext, useContext, useState, useEffect } from 'react';
import Airtable from 'airtable'
import { getMyList } from '../api/getUserList';
import useMyList from '../api/useMyList';
import useAirTable from '../api/useAirtable';
import { selectors } from '../store'
import { useSelector } from 'react-redux';

export const MyListContext = createContext();
const MyListProvider = MyListContext.Provider;
const baseId = 'appXoertP1WJjd4TQ'
const apiKey = AIRTABLE_API_KEY

function ListStateProvider(props) {

    const base = new Airtable({ apiKey }).base(baseId)
    let listPlaceholder = [];
    const activeUser = useSelector(selectors.getUser)
    const { data } = useAirTable(baseId, 'UserProfile');
    const userList = getMyList();
    const [globalList, setGlobalList] = useState([]);
    const currentUser = data?.filter((user) => user?.fields?.userId === activeUser?.id)
    const currentUserId = currentUser?.shift()?.id
    const [filteredListRecords, setFilteredListRecords] = useState([])
    let result = []

    const getData = async () => {
        let urladd = `filterByFormula=[userId]=${activeUser?.id}`

        const response = await fetch('/.netlify/functions/airtable-getprofile', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url: `${baseId}/UserList?${urladd}` }),
        })

        const data = await response.json()

        response?.records?.map(item => {
            if (item?.fields?.userId?.shift() === activeUser?.id) {
                result.push(item)
            }
        })

        const filteredUserRecords = data.records.filter((item) => item.fields.userId.shift() === activeUser?.id)
        await Promise.all(filteredUserRecords)
        setGlobalList(filteredUserRecords)
        console.log('user list ', result, globalList)
    }

    console.log('data from getData ', globalList)
    useEffect(() => {
        getData();
    }, [activeUser])

    const addToList = (title, tag, img) => {
        listPlaceholder.push({ fields: { channelName: title, channelTag: tag, channelImg: img } })
        setGlobalList(listPlaceholder.concat(globalList))

        base('UserList').create([
            {
                "fields": {
                    "channelName": title,
                    "user": [
                        currentUserId
                    ],
                    "channelTag": tag,
                    "channelImg": img
                }
            }
        ], function (err, records) {
            if (err) {
                console.error(err);
                return;
            }
            records.forEach(function (record) {
                console.log('created new myList entry  ', record);
                getData();
            });
        });
    }


    const removeFromList = async (tag) => {

        const recordToDelete = globalList?.filter((item) => item.fields.channelTag === tag)

        await Promise.all(recordToDelete)
        const id = recordToDelete?.shift()?.id

        const newList = globalList?.filter((item) => item.fields.channelTag !== tag)

        setGlobalList(newList)
        console.log('delete  ', newList)

        base('UserList').destroy([id], function (err, deletedRecords) {
            if (err) {
                console.error(err);
                return;
            }
            console.log('Deleted', deletedRecords.length, 'records');
        });

    }

    console.log('delete from function body  ', filteredListRecords)

    const getIsOnMyList = (title, tag) => {

        if (!filteredListRecords.concat(globalList)) return false

        return !!filteredListRecords.concat(globalList).find(
            (channel) => channel?.fields?.channelName === title && channel?.fields?.channelTag === tag
        )
    }

    return (
        <MyListProvider value={[globalList, getIsOnMyList, addToList, removeFromList, setGlobalList]}>
            {props?.children}
        </MyListProvider>
    )
}

export default ListStateProvider;