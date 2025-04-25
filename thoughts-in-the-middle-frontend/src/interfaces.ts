export interface PublicPlayerInfo {
    currentGameRoomId: string;
    name: string;
    uniqueClientId: string;
}

export interface LobbyInfo {
    roomId: string;
    roomAdminPlayerId: string;
    lobby: PublicPlayerInfo[];
}

export interface PlayerPairInfo {
    player1: PublicPlayerInfo;
    player2: PublicPlayerInfo;
    thoughtTokens: string[];
}

export interface GameInfo {
    roomId: string;
    playerPairs: PlayerPairInfo[];
    currentPlayerId: string;
    pairedPlayerId: string;
    currentPlayerCard: string | null;
    pairedPlayerCard: string | null;

    /** Goes from 3 to 0 */
    crystalBallStrength: number;
}

export interface GameOverInfo {
    winningPair: PlayerPairInfo;
    totalScore: number;
}
