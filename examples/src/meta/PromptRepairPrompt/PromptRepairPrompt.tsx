import * as Priompt from "@anysphere/priompt";
import {
  PreviewConfig,
  PreviewManager,
  PromptElement,
  PromptProps,
  SystemMessage,
} from "@anysphere/priompt";

const PromptRepairPromptConfig: PreviewConfig<PromptRepairPromptProps> = {
  id: "promptRepairPrompt",
  prompt: PromptRepairPrompt,
};
PreviewManager.registerConfig(PromptRepairPromptConfig);

// Props for the standalone repair prompt
export type PromptRepairPromptProps = PromptProps<{
  /** The original prompt that failed. */
  originalPrompt: string;
  /** The failed LLM output that was produced. */
  failedOutput: string;
  /** The expected or desired output format/content. */
  expectedOutput: string;
  /** Type of failure (optional context). */
  failureType?: "insufficient_information" | "hallucination" | "format_error" | "logic_error" | "multimodal_error" | "content_parsing_error" | "other";
  /** Additional context about the failure (optional). */
  failureContext?: string;
  /** Input content that was processed (text, image descriptions, file contents, etc.). */
  inputContent?: {
    /** Type of input content. */
    type: "text" | "image" | "pdf" | "document" | "multimodal" | "other";
    /** The actual content or description of the input. */
    content: string;
    /** Additional metadata about the input (file size, format, quality, etc.). */
    metadata?: Record<string, any>;
  }[];
}>;

/**
 * A standalone prompt repair component that analyzes failed LLM outputs
 * and suggests improvements to the original prompt.
 */
export function PromptRepairPrompt(
  props: PromptRepairPromptProps,
  args?: { dump?: boolean }
): PromptElement {
  if (args?.dump === true) {
    PreviewManager.dump(PromptRepairPromptConfig, props);
  }
  return (
    <>
      <SystemMessage>
        You are an expert prompt engineer and LLM QA reviewer. Your task is to analyze a failed LLM interaction and suggest specific improvements to the original prompt that would prevent this type of failure in the future.

        **ANALYSIS TASK:**
        Review the failed output against the original prompt and input content, then identify what went wrong and provide concrete suggestions for prompt improvements.

        **ORIGINAL PROMPT:**
        ---
        {props.originalPrompt}
        ---

        {props.inputContent && props.inputContent.length > 0 && (
          <>
            **INPUT CONTENT:**
            {props.inputContent.map((input, index) => (
              `INPUT ${index + 1} (${input.type.toUpperCase()}):
              ${input.content}
              ${input.metadata ? `Metadata: ${JSON.stringify(input.metadata)}` : ''}
              ---`
            )).join('\n')}
          </>
        )}

        **FAILED OUTPUT:**
        ---
        {props.failedOutput}
        ---

        **EXPECTED OUTPUT:**
        ---
        {props.expectedOutput}
        ---

        {props.failureType && `**FAILURE TYPE:** ${props.failureType}`}
        {props.failureContext && `**ADDITIONAL CONTEXT:** ${props.failureContext}`}

        **PROVIDE YOUR ANALYSIS IN THIS EXACT FORMAT:**

        ```json
        {
          "failureAnalysis": {
            "rootCause": "primary reason the prompt failed",
            "specificIssues": ["list", "of", "specific", "problems", "identified"],
            "missingElements": ["what", "the", "prompt", "lacked"],
            "ambiguousInstructions": ["instructions", "that", "were", "unclear"],
            "inputContentIssues": ["problems", "related", "to", "processing", "the", "specific", "input", "content"],
            "modalityProblems": ["issues", "with", "handling", "images", "pdfs", "or", "other", "content", "types"]
          },
          "promptImprovements": {
            "structuralChanges": ["major", "structural", "modifications", "needed"],
            "clarifications": ["specific", "instructions", "to", "add", "or", "clarify"],
            "constraints": ["new", "constraints", "or", "validation", "rules", "to", "add"],
            "examples": ["examples", "or", "demonstrations", "to", "include"],
            "safeguards": ["safety", "measures", "to", "prevent", "similar", "failures"],
            "contentHandling": ["improvements", "for", "processing", "specific", "content", "types"],
            "multimodalInstructions": ["specific", "guidance", "for", "images", "pdfs", "documents"]
          },
          "revisedPrompt": "Complete improved version of the original prompt with all suggested changes incorporated, including specific instructions for handling the input content types",
          "expectedImprovements": ["specific", "improvements", "this", "revision", "should", "achieve"],
          "testingRecommendations": ["how", "to", "test", "the", "improved", "prompt", "with", "similar", "input", "content"]
        }
        ```

        Focus on actionable, specific improvements rather than general advice. Pay special attention to how the prompt should handle the specific types of input content that caused the failure. The revised prompt should be immediately usable and address the identified failure modes.
      </SystemMessage>
    </>
  );
}