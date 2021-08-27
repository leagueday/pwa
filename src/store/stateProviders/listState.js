import React, { createContext, useState, useEffect } from 'react';
import Airtable from 'airtable'
import useAirTable from '../../api/useAirtable';
import { selectors, actions } from '..'
import { useSelector, useDispatch } from 'react-redux';

export const MyListContext = createContext();
const MyListProvider = MyListContext.Provider;
const baseId = 'appXoertP1WJjd4TQ'
const apiKey = "keymd23kpZ12EriVi"
const base = new Airtable({ apiKey }).base(baseId)

function ListStateProvider(props) {
    const dispatch = useDispatch();
    const activeUser = useSelector(selectors.getUser);
    const channelList = useSelector(selectors.getMyChannels);
    const creatorsList = useSelector(selectors.getMyCreators);
    const { data } = useAirTable(baseId, 'UserProfile');
    const [globalList, setGlobalList] = useState([]);
    const currentUser = data?.filter((user) => user?.fields?.userId === activeUser?.id)
    const currentUserId = currentUser?.shift()?.id
    const [disabled, setDisabled] = useState(false);
    const [creatorList, setCreatorList] = useState([])
    const id = activeUser?.id
    let result = []
    let creators = []
    // CHANNEL LIST

    const getData = () => {
        base('UserList').select({
            filterByFormula: `{userId} = '${activeUser?.id}'`,
            view: "Grid view"
        }).eachPage(async function page(records, fetchNextPage) {
            setGlobalList(records)
            if (records === undefined) {
                console.log('EMPTY LIST')
            }
        }, function done(err) {
            if (err) { console.error(err); return; }
        });
        // setGlobalList(channelList)
    }

    const addToList = async (title, tag, img) => {

        setDisabled(true)

        setTimeout(() => (setDisabled(false)), 500)

        if (globalList.includes({ fields: { title: title, tag: tag, channelImg: img } })) {
            return
        } else {
            base('UserList').create([
                {
                    "fields": {
                        "title": title,
                        "user": [
                            currentUserId
                        ],
                        "tag": tag,
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
        // dispatch(actions.addToMyList(title, tag, img))
        result.push({ fields: { title: title, tag: tag, channelImg: img } })
        setGlobalList(result.concat(globalList))
    }

    const removeFromList = async (tag) => {
        setDisabled(true)

        setTimeout(() => (setDisabled(false)), 500)

        const recordToDelete = channelList?.filter((item) => item.fields.tag === tag)
        const newList = channelList?.filter((item) => item.fields.tag !== tag)
        setGlobalList(newList)

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

            (channel) => channel?.fields?.title === title && channel?.fields?.tag === tag
        )
    }

    // CREATOR LIST

    const getCreatorData = () => {
        base('UserCreatorsList').select({
            filterByFormula: `{userId} = '${id}'`,
            view: "Grid view"
        }).eachPage(async function page(records, fetchNextPage) {
            setCreatorList(records)
        }, function done(err) {
            if (err) { console.error(err); return; }
        });
    }
    // console.log(creatorList)

    const addToCreatorList = async (name, id, img) => {

        setDisabled(true)

        setTimeout(() => (setDisabled(false)), 500)

        base('UserCreatorsList').create([
            {
                "fields": {
                    "name": name,
                    "user": [
                        currentUserId
                    ],
                    "creatorId": id,
                    "image": img
                }
            }
        ], function (err, records) {
            if (err) {
                console.error(err);
                return;
            }
            records.forEach(function (record) {
                console.log('created new myList entry  ', record);
                getCreatorData();
            });
        });

        creators.push({ fields: { name: name, creatorId: id, image: img } })
        setCreatorList(creators.concat(creatorList))
    }

    const removeFromCreatorList = async (id) => {
        setDisabled(true)

        setTimeout(() => (setDisabled(false)), 500)

        const recordToDelete = creatorList?.filter((item) => item.fields.creatorId === id)
        const newList = creatorList?.filter((item) => item.fields.creatorId !== id)
        setCreatorList(newList)

        await Promise.all(recordToDelete)
        const creatorId = recordToDelete?.shift()?.id
        base('UserCreatorsList').destroy([creatorId], function (err, deletedRecords) {
            if (err) {
                console.error(err);
                return;
            }
            console.log('Deleted', deletedRecords.length, 'records');
        });
    }

    const isOnCreatorsList = (name, id) => {

        if (!creatorList) return false

        return !!creatorList?.find(

            (creator) => creator?.fields?.name === name && creator?.fields?.creatorId === id
        )
    }

    useEffect(() => {
        if (activeUser) {
            getData();
            getCreatorData();
        }
    }, [activeUser, channelList])

    return (
        <MyListProvider value={{ disabled, globalList, setGlobalList, getIsOnMyList, addToList, removeFromList, setGlobalList, creatorList, setCreatorList, isOnCreatorsList, addToCreatorList, removeFromCreatorList }}>
            {props?.children}
        </MyListProvider>
    )
}

export default ListStateProvider;