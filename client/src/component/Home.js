import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Home() {
  const [roomId, setRoomID] = useState("");
  const [userName, setUserName] = useState("");

  const navigate = useNavigate();

  const createNewRoom = (e) => {
    e.preventDefault();
    const id = uuidv4();
    console.log(id);
    setRoomID(id);
    toast.success("Created a New Room");
  };
  const changeHandler = (e) => {
    setRoomID(e.target.value);
  };
  const changeHandle = (e) => {
    setUserName(e.target.value);
  };

  function joinEditorPage() {
    if (!roomId || !userName) {
      toast.error("Both roomId and userName are required");
      return;
    }
    navigate(`/editor/${roomId}`, {
      state: userName,
    });
    toast.success("Sucessfullly Entered");
  }

  const handleInput = (e) => {
    if (e.code === "Enter") {
      joinEditorPage();
    }
  };

  return (
    <div className="homePage">
      <div>
        <h4 className="mainLabel">Enter the Room Id</h4>

        <div className="inputGroup">
          <input
            type="text"
            className="inputBox"
            placeholder="ROOM ID"
            onChange={changeHandler}
            value={roomId}
            onKeyUp={handleInput}
          />
          <input
            type="text"
            className="inputBox"
            placeholder="USERNAME"
            onChange={changeHandle}
            value={userName}
            onKeyUp={handleInput}
          />

          <button onClick={joinEditorPage} className="btn joinBtn">
            Join
          </button>
          <span className="createInfo">
            If you don't have an invite then create &nbsp;{" "}
            <a onClick={createNewRoom} href="" className="createnewBtn">
              New Room
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Home;
