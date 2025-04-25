import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import styles from "./CreateJoinScreen.module.scss";
import { useState } from "react";

export const CreateJoinScreen = () => {
    const [roomCode, setRoomCode] = useState<string>("");
    const [name, setName] = useState<string>("");
    
    const handleCreateRoom = () => {
        // Logic to create a room
        console.log("Creating room with name:", name);
    };
    
    const handleJoinRoom = () => {
        // Logic to join a room
        console.log("Joining room with code:", roomCode);
    };
    
    return (
        <div className={styles.mainContainer}>
        <h1>Create or Join a Room</h1>
        <Input
            label="Name"
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
        />
        <Input
            label="Room Code"
            type="text"
            placeholder="Enter room code"
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value)}
        />
            <Button onClick={handleCreateRoom}>Create Room</Button>
            <Button onClick={handleJoinRoom}>Join Room</Button>
        </div>
    );
}