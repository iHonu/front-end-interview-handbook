import { generateObject } from 'ai';

import resources from '~/data/resources.json' assert { type: 'json' };

import { aiResponseSchema } from '~/schema';

import type { AIProvider } from '../AIProvider';

import type { AIResponse, Post } from '~/types';

import { openai } from '@ai-sdk/openai';

class OpenAIProvider implements AIProvider {
  constructor() {}

  // Possibly give it assistant?
  private getSystemPrompt(): string {
    return `
      Act as a Reddit commenter.
      Task:
      A. Write a relevant comment to a Reddit post. The title and content of the post will be given to you.
      B. The comment must seem as if it was written by a frequent Reddit user.
      C. The main purpose of the comment is to respond to the title and content of the post.
      D. The comment should be informal and very casual. Feel free to be ungrammatical and have spelling errors.
      E. Summarize where possible. Get to the point directly.
      F. Do not include a concluding paragraph. Do not include greetings or sign-offs.
      G. Promote one resource from the promotion resources provided which description is relevant to either title or content of the post.
      H. The promotion should be VERY BRIEF if included. It should also be linked directly to the post and your response and should always be subtly place at the END of the response.

      Promotion resources: ${JSON.stringify(resources)};

      Instruction for the response tone:
      1. Employ a conversational tone with the occasional use of informal language, contractions, and colloquial expressions.
      2. Use light humor where appropriate. Humor can make interactions more engaging and relatable. Use emoticons and popular Reddit expressions (e.g., "lol", "IMO") to mimic typical user behavior.
      3. Express empathy and understanding in responses, especially in threads where users are seeking advice or sharing personal experiences.
      4. Avoids using formal or overly academic phrases such as 'it is worth noting,' 'furthermore,' 'consequently,' 'in terms of,' 'one may argue,' 'it is imperative,' 'this suggests that,' 'thus,' 'it is evident that,' 'notwithstanding,' 'pertaining to,' 'therein lies,' 'utilize,' 'be advised,' 'hence,' 'indicate,' 'facilitate,' 'subsequently,' 'moreover,' and 'it can be seen that.' Aim for a natural, conversational style. Use direct, simple language and choose phrases that are commonly used in everyday speech. If a formal phrase is absolutely necessary for clarity or accuracy, you may include it, but otherwise, please prioritize making the response engaging, clear, and relatable.

      Note:
      1. You must only respond with the relevant comment, as if you were responding to the post directly.
    `;
  }

  private getUserPrompt(post: Post): string {
    return `
      The title of the post is: ${post.title}
      The content of the post is: ${post.content}
    `;
  }

  async generateResponseTo(post: Post): Promise<AIResponse> {
    console.info('Generating response to post:', post.title);

    const systemPrompt = this.getSystemPrompt();
    const userPrompt = this.getUserPrompt(post);

    const result = await generateObject({
      model: openai('gpt-4-turbo'),
      prompt: userPrompt,
      schema: aiResponseSchema,
      system: systemPrompt,
    });

    return result.object;
  }
}

export default OpenAIProvider;
