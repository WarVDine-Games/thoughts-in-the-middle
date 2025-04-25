import type { Meta } from "@storybook/react";
import { PlayerPairItem } from "./PlayerPairItem";

const meta: Meta<typeof PlayerPairItem> = {
    title: "PlayerPairItem",
    component: PlayerPairItem,
};

export default meta;

export const Default = {
    args: {
        playerPairInfo: {
            player1: {
                name: "Alice",
                id: "1",
            },
            player2: {
                name: "Bob",
                id: "2",
            },
            thoughtTokens: ["WEAK", "STRONG", "NORMAL"],
        },
    },
};

export const ActivePlayer = {
    args: {
        isActivePair: true,
        playerPairInfo: {
            player1: {
                name: "Alice",
                id: "1",
            },
            player2: {
                name: "Bob",
                id: "2",
            },
            thoughtTokens: ["WEAK", "STRONG", "NORMAL"],
        },
    },
};
