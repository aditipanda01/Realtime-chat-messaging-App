import React, { useEffect, useState } from 'react';
import { Avatar, useChatContext } from 'stream-chat-react';

import { InviteIcon } from '../assets';

const ListContainer = ({ children }) => {
    return (
        <div className="user-list__container">
            <div className="user-list__header">
                <p>User</p>
                <p>Invite</p>
            </div>
            {children}
        </div>
    )
}

const UserItem = ({ user, setSelectedUsers }) => {
    const [selected, setSelected] = useState(false)

    const handleSelect = () => {
        if(selected) {
            setSelectedUsers((prevUsers) => prevUsers.filter((prevUser) => prevUser !== user.id))
        } else {
            setSelectedUsers((prevUsers) => [...prevUsers, user.id])
        }

        setSelected((prevSelected) => !prevSelected)
    }

    return (
        <div className="user-item__wrapper" onClick={handleSelect}>
            <div className="user-item__name-wrapper">
                <Avatar image={user.image} name={user.fullName || user.id} size={32} />
                <p className="user-item__name">{user.fullName || user.id}</p>
            </div>
            {selected ? <InviteIcon /> : <div className="user-item__invite-empty" />}
        </div>
    )
}


const UserList = ({ setSelectedUsers }) => {
    const { client } = useChatContext();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [listEmpty, setListEmpty] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const getUsers = async () => {
            if(loading) return;
            
            // Check if client is connected
            if(!client || !client.userID) {
                console.log('Client not connected or user not authenticated');
                return;
            }

            setLoading(true);
            setError(false);
            
            try {
                const response = await client.queryUsers(
                    { id: { $ne: client.userID } },
                    { id: 1 },
                    { limit: 8 } 
                );

                if(response.users && response.users.length) {
                    setUsers(response.users);
                    setListEmpty(false);
                } else {
                    setUsers([]);
                    setListEmpty(true);
                }
            } catch (error) {
               console.error('Error loading users:', error);
               setError(true);
               setUsers([]);
            }
            setLoading(false);
        }

        getUsers();
    }, [client]);

    if(error) {
        return (
            <ListContainer>
                <div className="user-list__message">
                    Error loading, please refresh and try again.
                </div>
            </ListContainer>
        )
    }

    if(listEmpty) {
        return (
            <ListContainer>
                <div className="user-list__message">
                    No users found.
                </div>
            </ListContainer>
        )
    }

    return (
        <ListContainer>
            {loading ? <div className="user-list__message">
                Loading users...
            </div> : (
                users?.map((user, i) => (
                  <UserItem index={i} key={user.id} user={user} setSelectedUsers={setSelectedUsers} />  
                ))
            )}
        </ListContainer>
    )
}

export default UserList;