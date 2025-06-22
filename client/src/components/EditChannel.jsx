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

const EditChannel = ({ setIsEditing }) => {
    const { channel, client } = useChatContext();
    const [channelName, setChannelName] = useState(channel?.data?.name);
    const [selectedUsers, setSelectedUsers] = useState([])
    const [error, setError] = useState('');

    const updateChannel = async (event) => {
        event.preventDefault();
        setError('');

        try {
            const nameChanged = channelName !== (channel.data.name || channel.data.id);

            // Update channel name if changed
            if(nameChanged) {
                await channel.update({ name: channelName }, { text: `Channel name changed to ${channelName}`});
            }

            // Handle adding members based on channel type
            if(selectedUsers.length) {
                // Check if this is a team channel (can add members) or messaging channel (cannot add members)
                if(channel.type === 'team') {
                    // For team channels, we can add members
                    await channel.addMembers(selectedUsers);
                } else if(channel.type === 'messaging') {
                    // For messaging channels, we need to create a new channel with the additional members
                    const newChannel = client.channel('messaging', {
                        members: [...channel.state.members, ...selectedUsers.map(id => ({ id }))]
                    });
                    
                    await newChannel.watch();
                    // You might want to redirect to the new channel here
                    console.log('Created new messaging channel with additional members');
                }
            }

            setChannelName(null);
            setIsEditing(false);
            setSelectedUsers([]);
        } catch (error) {
            console.error('Error updating channel:', error);
            
            // Provide user-friendly error messages
            if(error.message && error.message.includes('cannot add members to the distinct channel')) {
                setError('Cannot add members to direct message channels. Please create a new group chat instead.');
            } else if(error.message && error.message.includes('permission')) {
                setError('You do not have permission to add members to this channel.');
            } else {
                setError('Failed to update channel. Please try again.');
            }
        }
    }

    return (
        <div className="edit-channel__container">
            <div className="edit-channel__header">
                <p>Edit Channel</p>
                <CloseCreateChannel setIsEditing={setIsEditing} />
            </div>
            <ChannelNameInput channelName={channelName} setChannelName={setChannelName} />
            
            {/* Only show user list for team channels */}
            {channel?.type === 'team' && (
                <UserList setSelectedUsers={setSelectedUsers} />
            )}
            
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
            
            <div className="edit-channel__button-wrapper" onClick={updateChannel}>
                <p>Save Changes</p>
            </div>
        </div>
    )
}

export default EditChannel
