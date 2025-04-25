import type { Meta } from "@storybook/react";
import { TableInfo } from "./TableInfo";

const meta: Meta<typeof TableInfo> = {
    title: "TableInfo",
    component: TableInfo,
};

export default meta;

export const Default = {
    args: {
        player1: {
            name: "Alice",
            id: "1",
        },
        player2: {
            name: "Bob",
            id: "2",
        },
        player1Card: "Card 1",
        player2Card: "Card 2",
        uniqueClientId: "12345",
    },
};
