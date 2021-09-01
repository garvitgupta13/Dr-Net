import React from 'react';
import UserList from './UserList.js';
import Chat from './Chat.js';

const RoadToChat = () =>{

     const width = 32;
     return(
      <div style={{display:'flex',height:'100%'}}>
         <UserList width={width}/>
         <Chat width={100-width}/>
      </div>
     );
}

export default RoadToChat;
