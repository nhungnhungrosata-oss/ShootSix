import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

interface GeminiInput {
  imageBase64: string;
  mimeType: string;
  prompt: string;
}

export async function generateWithGemini({
  imageBase64,
  mimeType,
  prompt,
}: GeminiInput): Promise<string> {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp-image-generation",
    generationConfig: {
      responseModalities: ["Text", "Image"],
    } as any,
  });

  const result = await model.generateContent([
    {
      inlineData: {
        data: imageBase64,
        mimeType: mimeType as any,
      },
    },
    { text: prompt },
  ]);

  const response = result.response;

  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData?.mimeType?.startsWith("image/")) {
      return part.inlineData.data;
    }
  }

  throw new Error("Gemini did not return an image");
}
