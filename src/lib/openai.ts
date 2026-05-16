import OpenAI from "openai";

// Lazy initialization — only create client when actually called (not at build time)
function getOpenAIClient() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error(
      "OPENAI_API_KEY is not set. Add it to your Vercel environment variables."
    );
  }
  return new OpenAI({ apiKey });
}

interface OpenAIInput {
  imageBase64: string;
  mimeType: string;
  prompt: string;
}

export async function generateWithOpenAI({
  imageBase64,
  mimeType,
  prompt,
}: OpenAIInput): Promise<string> {
  const openai = getOpenAIClient();
  const buffer = Buffer.from(imageBase64, "base64");
  const blob = new Blob([buffer], { type: mimeType });
  const file = new File([blob], "product.jpg", { type: mimeType });

  const response = await openai.images.edit({
    model: "gpt-image-1",
    image: file,
    prompt: prompt,
    size: "1024x1024",
    quality: "high",
  });

  const imageUrl = response.data?.[0]?.url;
  if (!imageUrl) throw new Error("OpenAI did not return an image URL");

  const imgResponse = await fetch(imageUrl);
  const arrayBuffer = await imgResponse.arrayBuffer();
  return Buffer.from(arrayBuffer).toString("base64");
}
