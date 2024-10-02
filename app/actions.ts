"use server";

import { JigsawStack } from "jigsawstack";

const jigsawStack = JigsawStack(); // API key will be read from environment variables

type JigsawStackType = ReturnType<typeof JigsawStack>;

export type VOCRParams = Parameters<JigsawStackType["vision"]["vocr"]>["0"];

export const vocrAction = async (params: VOCRParams) => {
  return await jigsawStack.vision.vocr(params);
};
