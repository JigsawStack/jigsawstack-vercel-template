import { JigsawStack } from "jigsawstack";

const jigsawstack = JigsawStack({
  apiKey: process.env.JIGSAWSTACK_PUBLIC_KEY,
});

export async function POST(request: Request) {
  try {
    // Get the JSON body from the request
    const body: { prompt: string[]; file_store_key: string } =
      await request.json();

    const result = await jigsawstack.vision.vocr({
      prompt: body.prompt,
      file_store_key: body.file_store_key,
    });
    return Response.json({
      ...result,
    });
  } catch (error) {
    console.error(error);
    let err = error as any;
    return new Response(
      JSON.stringify({ error: err.message || "Unable to complete request" }),
      {
        status: 400,
      }
    );
  }
}
