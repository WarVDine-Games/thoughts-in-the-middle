export class Player {
    constructor(
        readonly uniqueClientId: string,
        public socketId: string,
        public name: string,
        public currentGameRoomId: string = "",
        public cards: string[] = [],
    ) {}

    get publicPlayerInfo() {
        return {
            uniqueClientId: this.uniqueClientId,
            name: this.name,
            currentGameRoomId: this.currentGameRoomId,
        };
    }
}
