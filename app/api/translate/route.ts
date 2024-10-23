import { JigsawStack } from "jigsawstack";

const jigsawstack = JigsawStack();

export async function POST(request: Request) {
  try {
    // Get the JSON body from the request
    const body: { text: string; target_language: string } =
      await request.json();

    const result = await jigsawstack.translate({
      text: body.text,
      target_language: body.target_language || "es",
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
