import { RandomNumberGenny } from "../helpers/RandomNumberGenny";
import { GameRoom } from "../models/GameRoom";
import { Player } from "../models/Player";

export enum JoinGameActionResponse {
    SUCCESS = "SUCCESS",
    ALREADY_IN_GAME = "ALREADY_IN_GAME",
    LOBBY_FULL = "LOBBY_FULL",
    GAME_NOT_FOUND = "GAME_NOT_FOUND",
}

export enum LeaveGameActionResponse {
    SUCCESS = "SUCCESS",
    PLAYER_NOT_FOUND = "PLAYER_NOT_IN_GAME",
    GAME_NOT_FOUND = "GAME_NOT_FOUND",
}

export class GameManager {
    private RNG: RandomNumberGenny;

    private gameList: { [key: string]: GameRoom };

    constructor() {
        this.RNG = new RandomNumberGenny(32, 100000000, 900000000);
        this.gameList = {};
    }

    createGame = (creatorPlayer: Player): GameRoom => {
        const gameRoomId: string = this.RNG.generate();
        this.gameList[gameRoomId] = new GameRoom(
            this,
            gameRoomId,
            creatorPlayer,
        );

        if (creatorPlayer.currentGameRoomId) {
            this.leaveGame(creatorPlayer, creatorPlayer.currentGameRoomId);
        }
        creatorPlayer.currentGameRoomId = gameRoomId;

        return this.gameList[gameRoomId];
    };

    findGame = (ID: string): GameRoom => this.gameList[ID];

    joinGame = (player: Player, gameRoomId: string): JoinGameActionResponse => {
        const game = this.gameList[gameRoomId];
        if (!game) {
            return JoinGameActionResponse.GAME_NOT_FOUND;
        }
        if (game.findPlayer(player.uniqueClientId)) {
            return JoinGameActionResponse.ALREADY_IN_GAME;
        }
        if (game.lobby.length >= game.MAX_PLAYERS) {
            return JoinGameActionResponse.LOBBY_FULL;
        }

        if (player.currentGameRoomId) {
            this.leaveGame(player, player.currentGameRoomId);
        }

        game.addPlayer(player);
        player.currentGameRoomId = gameRoomId;
        return JoinGameActionResponse.SUCCESS;
    };

    leaveGame = (
        playerToLeave: Player,
        gameRoomId: string,
    ): LeaveGameActionResponse => {
        const gameRoom = this.gameList[gameRoomId];
        if (!gameRoom) {
            return LeaveGameActionResponse.GAME_NOT_FOUND;
        }
        const player = gameRoom.findPlayer(playerToLeave.uniqueClientId);
        if (!player) {
            return LeaveGameActionResponse.PLAYER_NOT_FOUND;
        }

        gameRoom.removePlayer(playerToLeave.uniqueClientId);
        player.currentGameRoomId = "";

        if (gameRoom.lobby.length === 0) {
            this.removeGame(gameRoomId);
        }
        return LeaveGameActionResponse.SUCCESS;
    };

    removeGame = (ID: string): void => {
        delete this.gameList[ID];
        this.RNG.remove(ID);
    };
}
