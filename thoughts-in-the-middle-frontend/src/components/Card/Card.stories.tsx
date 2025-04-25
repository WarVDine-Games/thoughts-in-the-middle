import type { Meta } from "@storybook/react";
import { Card } from "./Card";

const meta: Meta<typeof Card> = {
    title: "Card",
    component: Card,
};

export default meta;

export const Default = {
    args: {
        wordOnCard: "Card 1",
    },
};
