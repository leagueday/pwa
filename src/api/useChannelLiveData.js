import React from 'react'

import useAirtable from './useAirtable'

const base = 'appXoertP1WJjd4TQ'
const tablename = 'ChannelLiveData'

const getLiveData = async (channelTag = null) => {

    const { data } = await useAirTable('appXoertP1WJjd4TQ', 'ChannelLiveData')

    const C = data?.filter((record) => record?.fields?.channelTag === 'lol');

    return lol;
}
