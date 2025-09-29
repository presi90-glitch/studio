
"use server";

import { suggestStyleModifications } from "@/ai/flows/suggest-style-modifications";

export async function getAiSuggestions(htmlContent: string) {
  if (!htmlContent) {
    return { success: false, error: "HTML content is empty." };
  }
  try {
    const result = await suggestStyleModifications({ htmlContent });
    return { success: true, data: result.suggestedStyles };
  } catch (error) {
    console.error("AI suggestion error:", error);
    return {
      success: false,
      error: "Failed to get AI suggestions. Please try again later.",
    };
  }
}
