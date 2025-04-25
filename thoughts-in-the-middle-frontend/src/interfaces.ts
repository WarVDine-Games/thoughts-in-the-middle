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
