export enum ThoughtTokenStrength {
    WEAK = "WEAK",
    NORMAL = "NORMAL",
    STRONG = "STRONG",
}

export class ThoughtToken {
    private _value: number;

    constructor(private readonly _strength: ThoughtTokenStrength) {
        switch (_strength) {
            case ThoughtTokenStrength.WEAK:
                this._value = Math.floor(2.5 + Math.random()); // 2 or 3
                break;
            case ThoughtTokenStrength.NORMAL:
                this._value = Math.floor(4.5 + Math.random()); // 4 or 5
                break;
            case ThoughtTokenStrength.STRONG:
                this._value = Math.floor(6.5 + Math.random()); // 6 or 7;
                break;
        }
    }

    get strength(): ThoughtTokenStrength {
        return this._strength;
    }

    get value(): number {
        return this._value;
    }
}
