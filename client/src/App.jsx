import React, { useState, useEffect } from 'react';
import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import Cookies from 'universal-cookie';
import Auth from './components/Auth';
import { ChannelListContainer, ChannelContainer } from './components';

import 'stream-chat-react/dist/css/index.css';
import './App.css';

const cookies = new Cookies();

const apiKey = 'qgtk9ttyha7j';

const App = () => {
    const [createType, setCreateType] = useState('');
    const [isCreating, setIsCreating] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [client, setClient] = useState(null);
    const [isConnected, setIsConnected] = useState(false);

    const authToken = cookies.get("token");

    useEffect(() => {
        if (!authToken) return;

        const initClient = async () => {
            try {
                const streamClient = StreamChat.getInstance(apiKey);
                
                await streamClient.connectUser({
                    id: cookies.get('userId'),
                    name: cookies.get('username'),
                    fullName: cookies.get('fullName'),
                    image: cookies.get('avatarURL'),
                    hashedPassword: cookies.get('hashedPassword'),
                    phoneNumber: cookies.get('phoneNumber'),
                }, authToken);

                setClient(streamClient);
                setIsConnected(true);
            } catch (error) {
                console.error('Error connecting to StreamChat:', error);
                // Clear invalid tokens
                cookies.remove("token");
                cookies.remove('userId');
                cookies.remove('username');
                cookies.remove('fullName');
                cookies.remove('avatarURL');
                cookies.remove('hashedPassword');
                cookies.remove('phoneNumber');
                window.location.reload();
            }
        };

        initClient();
    }, [authToken]);

    if(!authToken) return <Auth />

    if(!client || !isConnected) {
        return (
            <div className="app__wrapper">
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <p>Connecting to chat...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="app__wrapper">
            <Chat client={client} theme="team light">
                <ChannelListContainer 
                    isCreating={isCreating}
                    setIsCreating={setIsCreating}
                    setCreateType={setCreateType}
                    setIsEditing={setIsEditing}
                />
                <ChannelContainer 
                    isCreating={isCreating}
                    setIsCreating={setIsCreating}
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                    createType={createType}
                />
            </Chat>
        </div>
    );
}

export default App;
