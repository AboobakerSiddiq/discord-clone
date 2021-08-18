import React from 'react'
import { useDispatch } from 'react-redux'
import { setchannel } from './action/discordaction'
import './SidebarChannel.css'

const SidebarChannel = ({ id, channelName }) => {
    const dispatch = useDispatch()
    return (
        <div className='sidebarChannel' onClick={() => dispatch(setchannel({
            channelId: id,
            channelName: channelName
        }))} >
            <h4><span className='sidebarChannel__hash'>#</span>{channelName}</h4>
        </div>
    )
}

export default SidebarChannel
