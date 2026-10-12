# Superpowers Engineering Rules

This workspace is powered by **Superpowers**, an agentic software development framework enforcing engineering discipline on AI coding tasks.

## Core Rules

1. **Invoke relevant skills before acting**:
   - Starting creative work or new features? Invoke `brainstorming` first.
   - Fixing a bug? Invoke `systematic-debugging` first.
   - Starting multi-step implementation? Invoke `writing-plans` and `executing-plans`.
   - Writing code? Follow `test-driven-development` (Red-Green-Refactor).
   - Finishing a task? Run `verification-before-completion`.

2. **Antigravity Tool Mapping**:
   - **Task tracking / Checklists**: Antigravity has no interactive todo tool. Maintain a **task artifact** markdown file in the artifact directory (`write_to_file` with `IsArtifact: true` and `ArtifactMetadata.ArtifactType: "task"`), updating checkboxes (`- [x]`) using `replace_file_content` / `multi_replace_file_content` as progress is made.
   - **Subagents**: Use `invoke_subagent` (or `browser_subagent` for web UI verification) when parallel or specialized exploration is required.

3. **Anti-Rationalization**:
   - Do not skip planning, testing, or verification because a task "seems simple" or "should be quick".
   - Always confirm tests pass and behavior is verified before declaring work complete.
