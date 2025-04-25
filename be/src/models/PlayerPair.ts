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

    set player1ChosenCard(card: string) {
        this._player1ChosenCard = card;
    }

    set player2ChosenCard(card: string) {
        this._player2ChosenCard = card;
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
}
