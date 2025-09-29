// src/ai/flows/suggest-style-modifications.ts
'use server';

/**
 * @fileOverview This file defines a Genkit flow for suggesting style modifications to a given HTML template.
 *
 * - suggestStyleModifications - A function that takes HTML template content and suggests modifications to its style (colors, fonts, layout) using AI.
 * - SuggestStyleModificationsInput - The input type for the suggestStyleModifications function.
 * - SuggestStyleModificationsOutput - The return type for the suggestStyleModifications function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestStyleModificationsInputSchema = z.object({
  htmlContent: z
    .string()
    .describe('The HTML content of the template to be styled.'),
});
export type SuggestStyleModificationsInput = z.infer<
  typeof SuggestStyleModificationsInputSchema
>;

const SuggestStyleModificationsOutputSchema = z.object({
  suggestedStyles: z
    .string()
    .describe(
      'AI-suggested CSS styles to modify the colors, fonts, or layout of the given HTML content.'
    ),
});
export type SuggestStyleModificationsOutput = z.infer<
  typeof SuggestStyleModificationsOutputSchema
>;

export async function suggestStyleModifications(
  input: SuggestStyleModificationsInput
): Promise<SuggestStyleModificationsOutput> {
  return suggestStyleModificationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestStyleModificationsPrompt',
  input: {schema: SuggestStyleModificationsInputSchema},
  output: {schema: SuggestStyleModificationsOutputSchema},
  prompt: `You are an AI assistant that helps web developers to quickly improve the look and feel of their websites.

  Based on the given HTML content, suggest CSS styles to modify the colors, fonts, or layout. Provide only the CSS code that implements the suggestions, and nothing else.

  HTML content: {{{htmlContent}}}
  `,
});

const suggestStyleModificationsFlow = ai.defineFlow(
  {
    name: 'suggestStyleModificationsFlow',
    inputSchema: SuggestStyleModificationsInputSchema,
    outputSchema: SuggestStyleModificationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
