"use client";

import { useState } from "react";
import { JigsawStack } from "jigsawstack";
import { useLoading } from "@/hooks/useLoading";
import { Box, Button, Flex, Text, Textarea } from "@chakra-ui/react";

type JigsawStackType = ReturnType<typeof JigsawStack>;

type SentimentReponse = Awaited<ReturnType<JigsawStackType["sentiment"]>>;

export const Sentiment = () => {
  const [collect, setCollect] = useState("");
  const [result, setResult] = useState<SentimentReponse>();
  const { loading, toggleLoading } = useLoading();
  const handleRequest = async () => {
    toggleLoading();
    const jigsawstack = JigsawStack({
      apiKey: process.env.NEXT_PUBLIC_JIGSAWSTACK_PUBLIC_KEY,
    });
    try {
      const result = await jigsawstack.sentiment({ text: collect });
      setResult(result);
      console.log(result);
    } catch (error) {
    } finally {
      toggleLoading();
    }
  };
  return (
    <Box className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-12 sm:mt-20">
      <h1 className="sm:text-6xl text-4xl max-w-[708px] font-bold text-slate-900 mb-10">
        Sentiment Analysis
      </h1>
      <Box className="w-full">
        <p className="text-left font-bold mb-2">Text to analyze</p>
        <Textarea
          value={collect}
          onChange={(e) => setCollect(e.target.value)}
          rows={4}
          className="w-full rounded-md py-2 px-2  border-2 bg-gray-200 text-black border-primary shadow-sm focus:border-black focus:ring-black"
          placeholder={"e.g. My trip to Mars was so exciting..."}
        />
      </Box>

      <Button
        onClick={handleRequest}
        disabled={loading || !collect.length}
        className="bg-primary rounded-xl text-white hover:text-primary font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-white hover:border-primary border-2 w-full"
      >
        {loading ? "Analyzing..." : "Analyze"}
      </Button>

      {result && (
        <Flex
          width={"100%"}
          borderRadius={5}
          backgroundColor={"teal.300"}
          padding={3}
          alignContent={"center"}
          mt={"1rem"}
        >
          <Box className="w-full">
            <Text mb={2} fontWeight={"bold"} fontSize={"large"}>
              Text Sentiment
            </Text>
            <Text textTransform={"capitalize"} fontWeight={"bold"}>
              {result.sentiment.emotion}
            </Text>
          </Box>
        </Flex>
      )}
    </Box>
  );
};
