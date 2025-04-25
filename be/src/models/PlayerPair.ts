import { Player } from "./Player";
import { ThoughtToken, ThoughtTokenStrength } from "./ThoughtToken";

export interface PlayerPairInfo {
    player1: Player;
    player2: Player;
    thoughtTokenStrengths: string[];
}

export class PlayerPair {
    private thoughtTokens: ThoughtToken[] = [];
    private _player1ChosenCard: string | null = null;
    private _player2ChosenCard: string | null = null;

    constructor(
        private readonly _player1: Player,
        private readonly _player2: Player,
    ) {}

    addThoughtToken(strength: ThoughtTokenStrength): void {
        const newToken = new ThoughtToken(strength);
        this.thoughtTokens.push(newToken);
    }

    get totalThoughtTokenValues(): number {
        return this.thoughtTokens.reduce((acc, token) => acc + token.value, 0);
    }

    get player1ChosenCard(): string | null {
        return this._player1ChosenCard;
    }

    get player2ChosenCard(): string | null {
        return this._player2ChosenCard;
    }

    clearChosenCards(): void {
        this._player1ChosenCard = null;
        this._player2ChosenCard = null;
    }

    get player1(): Player {
        return this._player1;
    }

    get player2(): Player {
        return this._player2;
    }

    get thoughtTokenStrengths(): string[] {
        return this.thoughtTokens.map((token) => token.strength);
    }

    get playerPairInfo() {
        return {
            player1: this._player1.publicPlayerInfo,
            player2: this._player2.publicPlayerInfo,
            thoughtTokens: this.thoughtTokenStrengths,
        };
    }

    get playerIdThatShouldPlay(): string {
        if (this._player2ChosenCard === null) {
            return this._player2.uniqueClientId;
        } else if (this._player1ChosenCard === null) {
            return this._player1.uniqueClientId;
        }
        return "";
    }

    playCardForPlayer(uniqueClientId: string, card: string): void {
        if (this._player1.uniqueClientId === uniqueClientId) {
            this._player1ChosenCard = card;
        } else if (this._player2.uniqueClientId === uniqueClientId) {
            this._player2ChosenCard = card;
        }
    }
}
