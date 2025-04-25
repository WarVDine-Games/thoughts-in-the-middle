import type { Meta } from "@storybook/react";
import { MainGameScreen } from "./MainGameScreen";

const meta: Meta<typeof MainGameScreen> = {
    title: "MainGameScreen",
    component: MainGameScreen,
};

export default meta;

export const Default = {
    args: {
        lobbyInfo: {
            lobby: [
                { name: "Player 1", uniqueClientId: "1" },
                { name: "Player 2", uniqueClientId: "2" },
                { name: "Player 3", uniqueClientId: "3" },
            ],
        },
        gameInfo: {
            currentPlayerId: "1",
            pairedPlayerId: "2",
            pairedPlayerCard: null,
            currentPlayerCard: "Card 2",
            playerPairs: [
                {
                    player1: { name: "Player 1", uniqueClientId: "1" },
                    player2: { name: "Player 2", uniqueClientId: "2" },
                    thoughtTokens: ["WEAK", "STRONG"],
                },
                {
                    player1: { name: "Player 1", uniqueClientId: "1" },
                    player2: { name: "Player 2", uniqueClientId: "2" },
                    thoughtTokens: ["WEAK", "STRONG"],
                },
                {
                    player1: { name: "Player 1", uniqueClientId: "1" },
                    player2: { name: "Player 2", uniqueClientId: "2" },
                    thoughtTokens: ["WEAK", "STRONG"],
                },
                {
                    player1: { name: "Player 1", uniqueClientId: "1" },
                    player2: { name: "Player 2", uniqueClientId: "2" },
                    thoughtTokens: ["WEAK", "STRONG"],
                },
                {
                    player1: { name: "Player 1", uniqueClientId: "1" },
                    player2: { name: "Player 2", uniqueClientId: "2" },
                    thoughtTokens: ["WEAK", "STRONG"],
                },
                {
                    player1: { name: "Player 1", uniqueClientId: "1" },
                    player2: { name: "Player 2", uniqueClientId: "2" },
                    thoughtTokens: ["WEAK", "STRONG"],
                },
            ],
        },
        uniqueClientId: "2",
        playerCards: [
            "Perpetrate",
            "Car",
            "Anguish",
            "Card 4",
            "Card 5",
            "Card 6",
        ],
    },
};
