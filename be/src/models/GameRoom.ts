import { start } from "repl";
import { buildDeck } from "../helpers/buildDeck";
import { GameManager } from "../managers/GameManager";
import { Player } from "./Player";
import { PlayerPair } from "./PlayerPair";

export class GameRoom {
    readonly MAX_PLAYERS = 8;
    readonly MIN_PLAYERS = 2;
    private _lobby: Player[] = [];
    private _roomAdminPlayerId: string;

    // Game specific properties
    private _playerPairs: PlayerPair[] = [];
    private _deck: string[] = [];
    private _startingPlayerId: string = "";
    private _currentPlayerId: string = "";

    constructor(
        readonly gameManager: GameManager,
        readonly roomId: string,
        creatorPlayer: Player,
    ) {
        this._roomAdminPlayerId = creatorPlayer.uniqueClientId;
        this._lobby.push(creatorPlayer);
    }

    get lobbyInfo() {
        return {
            roomId: this.roomId,
            lobby: this._lobby.map((player) => player.publicPlayerInfo),
            roomAdminPlayerId: this._roomAdminPlayerId,
        };
    }

    get gameInfo() {
        if (!this._startingPlayerId) return null;
        return {
            roomId: this.roomId,
            playerPairs: this._playerPairs.map((pair) => pair.playerPairInfo),
            currentPlayerId: this._currentPlayerId,
            pairedPlayerId: this.getPlayerPairFromPlayer1Id(
                this._currentPlayerId,
            )?.player2.uniqueClientId,
            currentPlayerCard: this.getPlayerPairFromPlayer1Id(
                this._currentPlayerId,
            )?.player1ChosenCard,
            pairedPlayerCard: this.getPlayerPairFromPlayer1Id(
                this._currentPlayerId,
            )?.player2ChosenCard,
        };
    }

    generateRoomId(): string {
        const timestamp = Date.now().toString(36); // Convert timestamp to base 36
        const randomPart = Math.random().toString(36).substring(2, 10); // Random string
        return `${timestamp}-${randomPart}`; // Combine both parts
    }

    addPlayer(player: Player): void {
        this._lobby.push(player);
    }

    findPlayer(playerId: string): Player | undefined {
        return this._lobby.find((player) => player.uniqueClientId === playerId);
    }

    removePlayer(playerId: string): void {
        this._lobby = this._lobby.filter(
            (player) => player.uniqueClientId !== playerId,
        );
        if (this.isAdmin(playerId)) {
            this.decideNewAdmin();
        }
    }

    decideNewAdmin(): void {
        if (this._lobby.length > 0) {
            this._roomAdminPlayerId = this._lobby[0].uniqueClientId;
        } else {
            this._roomAdminPlayerId = "";
        }
    }

    get lobby(): Player[] {
        return [...this._lobby];
    }
    get roomAdminPlayerId(): string {
        return this._roomAdminPlayerId;
    }

    isAdmin(playerId: string): boolean {
        return this.roomAdminPlayerId === playerId;
    }

    getPlayerPairFromPlayer1Id(player1Id: string): PlayerPair | undefined {
        return this._playerPairs.find(
            (pair) => pair.player1.uniqueClientId === player1Id,
        );
    }

    startGame(): void {
        // One "set of cards" is 18 cards
        // We want to have n-1 sets of cards, where n is the number of players
        // Ex: if we have 2 players, we want 1 set of cards
        const totalCards = (this._lobby.length - 1) * 18;
        this._deck = buildDeck(totalCards);

        // Shuffle the player order and reset their cards
        this._lobby.sort(() => Math.random() - 0.5);
        this._lobby.forEach((player) => {
            player.cards = [];
        });

        // Deal out 7 cards to each player
        for (let i = 0; i < 6; i++) {
            this._lobby.forEach((player) => {
                player.cards.push(this._deck.shift()!);
            });
        }

        // Create pairs of players
        for (let i = 0; i < this._lobby.length; i++) {
            const player1: Player = this._lobby[i];
            const player2: Player =
                i + 1 === this._lobby.length
                    ? this._lobby[0]
                    : this._lobby[i + 1];
            const pair = new PlayerPair(player1, player2);
            this._playerPairs.push(pair);
        }

        // Randomly select a starting player
        const randomIndex = Math.floor(Math.random() * this._lobby.length);
        this._startingPlayerId = this._lobby[randomIndex].uniqueClientId;
        this._currentPlayerId = this._startingPlayerId;
    }
}
