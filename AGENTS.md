# Production Environment Notes

- This repository is running in production.
- Do not load or depend on `.env` files in runtime code.
- All configuration must come from real environment variables (e.g., Railway Variables).
- Any new feature requiring configuration must be added to production variables.

## Delivery Standards (Keep This Updated)
- Update this file whenever new features, services, or configuration are introduced.
- Record any new environment variables in this file (name, purpose, required/optional, and which service consumes it).
- Document any data persistence changes (e.g., mounted volumes, database file paths).
- Add a short "How to test" note for any new feature or behavior change.

## Current Runtime Configuration
- `DB_PATH` (optional): Absolute path to the persistent SQLite database file for the backend service.
- `RAILWAY_VOLUME_MOUNT_PATH` (optional): Railway-provided mount path for persistent storage; when set, the backend stores the SQLite database at `${RAILWAY_VOLUME_MOUNT_PATH}/database.db`.

## Feature Implementation Expectations
- Keep feature changes small and composable; avoid introducing unnecessary dependencies.
- Add/adjust backend migrations and data-handling logic for any new persistence requirements.
- Ensure frontend changes respect accessibility (focus states, touch targets, readable contrast).
- Validate that language and theme settings persist in localStorage and render without flash.

## Release Hygiene
- Run targeted lint/test checks where possible and report skipped checks in status output.
- Confirm that Railway configuration is updated before release when new env vars are required.

## Mindmap Mermaid Viewer
- Admin uploads a Mermaid diagram file (`.mmd`, `.mermaid`, `.md`, `.txt`) in Admin → Media → Mindmap.
- Mermaid source is stored in the `content` table under pageId `mindmap` (single shared version, not language-specific).
- Public viewer lives at `/mindmap`; the Storytelling page links to it for full-screen zoom/pan.

## How to test
- `curl -i http://localhost:3000/api/health` and confirm it returns HTTP 200 with `status` set to `OK` or `DEGRADED` depending on database connectivity.
- Upload a Mermaid file in Admin → Media → Mindmap, then visit `/storytelling` and click the mindmap to confirm the full-screen viewer renders and supports zoom/pan.
