import type { Meta } from "@storybook/react";
import { ThoughtToken } from "./ThoughtToken";

const meta: Meta<typeof ThoughtToken> = {
    title: "ThoughtToken",
    component: ThoughtToken,
};

export default meta;

export const WeakToken = {
    args: {
        thoughtTokenName: "WEAK",
    },
};

export const NormalToken = {
    args: {
        thoughtTokenName: "NORMAL",
    },
};

export const StrongToken = {
    args: {
        thoughtTokenName: "STRONG",
    },
};
