import { GameInfo, LobbyInfo } from "../../interfaces";

export interface MainGameScreenProps {
    lobbyInfo: LobbyInfo;
    gameInfo: GameInfo;
    uniqueClientId: string;
    playerCards: string[];
}

export const MainGameScreen = ({
    lobbyInfo,
    gameInfo,
    uniqueClientId,
    playerCards,
}: MainGameScreenProps) => {
    // Should show:
    // List of players
    // player's cards
    // the pair's cards that are placed down

    return (
        <div>
            <h1>Main Game Screen</h1>
            <h2>Lobby Info</h2>
            <pre>{JSON.stringify(lobbyInfo, null, 2)}</pre>
            <h2>Game Info</h2>
            <pre>{JSON.stringify(gameInfo, null, 2)}</pre>
            <h2>Your Cards</h2>
            <pre>{JSON.stringify(playerCards, null, 2)}</pre>
        </div>
    );
};
