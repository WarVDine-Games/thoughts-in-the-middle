import type { Meta } from "@storybook/react";
import { ThoughtToken } from "./ThoughtToken";
import { ThoughtTokenContainer } from "./ThoughtTokenContainer";

const meta: Meta<typeof ThoughtTokenContainer> = {
    title: "ThoughtTokenContainer",
    component: ThoughtTokenContainer,
};

export default meta;

export const OneToken = {
    args: {
        thoughtTokenStrengths: ["WEAK"],
    },
};

export const FiveTokens = {
    args: {
        thoughtTokenStrengths: ["WEAK", "NORMAL", "STRONG", "WEAK", "NORMAL"],
    },
};
