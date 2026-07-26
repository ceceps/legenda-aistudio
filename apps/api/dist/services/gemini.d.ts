import { type MasterPromptInput, type Screenplay, type StoryboardScene, type AudioPrompt, StoryStyle } from '@legenda/shared-types';
export declare function generateScreenplay(input: MasterPromptInput): Promise<Screenplay>;
export declare function generateStoryboard(screenplay: Screenplay, style: StoryStyle): Promise<StoryboardScene[]>;
export declare function generateAudioPrompts(screenplay: Screenplay): Promise<AudioPrompt[]>;
//# sourceMappingURL=gemini.d.ts.map