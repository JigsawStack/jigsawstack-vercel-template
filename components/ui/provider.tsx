"use client";

import {
  ChakraProvider,
  createSystem,
  defaultSystem,
  defineConfig,
} from "@chakra-ui/react";
import { ColorModeProvider } from "./color-mode";

const config = defineConfig({
  theme: {},
});

const system = createSystem(config);

export function Provider(props: React.PropsWithChildren) {
  return (
    <ChakraProvider value={defaultSystem}>
      <ColorModeProvider>{props.children}</ColorModeProvider>
    </ChakraProvider>
  );
}
