import React from 'react';
import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import Cookies from 'universal-cookie';


import{ ChanelListContainer,ChanelContainer} from './components';
import './App.css';

const apiKey='y7m34rdgapnc';

const client=StreamChat.getInstance(apiKey);

const App = () => {
  return (
    <div className='app_Wrapper'>
        <Chat client={client} theme ="team light">
            <ChanelListContainer

            />
            <ChanelContainer
              
              />
        </Chat>
     
    </div>
  );
}

export default App
