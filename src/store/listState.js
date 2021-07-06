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
        let urladd = `filterByFormula={userId}=[${activeUser?.id}]&sort%5B0%5D%5Bfield%5D=liveDate&sort%5B0%5D%5Bdirection%5D=desc`
        const response = await fetch('/.netlify/functions/airtable-getprofile', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url: `${baseId}/UserList?${urladd}` }),
        })

        const data = await response.json()
        // const filteredList = data.records.map(item => {
        //     console.log('map  ', item.fields.userId.shift())
        //     // if (item.fields.userId.shift() === activeUser?.id) {
        //     //     filteredListRecords.push(item)
        //     // }
        // })

        response?.records?.map(item => {
            if (item?.fields?.userId?.shift() === activeUser?.id) {
                result.push(item)
            }
        })

        // setFilteredListRecords(result)
        const filteredUserRecords = data.records.filter((item) => item.fields.userId.shift() === activeUser?.id)
        await Promise.all(filteredUserRecords)
        setFilteredListRecords(data)
        console.log('user list ', result, filteredUserRecords)
        // setFilteredListRecords(data.records)
        // .then(response => response.json())
        // .then(async function (response) {
        //     console.log('from the hook  ',response)
        //     console.log('hello ',filteredListRecords)
        // })
        // .catch(error => {
        //     console.log('error while data fetching', error)
        // })

    }

    console.log('data from getData ', filteredListRecords)

    useEffect(() => {
        getData();
    }, [])

    const addToList = (title, tag, img) => {

        listPlaceholder.push({ fields: { channelName: title, channelTag: tag, channelImg: img } })
        setGlobalList(listPlaceholder.concat(globalList))
        console.log('add  ', globalList);

        // base('UserList').create([
        //     {
        //         "fields": {
        //             "channelName": title,
        //             "user": [
        //                 currentUserId
        //             ],
        //             "channelTag": tag,
        //             "channelImg": img
        //         }
        //     }
        // ], function (err, records) {
        //     if (err) {
        //         console.error(err);
        //         return;
        //     }
        //     records.forEach(function (record) {
        //         console.log('created new myList entry  ', record);
        //     });
        // });
    }

    // console.log('outside add ', globalList)

    const removeFromList = async (tag) => {

        const recordToDelete = userList?.filter((item) => item.fields.channelTag === tag)
        // console.log('record to delete ', recordToDelete, userList, tag)

        await Promise.all(recordToDelete)
        const id = recordToDelete?.shift()?.id

        setGlobalList(globalList?.map((item) => {
            console.log(item)
            if (item.fields.channelTag === tag) {
                console.log('inside if ', globalList.pop(item))
            }
        }))

        console.log('delete  ', globalList)

        // setGlobalList(filteredPlaceholder)/
        // console.log('deleting records  ', id)

        // base('UserList').destroy([id], function (err, deletedRecords) {
        //     if (err) {
        //         console.error(err);
        //         return;
        //     }
        //     console.log('Deleted', deletedRecords.length, 'records');
        // });
    }

    const getIsOnMyList = (title, tag) => {

        if (!globalList.concat(userList)) return false

        return !!globalList.concat(userList).find(
            (channel) => channel?.fields?.channelName === title && channel?.fields?.channelTag === tag
        )
    }

    // console.log('state from provider  ', listPlaceholder, globalList)

    return (
        <MyListProvider value={[globalList, getIsOnMyList, addToList, removeFromList, setGlobalList]}>
            {props?.children}
        </MyListProvider>
    )
}

export default ListStateProvider;