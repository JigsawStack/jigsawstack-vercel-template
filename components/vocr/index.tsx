import { useLoading } from "@/hooks/useLoading";
import { Flex, Input, Text } from "@chakra-ui/react";
import { File } from "buffer";
import { JigsawStack } from "jigsawstack";
import { useState } from "react";
import { toast } from "sonner";
import FileUploader from "../file-upload/FileUpload";
import { LoadingSpinner } from "../Spinner";
import { Button } from "../ui/button";

type JigsawStackType = ReturnType<typeof JigsawStack>;

type VocrResponse = Awaited<ReturnType<JigsawStackType["vision"]["vocr"]>>;

export const VOCR = () => {
  const { loading, toggleLoading } = useLoading();
  const [collect, setCollect] = useState("");
  const [file, setFile] = useState<File>();
  const [result, setResult] = useState<VocrResponse>();

  const handleExtract = async () => {
    if (!file) {
      return;
    }
    const jigsawstack = JigsawStack({
      apiKey: process.env.NEXT_PUBLIC_JIGSAWSTACK_PUBLIC_KEY,
    });
    try {
      toggleLoading();
      const blob = new Blob([file as any], { type: file.type });
      const fileUploadResult = await jigsawstack.store.upload(blob, {
        filename: file.name,
        overwrite: true,
      });

      const resp = await fetch("/api/vocr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: collect.split(","),
          file_store_key: fileUploadResult.key,
        }),
      });
      const result = await resp.json();
      if (!resp.ok) {
        toast.error(result?.message || "Unable to complete translation");
        return;
      }

      setResult(result);
      toast.success("Your file has been successfully");
    } catch (error) {
      let err = error as any;
      console.error(error);
      toast.error(err?.message || "Unable to complete vocr");
    } finally {
      toggleLoading();
    }
  };

  const cleanResult = (result: VocrResponse) => {
    const d: Record<string, Array<string>> = result.context as any;
    const keys = Object.keys(d);
    const formattedResult: Record<string, string> = {};
    keys.forEach((key) => {
      formattedResult[key] = d[key].join(", ");
    });

    return formattedResult;
  };

  return (
    <div className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-12 sm:mt-20">
      <h1 className="sm:text-6xl text-4xl max-w-[708px] font-bold text-slate-900 mb-10">
        Describe and retrieve data within an image
      </h1>

      <div className="w-full mb-8">
        <FileUploader
          onFileChange={(file) => {
            setFile(file);
            setResult(undefined);
          }}
        />
      </div>

      <div className="w-full">
        <p className="text-left font-bold mb-2">
          Data to extract{" "}
          <span className="font-medium">
            (separate with commas to add multiple items)
          </span>
        </p>
        <Input
          value={collect}
          onChange={(e) => setCollect(e.target.value)}
          className="w-full bg-gray-200 rounded-md py-2 px-2  border-2 border-primary shadow-sm focus:border-black focus:ring-black"
          placeholder={"e.g. First name, last name"}
        />
      </div>

      <Button
        onClick={handleExtract}
        className="bg-primary rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 flex hover:bg-black/80 w-full items-center justify-center cursor-pointer"
        disabled={loading || !file}
      >
        {loading ? <LoadingSpinner /> : "Extract data"}
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
              Extraction results
            </Text>
            {Object.keys(result.context).map((key, index) => {
              return (
                <Text key={index} mb={2}>
                  {key}: {cleanResult(result)[key]}
                </Text>
              );
            })}
          </div>
        </Flex>
      )}
    </div>
  );
};
