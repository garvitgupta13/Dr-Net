import React from 'react';
import PatientList from './PatientList.js';
import Chat from './Chat.js';

const RoadToChat = () =>{

     const width = 32;
     return(
      <div style={{display:'flex',height:'100%'}}>
         <PatientList width={width}/>
         <Chat width={100-width}/>
      </div>
     );
}

export default RoadToChat;
