import { MediaScript } from "@frontmatter/extensibility";

const { workspacePath, mediaPath, answers } = MediaScript.getArguments();

console.log(workspacePath, mediaPath, answers);