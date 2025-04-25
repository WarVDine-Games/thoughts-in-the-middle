import { Player } from "../models/Player";

export class PlayerManager {
    private _players: Record<string, Player>;

    constructor() {
        this._players = {};
    }

    createPlayer(
        uniqueClientId: string,
        socketId: string,
        name: string,
    ): Player {
        const player = new Player(uniqueClientId, socketId, name);
        this._players[uniqueClientId] = player;
        return player;
    }

    removePlayer(uniqueClientId: string): void {
        delete this._players[uniqueClientId];
    }

    findPlayerFromClientId(uniqueClientId: string): Player | undefined {
        return this._players[uniqueClientId];
    }

    get allPlayers(): Player[] {
        return Array.from(Object.values(this._players));
    }
}
