import React from 'react'
import { useSelector } from 'react-redux'

const userName = 'e6dc9a66-fb63-414b-b187-6a39aaa6583f'
const access_token = '2bGfOofUHoMPq5PtL6yb/peOp80MyN2VGsgLb5nIaREZhQ51iAtDdd4yR0pIp0bXYWWki2lcHVS'

const creatingDirectLink=()=>{
    let userName = 'e6dc9a66-fb63-414b-b187-6a39aaa6583f'
    let access_token="2bGfOofUHoMPq5PtL6yb/peOp80MyN2VGsgLb5nIaREZhQ51iAtDdd4yR0pIp0bXYWWki2lcHVS"
    let livestreamingId=channelList['liveStreamId']
  
    //call mux api to get playback url
    //let mux_playback_api = `https://api.mux.com/video/v1/live-streams/${livestreamingId}`
    let mux_playback_api = `https://api.mux.com/video/v1/live-streams/hNBi4PEaC4MTI01XM6GfP3gNCGKkp6xy3B00TsOsRJpro`
    let authString = `${userName}:${access_token}`
    let headers = new Headers();
    headers.set('Access-Control-Allow-Headers', 'Content-Type')
    headers.set('Access-Control-Allow-Origin', '*')
    headers.set('Access-Control-Allow-Methods', 'OPTIONS,POST,GET')
    headers.set('Authorization', 'Basic ' + btoa(authString))
    headers.set('Content-Type', 'application/json')
    let paramsMuxPayload = {
      method: 'GET',     
      headers: headers,
      mode: 'no-cors'
}

    fetch(mux_playback_api,paramsMuxPayload).
            then(response => response.json())
           .then(function(streamData){ 

                setStreamkey({
                  streamkey:streamData.data.stream_key
                })
                setplayback({
                  playback:streamData.data.playback_ids[0].id
                })
                setdirectLink(true)
                setCreate(true)
                setbutton(false)
                console.log("response data",playback)
            }         
    ).catch((error)=>{
       toast.error(error.type)
    })
  
  submitFormData()
}

export default creatingDirectLink
