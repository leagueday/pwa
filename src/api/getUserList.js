import { useState, useEffect } from 'react';
import Airtable from 'airtable'
import useSWR, { cache as swrCache } from 'swr'
import * as analytics from '../analytics'
import { useSelector } from 'react-redux'
import { selectors } from '../store'

/*
RATE LIMITS
The API is limited to 5 requests per second per base. If you exceed this rate, you will receive a 429 status code and
will need to wait 30 seconds before subsequent requests will succeed.

The official JavaScript client has built-in retry logic.

If you anticipate a higher read volume, we recommend using a caching proxy. This rate limit is the same for all plans
and increased limits are not currently available.
*/

export const getMyList = () => {
    const user = useSelector(selectors.getUser)
    const [filteredListRecords, setFilteredListRecords] = useState([])
    let result = []

    const getListData = async () => {
        const baseId = 'appXoertP1WJjd4TQ'
        await fetch('/.netlify/functions/airtable-getprofile', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url: `${baseId}/Channels` }),
        })
            .then(response => response.json())
            .then(function (response) {
                response?.records?.forEach(item => {
                    result.push({
                        value: item.fields.tag,
                        label: item.fields.title,
                    })
                })
                setFilteredListRecords(result.sort((a, b) => {
                    let fa = a?.value?.toLowerCase(),
                        fb = b?.value?.toLowerCase();

                    if (fa < fb) {
                        return -1;
                    }
                    if (fa > fb) {
                        return 1;
                    }
                    return 0;
                }))

            })
            .catch(error => {
                console.log('error while data fetching', error)
            })
    }

    useEffect(() => {
        getListData();
    }, [])
    return filteredListRecords;
};