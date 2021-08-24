import React, {useState, useEffect} from 'react'
import AudioCard from './ChannelScreen/AudioCard';

const Live = ({ playbackUrl }) => {


    const muxliveData = () => {
          fetch('/.netlify/functions/mux-proxy', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url: `video/v1/live-streams/${livestreamid}` }),
          })
            .then(response => response.json())
            .then(function (response) {
              console.log('live stream from mux ', response)
              if (response.data.status == 'active') {
                setliveStatus(1)
              }
            })
            .catch(error => {
              console.log('error while data fetching', error.type)
            })
        } else {
          setliveStatus(0)
        }
      }

    return (
        <div>
            
        </div>
    )
}

export default Live
