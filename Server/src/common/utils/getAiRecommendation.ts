import { Request, Response } from "express";
import { config } from "../../config/app.config";
import { NotFoundException } from "./catchError";
import { ErrorCode } from "../enums/error-code.enum";

export async function getAIRecommendation(
  req: Request,
  res: Response,
  userPrompt: string,
  products: any
) {
  const API_KEY = config.GEMINI_API_KEY;
  const URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

  try {
    const geminiPrompt = `
        You are a product recommendation AI assistant.

        Here is a list of avaiable products (in JSON):
        ${JSON.stringify(products, null, 2)}

        Based on the following user request, filter and suggest the best matching products:
        "${userPrompt}"

        Please:
        - Select only products that match user's intent.
        - Output ONLY valid JSON array of matching products.
        - Do NOT include any text or comments before or after JSON.
    `;

    const response = await fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: geminiPrompt }] }],
      }),
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponseText =
      data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "";

    const cleanedText = aiResponseText.replace(/```json|```/g, ``).trim();

    // Attempt to fix minor JSON issues automatically
    let parsedProducts;
    try {
      parsedProducts = JSON.parse(cleanedText);
    } catch {
      // Try to fix common JSON issues
      const fixed = cleanedText
        .replace(/[\n\r]/g, "")
        .replace(/,\s*}/g, "}")
        .replace(/,\s*]/g, "]");
      parsedProducts = JSON.parse(fixed);
    }

    // Ensure it's an array
    if (!Array.isArray(parsedProducts)) {
      throw new Error("AI response is not an array");
    }

    return { success: true, products: parsedProducts };
  } catch (error: any) {
    console.error("❌ AI recommendation error:", error.message);
    throw new NotFoundException(
      "Không có phản hồi từ AI",
      ErrorCode.RESOURCE_NOT_FOUND
    );
  }
}
