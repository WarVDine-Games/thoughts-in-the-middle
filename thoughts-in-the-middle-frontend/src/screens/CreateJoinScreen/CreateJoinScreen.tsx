import { Button } from "../../components/Button/Button";
import { Input } from "../../components/Input/Input";
import { useInputWithError } from "../../components/Input/useInputWithError";
import styles from "./CreateJoinScreen.module.scss";

export interface CreateJoinScreenProps {
    onCreateRoom: (name: string) => void;
    onJoinRoom: (name: string, roomCode: string) => void;
}

export const CreateJoinScreen = ({
    onCreateRoom,
    onJoinRoom,
}: CreateJoinScreenProps) => {
    const roomCodeInputState = useInputWithError({
        placeholder: "Enter room code",
    });
    const nameInputState = useInputWithError({
        placeholder: "Enter your name",
    });

    const handleCreateRoom = () => {
        // Logic to create a room
        if (!nameInputState.value) {
            nameInputState.setError("Name is required");
            return;
        }
        onCreateRoom(nameInputState.value);
    };

    const handleJoinRoom = () => {
        // Logic to join a room
        if (!roomCodeInputState.value) {
            roomCodeInputState.setError("Room code is required");
            return;
        }
        if (!nameInputState.value) {
            nameInputState.setError("Name is required");
            return;
        }

        onJoinRoom(nameInputState.value, roomCodeInputState.value);
    };

    return (
        <div className={styles.mainContainer}>
            <h1>Create or Join a Room</h1>
            <Input
                label="Name"
                type="text"
                placeholder="Enter your name"
                value={nameInputState.value}
                onChange={(e) => nameInputState.onValueChange(e.target.value)}
                error={nameInputState.error}
            />
            <Input
                label="Room Code"
                type="text"
                placeholder="Enter room code"
                value={roomCodeInputState.value}
                onChange={(e) =>
                    roomCodeInputState.onValueChange(e.target.value)
                }
                error={roomCodeInputState.error}
            />
            <Button onClick={handleCreateRoom}>Create Room</Button>
            <Button onClick={handleJoinRoom}>Join Room</Button>
        </div>
    );
};
