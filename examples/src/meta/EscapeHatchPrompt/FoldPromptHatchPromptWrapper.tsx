import * as Priompt from "@anysphere/priompt";
import { SystemMessage } from "@anysphere/priompt";
import { EscapeHatchWrapper } from "./EscapeHatchPrompt";
import { FoldPrompt } from "../FoldPrompt/FoldPrompt";

// Example: Adding escape hatch behavior to the existing FoldPrompt
export function FoldPromptWithEscapeHatch() {
  return (
    <EscapeHatchWrapper
      requiredInfo="Complete raw content text that can be meaningfully structured"
      providedInfo="Partial transcript with [unclear] sections and missing context"
    >
      <FoldPrompt
        role="Project Manager"
        taskDescription="analyze a raw meeting transcript and organize it into a concise summary"
        rawContent="[Audio quality was poor] Someone mentioned the budget... [unclear] ..."
        outputFormat="1. Key Decisions:\n2. Action Items:\n3. Blockers:\n4. For Follow-up:"
      />
    </EscapeHatchWrapper>
  );
}

// Example: Adding escape hatch to any custom prompt
export function CustomPromptWithEscapeHatch() {
  return (
    <EscapeHatchWrapper
      requiredInfo="User's specific technical issue, device info, and reproduction steps"
      providedInfo="Vague complaint about app 'not working'"
    >
      <SystemMessage>
        You are a technical support specialist. Analyze the user's issue and
        create a support ticket. Format your response as: - Issue Summary:
        [brief description] - Technical Details: [device, version, etc.] -
        Troubleshooting Steps: [numbered list]
      </SystemMessage>
    </EscapeHatchWrapper>
  );
}
