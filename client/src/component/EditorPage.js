import React, { useState } from "react";
import Client from "../helper/Client";
import Editor from "../helper/Editor";

function EditorPage() {
  const [clients, setClients] = useState([
    {
      socketId: 1,
      username: "Divyansh",
    },
    { socketId: 2, username: "Div" },
  ]);

  return (
    <div className="mainWrap">
      <div className="aside">
        <div className="asideInner">
          <div className="logo">
            <img src="" alt="" />
          </div>
          <h3>Connected</h3>

          <div className="clientsList">
            {clients.map((client) => (
              <Client key={client.socketId} username={client.username} />
            ))}
          </div>
        </div>

        <button className="btn coptBtn">Copy RoomId</button>
        <button className="btn leavBtn">Leave</button>
      </div>

      <div className="editorWrap">
        <Editor />
      </div>
    </div>
  );
}

export default EditorPage;
