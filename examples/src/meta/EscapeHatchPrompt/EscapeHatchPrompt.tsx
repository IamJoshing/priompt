import * as Priompt from "@anysphere/priompt";
import {
  PreviewConfig,
  PreviewManager,
  PromptElement,
  PromptProps,
  SystemMessage,
} from "@anysphere/priompt";

const EscapeHatchWrapperConfig: PreviewConfig<EscapeHatchWrapperProps> = {
  id: "escapeHatchWrapper",
  prompt: EscapeHatchWrapper,
};
PreviewManager.registerConfig(EscapeHatchWrapperConfig);

// Props for the wrapper component
export type EscapeHatchWrapperProps = PromptProps<{
  /** The information required to complete the task successfully. */
  requiredInfo: string;
  /** The information that has actually been provided. */
  providedInfo: string;
  /** Children prompt components to wrap with escape hatch behavior. */
  children?: PromptElement | PromptElement[];
}>;

/**
 * A wrapper component that adds escape hatch behavior to any existing prompt.
 * Wraps your existing prompt and adds instructions to stop and ask for help
 * when insufficient information is provided.
 */
export function EscapeHatchWrapper(
  props: EscapeHatchWrapperProps,
  args?: { dump?: boolean }
): PromptElement {
  if (args?.dump === true) {
    PreviewManager.dump(EscapeHatchWrapperConfig, props);
  }
  return (
    <>
      <SystemMessage>
        **ESCAPE HATCH INSTRUCTIONS:** Before proceeding with your task, you
        must evaluate whether you have sufficient information. **Required
        Information:**
        {props.requiredInfo}
        **Provided Information:**
        {props.providedInfo}
        **CRITICAL: If you lack sufficient information, do NOT proceed with the
        task. Instead, output a debugInfo object with this exact structure:**
        ```json
        {{
          status: "insufficient_information",
          stoppedAt: "describe exactly where in the process you stopped",
          attemptedStep:
            "what step you were trying to complete when you realized information was missing",
          missingInfo: ["list", "of", "specific", "missing", "information"],
          providedInfo: ["list", "of", "what", "was", "provided"],
          partialProgress: "any work completed before stopping",
          nextSteps: ["specific", "questions", "or", "information", "needed"],
          confidence: 0.0,
        }}
        ``` **Only if you have sufficient information should you proceed with
        the task below.**
      </SystemMessage>

      {props.children}
    </>
  );
}

// Standalone escape hatch component for when you need just the escape hatch behavior
export type EscapeHatchPromptProps = PromptProps<{
  /** The persona the AI should adopt. */
  role: string;
  /** A brief description of the task to be completed. */
  taskDescription: string;
  /** List of information required to complete the task successfully. */
  requiredInfo: string;
  /** The information that has actually been provided. */
  providedInfo: string;
  /** A description or template of the desired output format when sufficient info is available. */
  outputFormat: string;
}>;

/**
 * Standalone escape hatch prompt for cases where you need a complete prompt
 * with escape hatch behavior built in.
 */
export function EscapeHatchPrompt(
  props: EscapeHatchPromptProps,
  args?: { dump?: boolean }
): PromptElement {
  return (
    <EscapeHatchWrapper
      requiredInfo={props.requiredInfo}
      providedInfo={props.providedInfo}
    >
      <SystemMessage>
        You are an expert {props.role}. Your task is to {props.taskDescription}.
        **Required Output Format (when sufficient info is available):**
        {props.outputFormat}
      </SystemMessage>
    </EscapeHatchWrapper>
  );
}
