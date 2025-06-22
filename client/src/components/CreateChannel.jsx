import React, { useState } from 'react';
import { useChatContext } from 'stream-chat-react';

import { UserList } from './';
import { CloseCreateChannel } from '../assets';

const ChannelNameInput = ({ channelName = '', setChannelName }) => {
    const handleChange = (event) => {
        event.preventDefault();

        setChannelName(event.target.value);
    }

    return (
        <div className="channel-name-input__wrapper">
            <p>Name</p>
            <input value={channelName} onChange={handleChange} placeholder="channel-name" />
            <p>Add Members</p>
        </div>
    )
}

const CreateChannel = ({ createType, setIsCreating }) => {
    const { client, setActiveChannel } = useChatContext();
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [channelName, setChannelName] = useState('');
    const [error, setError] = useState('');

    const createChannel = async (e) => {
        e.preventDefault();
        setError('');

        try {
            // Ensure the current user is included in the members list
            const members = [...new Set([...selectedUsers, client.userID])];
            
            // For team channels, require a name
            if (createType === 'team' && !channelName.trim()) {
                setError('Please enter a channel name');
                return;
            }

            // For messaging channels, require at least one other user
            if (createType === 'messaging' && selectedUsers.length === 0) {
                setError('Please select at least one user to message');
                return;
            }

            const newChannel = await client.channel(createType, channelName || undefined, {
                name: channelName || undefined, 
                members: members
            });

            await newChannel.watch();

            setChannelName('');
            setIsCreating(false);
            setSelectedUsers([]);
            setActiveChannel(newChannel);
        } catch (error) {
            console.error('Error creating channel:', error);
            setError('Failed to create channel. Please try again.');
        }
    }

    return (
        <div className="create-channel__container">
            <div className="create-channel__header">
                <p>{createType === 'team' ? 'Create a New Channel' : 'Send a Direct Message'}</p>
                <CloseCreateChannel setIsCreating={setIsCreating} />
            </div>
            {createType === 'team' && <ChannelNameInput channelName={channelName} setChannelName={setChannelName}/>}
            <UserList setSelectedUsers={setSelectedUsers} />
            
            {error && (
                <div style={{ 
                    color: 'red', 
                    padding: '10px 20px', 
                    fontSize: '14px',
                    backgroundColor: '#ffe6e6',
                    margin: '10px 20px',
                    borderRadius: '4px'
                }}>
                    {error}
                </div>
            )}
            
            <div className="create-channel__button-wrapper" onClick={createChannel}>
                <p>{createType === 'team' ? 'Create Channel' : 'Create Message Group'}</p>
            </div>
        </div>
    )
}

export default CreateChannel
