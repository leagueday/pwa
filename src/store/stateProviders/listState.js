import React, { createContext, useState, useEffect } from 'react';
import Airtable from 'airtable'
import useAirTable from '../../api/useAirtable';
import { selectors } from '..'
import { useSelector } from 'react-redux';

export const MyListContext = createContext();
const MyListProvider = MyListContext.Provider;
const baseId = 'appXoertP1WJjd4TQ'
const apiKey = "keymd23kpZ12EriVi"

function ListStateProvider(props) {

    const base = new Airtable({ apiKey }).base(baseId)
    const [listPlaceholder, setListPlaceholder] = useState([]);
    const activeUser = useSelector(selectors.getUser)
    const { data } = useAirTable(baseId, 'UserProfile');
    const [globalList, setGlobalList] = useState([]);
    const currentUser = data?.filter((user) => user?.fields?.userId === activeUser?.id)
    const currentUserId = currentUser?.shift()?.id
    const [disabled, setDisabled] = useState(false);
    const id = activeUser?.id
    let result = []

    const getData = async () => {
        base('UserList').select({
            filterByFormula: `{userId} = '${id}'`,
            view: "Grid view"
        }).eachPage(async function page(records, fetchNextPage) {
            setGlobalList(records)

        }, function done(err) {
            if (err) { console.error(err); return; }
        });
    }

    useEffect(() => {
        getData();
    }, [activeUser])

    const addToList = async (title, tag, img) => {

        setDisabled(true)

        setTimeout(() => (setDisabled(false)), 500)

        if (globalList.includes({ fields: { channelName: title, channelTag: tag, channelImg: img } })) {
            return
        } else {
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

        result.push({ fields: { channelName: title, channelTag: tag, channelImg: img } })
        setGlobalList(result.concat(globalList))
    }


    const removeFromList = async (tag) => {
        setDisabled(true)

        setTimeout(() => (setDisabled(false)), 500)

        const recordToDelete = globalList?.filter((item) => item.fields.channelTag === tag)
        const newList = globalList?.filter((item) => item.fields.channelTag !== tag)
        const newChannels = listPlaceholder?.filter((item) => item.fields.channelTag !== tag)
        setGlobalList(newList)

        setListPlaceholder(newChannels)

        await Promise.all(recordToDelete)
        const id = recordToDelete?.shift()?.id
        base('UserList').destroy([id], function (err, deletedRecords) {
            if (err) {
                console.error(err);
                return;
            }
            console.log('Deleted', deletedRecords.length, 'records');
        });
    }

    const getIsOnMyList = (title, tag) => {

        if (!globalList) return false

        return !!globalList?.find(

            (channel) => channel?.fields?.channelName === title && channel?.fields?.channelTag === tag
        )
    }

    return (
        <MyListProvider value={{disabled, listPlaceholder, setListPlaceholder, globalList, getIsOnMyList, addToList, removeFromList, setGlobalList}}>
            {props?.children}
        </MyListProvider>
    )
}

export default ListStateProvider;