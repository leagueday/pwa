import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { selectors } from '../store'

export const getMyList = () => {
    const user = useSelector(selectors.getUser)
    const [filteredListRecords, setFilteredListRecords] = useState([])
    const [creatorList, setCreatorList] = useState([]);

    let result = []
    let result2 = []

    const getListData = async () => {
        const baseId = 'appXoertP1WJjd4TQ'
        await fetch('/.netlify/functions/airtable-getprofile', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url: `${baseId}/UserList` }),
        })
            .then(response => response.json())
            .then(function (response) {
                response?.records?.map(item => {
                    if (item?.fields?.userId?.shift() === user?.id) {
                        result.push(item)
                    }
                })
                setFilteredListRecords(result)
            })
            .catch(error => {
                console.log('error while data fetching', error)
            })
    }

    const getCreatorData = async () => {
        const baseId = 'appXoertP1WJjd4TQ'
        await fetch('/.netlify/functions/airtable-getprofile', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url: `${baseId}/UserCreatorsList` }),
        })
            .then(response => response.json())
            .then(function (response) {
                
                response?.records?.map(item => {
                    if (item?.fields?.userId?.shift() === user?.id) {
                        result2.push(item)
                    }
                })
                setCreatorList(result2)
            })
            .catch(error => {
                console.log('error while data fetching', error)
            })
    }

    useEffect(() => {
        getListData();
        getCreatorData()
    }, [])

    return {filteredListRecords, creatorList};

};