"use client";
import { Footer } from "@/components/footer";
import { Sentiment } from "@/components/sentiment";
import { Translate } from "@/components/translate";
import { VOCR } from "@/components/vocr";
import { Box, Tabs } from "@chakra-ui/react";
import React, { useState } from "react";

const tabs = ["vocr", "translate", "sentiment"];

const components: { [key: string]: React.ReactNode } = {
  vocr: <VOCR />,
  translate: <Translate />,
  sentiment: <Sentiment />,
};

export default function Home() {
  const [selected, setSelected] = useState("vocr");

  return (
    <Box className="min-h-screen flex flex-col">
      <Box
        className="flex-shrink-0 p-6"
        justifyContent={"center"}
        display={"flex"}
        alignItems={"center"}
        gap={"10"}
      >
        <Tabs.Root defaultValue={selected} variant="plain">
          <Tabs.List
            width={"100%"}
            borderWidth={1}
            justifyContent={"space-between"}
            paddingRight={"40"}
            paddingLeft={"40"}
            borderRadius={12}
            paddingTop={2}
            paddingBottom={2}
            boxShadow={"0px 10px 53px -39px rgba(0,0,0,0.75)"}
          >
            {tabs.map((tab) => {
              const isSelected = selected === tab;
              return (
                <Tabs.Trigger
                  key={tab}
                  value={tab}
                  fontWeight={"bold"}
                  bgColor={isSelected ? "black" : "transparent"}
                  borderWidth={isSelected ? 1 : undefined}
                  alignContent={"center"}
                  textAlign={"center"}
                  justifyContent={"center"}
                  width={"10rem"}
                  color={isSelected ? "white" : "black"}
                  onClick={() => setSelected(tab)}
                  textTransform={"capitalize"}
                  borderRadius={10}
                >
                  {tab}
                </Tabs.Trigger>
              );
            })}
          </Tabs.List>
        </Tabs.Root>
        <a href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FJigsawStack%2Fjigsawstack-vercel-template&env=NEXT_PUBLIC_JIGSAWSTACK_PUBLIC_KEY">
          <img src="https://vercel.com/button" alt="Deploy with Vercel" />
        </a>
      </Box>
      <Box className="flex-grow">
        <Box className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2 ">
          {components[selected] || <div>Select a tab to see its content.</div>}
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}
