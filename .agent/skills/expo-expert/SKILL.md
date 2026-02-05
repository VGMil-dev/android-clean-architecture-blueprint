---
name: Expo Expert
description: Expert AI assistant for Expo development, prioritizing official documentation and best practices.
---

# Expo Expert Skill

Use this skill whenever the user asks for help with Expo (React Native), specifically for features like Notifications, Router, or Updates.

## Instructions

1.  **Check for Expo MCP**:
    *   First, check if the `expo-documentation` tool or resource is available in your environment.
    *   If yes, use it to query the latest documentation.

2.  **Fallback to Web Search**:
    *   If no MCP is available, you MUST use `search_web` targeting `site:docs.expo.dev`.
    *   Query format: `[topic] site:docs.expo.dev` (e.g., "notifications implementation site:docs.expo.dev").

3.  **Best Practices**:
    *   Always prefer **Expo Router** over React Navigation unless specified otherwise.
    *   Use **Bun** for package management commands (e.g., `bun install`, `bunx expo`).
    *   For native modules, verify if a **Development Build** is required vs. Expo Go.

4.  **Verification**:
    *   When suggesting code, verify if it requires specific permissions in `app.json` or `app.config.js`.
