export class Player {
    constructor(
        readonly uniqueClientId: string,
        public socketId: string,
        public name: string,
        public currentGameRoomId: string = "",
        private _cards: string[] = [],
    ) {}

    get publicPlayerInfo() {
        return {
            uniqueClientId: this.uniqueClientId,
            name: this.name,
            currentGameRoomId: this.currentGameRoomId,
        };
    }

    get cards(): string[] {
        return [...this._cards];
    }

    hasCard(card: string): boolean {
        return this._cards.includes(card);
    }

    removeCard(card: string): void {
        this._cards = this._cards.filter((c) => c !== card);
    }

    addCard(card: string): void {
        this._cards.push(card);
    }

    resetCards(): void {
        this._cards = [];
    }
}
