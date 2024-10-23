import { Flex, Text } from "@chakra-ui/react";
import { JigsawStack } from "jigsawstack";
import { useState } from "react";
import { Button } from "../ui/button";
import { useLoading } from "@/hooks/useLoading";
type JigsawStackType = ReturnType<typeof JigsawStack>;
type TranslateResponse = Awaited<ReturnType<JigsawStackType["translate"]>>;

const data = [
  { value: "en", label: "English" },
  { value: "fr", label: "French" },
  { value: "es", label: "Spanish" },
  { value: "de", label: "German" },
  { value: "it", label: "Italian" },
  { value: "ja", label: "Japanese" },
  { value: "ko", label: "Korean" },
  { value: "pt", label: "Portuguese" },
  { value: "zh", label: "Chinese" },
];

export const Translate = () => {
  const { loading, toggleLoading } = useLoading();
  const [state, setState] = useState<{
    text: string;
    target_language?: string;
  }>({
    text: "",
  });
  const [result, setResult] = useState<TranslateResponse>();
  const handleTranslation = async () => {
    const jigsawstack = JigsawStack({
      apiKey: process.env.NEXT_PUBLIC_JIGSAWSTACK_PUBLIC_KEY,
    });

    try {
      toggleLoading();
      const result = await jigsawstack.translate({
        text: state.text,
        target_language: state.target_language || "es",
      });
      setResult(result);
      console.log(result);
    } catch (error) {
      console.error(error);
    } finally {
      toggleLoading();
    }
  };

  return (
    <div className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-12 sm:mt-20">
      <h1 className="sm:text-6xl text-4xl max-w-[708px] font-bold text-slate-900 mb-10">
        Translate to a target Language
      </h1>

      <div className="w-full">
        <p className="text-left font-bold mb-2">Text to translate</p>
        <textarea
          value={state.text}
          onChange={(e) =>
            setState({
              text: e.target.value,
            })
          }
          rows={4}
          className="w-full rounded-md py-2 px-2 bg-gray-200  border-2  border-primary shadow-sm focus:border-black focus:ring-black"
          placeholder={"e.g. Welcome to JigsawStack"}
        />
      </div>

      <div className="w-full">
        <p className="text-left font-bold mb-2">Target Language</p>
        <select
          value={state.target_language}
          onChange={(e) =>
            setState({
              ...state,
              target_language: e.target.value,
            })
          }
          className="w-full rounded-md py-2 bg-gray-200 px-2 text-black  border-2 border-primary shadow-sm focus:border-black focus:ring-black"
        >
          {data.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <Button
        onClick={handleTranslation}
        loading={loading}
        disabled={loading || !state.text.length}
        className="bg-primary rounded-xl text-white hover:text-black font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-white hover:border-primary border-2 w-full"
      >
        {loading ? "Translating..." : "Translate"}
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
          <div className="w-full">
            <Text mb={2} fontWeight={"bold"} fontSize={"large"}>
              Translated text
            </Text>
            <Text fontWeight={"bold"}>{result.translated_text}</Text>
          </div>
        </Flex>
      )}
    </div>
  );
};
