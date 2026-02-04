---
name: Napkin Generator
description: Generates a napkin-style sketch image for a given topic and saves it to src/assets.
---

# Napkin Generator Skill

Use this skill when the user wants a "napkin style", "hand drawn", or "rough sketch" image, especially for the RepoMovil project.

## Instructions

1.  **Analyze the Request**: Identify the specific subject or concept to illustrate (e.g., "login process", "database schema").

2.  **Generate the Image**:
    *   Call the `generate_image` tool.
    *   **ImageName**: `napkin_[subject_snake_case]` (e.g., `napkin_login_flow`).
    *   **Prompt**: 
        > "Photorealistic top-down view of a white paper napkin with a hand-drawn diagram on it. The diagram depicts [SUBJECT]. Drawn in blue ballpoint pen. fast, loose, sketchy lines. Arrows, simple boxes, scribbled text (illegible). The napkin has texture and slight creases. Lighting is soft, realistic. The style is 'napkin back-of-the-envelope calculation'. Context: Mobile repair business technical notes."

3.  **Locate and Move**:
    *   The `generate_image` tool will save the file to the artifacts directory. Examples of this path are usually shown in the tool output (e.g., `/Users/name/.gemini/antigravity/brain/...`).
    *   You MUST move or copy this file to the project's assets folder: `src/assets/`.
    *   Construct the target path: `src/assets/napkin_[subject_snake_case].png`.
    *   Use `run_command` to copy the file.
        *   Command: `Copy-Item -Path '[ARTIFACT_PATH]' -Destination 'src/assets/napkin_[subject_snake_case].png'`

4.  **Confirm**:
    *   Notify the user that the image has been generated and saved to `src/assets/`.
    *   Provide the usage example for Markdown/MDX: `![Description](@assets/napkin_[subject_snake_case].png)`.
