import React, { createContext, useState, useEffect } from 'react';
import { selectors } from '..'
import { useSelector } from 'react-redux';
export const UserStateContext = createContext();
const UserStateProvider = UserStateContext.Provider
import { base } from '../..';

function UserProfileProvider(props) {
    const activeUser = useSelector(selectors.getUser)
    const [userData, setUserData] = useState([])
    const [audiocasts, setAudiocasts] = useState([])
    const [userRecordings, setUserRecordings] = useState([])
    const [channelList, setChannelList] = useState([])
    const [creatorList, setCreatorList] = useState([])
    const [userId, setUserId] = useState('')
    const [loading, setLoading] = useState(false);
    const currentUser = useSelector(selectors.getUserData)
    // This is for live channels, isnt relevant to users but didn't want to make a whole new state provider or redux flow
    const [liveChannels, setLiveChannels] = useState({})
    const [allAudiocasts, setAllAudiocasts] = useState([])

    const getChannelAudiocasts = async () => {
        base('UserAudiocasts')
            .select({
                view: 'Grid view',
            })
            .eachPage(
                async function page(records, fetchNextPage) {
                    setAllAudiocasts(records)
                    records.forEach((record) => {
                        if (liveChannels[`${record.fields.channelTag}`]) {
                            liveChannels[`${record.fields.channelTag}`].push(record)
                        } else {
                            liveChannels[`${record.fields.channelTag}`] = [record]
                        }
                    })
                },
                function done(err) {
                    if (err) {
                        console.error(err)
                        return
                    }
                }
            )
    }

    const currentUserId = currentUser?.id

    const getData = async (idx) => {
        setLoading(true)

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

    const getUserRecordings = () => {
        base('UserAudiocasts')
            .select({
                filterByFormula: `{userId} = '${userId}'`,
                view: 'Grid view',
            })
            .eachPage(
                async function page(records, fetchNextPage) {
                    setAudiocasts(records)
                },
                function done(err) {
                    if (err) {
                        console.error(err)
                        return
                    }
                }
            )

        base('ChannelLiveData')
            .select({
                filterByFormula: `{userId} = '${userId}'`,
                view: 'Grid view',
            })
            .eachPage(
                async function page(records, fetchNextPage) {
                    setUserRecordings(records)
                },
                function done(err) {
                    if (err) {
                        console.error(err)
                        return
                    }
                }
            )
    }

    const getCreatorData = () => {
        base('UserCreatorsList')
            .select({
                filterByFormula: `{userId} = '${userId}'`,
                view: 'Grid view',
            })
            .eachPage(
                async function page(records, fetchNextPage) {
                    setCreatorList(records)
                },
                function done(err) {
                    if (err) {
                        console.error(err)
                        return
                    }
                }
            )
    }

    const getListData = () => {
        base('UserList')
            .select({
                filterByFormula: `{userId} = '${userId}'`,
                view: 'Grid view',
            })
            .eachPage(
                async function page(records, fetchNextPage) {
                    setChannelList(records)
                },
                function done(err) {
                    if (err) {
                        console.error(err)
                        return
                    }
                }
            )
    }

    const NoobTrophy = ({ classes }) => {
        return (
            <div className={classes.trophyCont}>
                <img className={classes.trophy} src="/img/noobTrophy1.png" alt="" />
                <p>
                    <span className={classes.trophyName}>Noob Award</span> <br></br>
                    <i>first stream created</i>
                </p>
            </div>
        )
    }

    const PentaTrophy = ({ classes }) => {
        return (
            <div className={classes.trophyCont}>
                <img className={classes.trophy} src="/img/noobTrophy1.png" alt="" />
                <p>
                    <span className={classes.trophyName}>Penta Cast</span> <br></br>
                    <i>5 streams created</i>
                </p>
            </div>
        )
    }

    const TitanTrophy = ({ classes }) => {
        return (
            <div className={classes.trophyCont}>
                <img className={classes.trophy} src="/img/noobTrophy1.png" alt="" />
                <p>
                    {' '}
                    <span className={classes.trophyName}>Gamer Audio Titan</span>
                    <br></br> <i>10 streams created</i>
                </p>
            </div>
        )
    }

    const refreshData = () => {
        getData();
    }

    useEffect(() => {
        getChannelAudiocasts()
        getData();
        getUserRecordings();
        getCreatorData();
        getListData();
    }, [userId])

    return (
        <UserStateProvider value={{ loading, userData, setUserData, refreshData, getData, channelList, allAudiocasts, setUserId, currentUserId, getUserRecordings, TitanTrophy, PentaTrophy, NoobTrophy, creatorList, userRecordings, audiocasts, liveChannels }}>
            {props?.children}
        </UserStateProvider>
    )
}

export default UserProfileProvider;