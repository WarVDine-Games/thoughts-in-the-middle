import type { Meta } from "@storybook/react";
import { LobbyList } from "./LobbyList";

const meta: Meta<typeof LobbyList> = {
    title: "LobbyList",
    component: LobbyList,
};

export default meta;

export const Default = {
    args: {
        publicPlayerInfo: [
            { name: "Player 1", uniqueClientId: "1" },
            { name: "Player 2", uniqueClientId: "2" },
            { name: "Player 3", uniqueClientId: "3" },
        ],
    },
};
