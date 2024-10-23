import { JigsawStack } from "jigsawstack";

const jigsawstack = JigsawStack();

export async function POST(request: Request) {
  try {
    // Get the JSON body from the request
    const body: { text: string } = await request.json();
    const result = await jigsawstack.sentiment({ text: body.text });
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
