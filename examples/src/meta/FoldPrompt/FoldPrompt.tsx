import * as Priompt from "@anysphere/priompt";
import {
  PreviewConfig,
  PreviewManager,
  PromptElement,
  PromptProps,
  SystemMessage,
} from "@anysphere/priompt";

const FoldPromptConfig: PreviewConfig<FoldPromptProps> = {
  id: "foldPrompt",
  prompt: FoldPrompt,
};
PreviewManager.registerConfig(FoldPromptConfig);
// Define the properties (inputs) that our reusable prompt will accept.
export type FoldPromptProps = PromptProps<{
  /** The persona the AI should adopt. */
  role: string;
  /** A brief description of the overall task. */
  taskDescription: string;
  /** The raw, unstructured content that needs to be "folded". */
  rawContent: string;
  /** A description or template of the desired output format. */
  outputFormat: string;
}>;

/**
 * A reusable Priompt component that instructs an LLM to "fold"
 * unstructured text into a clear, structured format.
 */
export function FoldPrompt(
  props: FoldPromptProps,
  args?: { dump?: boolean }
): PromptElement {
  if (args?.dump === true) {
    PreviewManager.dump(FoldPromptConfig, props);
  }
  return (
    <>
      <SystemMessage>
        You are an expert {props.role}. Your task is to {props.taskDescription}.
        You will be given raw text that needs to be processed. Please "fold"
        this raw text into the structured format specified below. Do not add any
        commentary or introductory phrases; provide only the structured output.
        **Raw Text to Process:** ---
        {props.rawContent}
        --- **Required Output Format:** ---
        {props.outputFormat}
        --- Now, please perform the transformation.
      </SystemMessage>
    </>
  );
}
