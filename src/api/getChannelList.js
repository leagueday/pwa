import { useState, useEffect } from 'react';
import { base } from '..';

export const getMyList = () => {
    const [filteredListRecords, setFilteredListRecords] = useState([])
    let result = []

    const getListData = async () => {
        await base('Channels')
            .select({
                view: 'Grid view',
            })
            .eachPage(
                 function page(records, fetchNextPage) {
                    // setAudiocast(records[0])
                    records?.forEach(item => {
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
                },
                function done(err) {
                    if (err) {
                        console.log('error from AudioScreen.jsx', err)
                        return
                    }
                }
            )
    }

    useEffect(() => {
        getListData();
    }, [])
    return filteredListRecords;
};