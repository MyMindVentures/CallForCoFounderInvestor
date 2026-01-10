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
- Admin pastes Mermaid diagram source in Admin → Media → Mindmap (copy/paste text input).
- Mermaid source is stored in the `content` table under pageId `mindmap` (single shared version, not language-specific).
- Public viewer lives at `/mindmap`; the Storytelling page links to it for full-screen zoom/pan.

## Admin Video Scripts & Recording
- Video scripts are stored in the `content` table under pageId `video-script-story`, `video-script-proposal`, and `video-script-proof` (single shared version, not language-specific).
- Admin → Media → Videos includes a teleprompter view, scroll speed selector, and a Record & Upload workflow that sends recorded clips to Cloudinary using the existing media upload endpoint.
- Video script content endpoints are admin-protected and require a valid admin token.

## Storytelling Subtitles, Transcripts, and Comments
- Video subtitles are stored in the `content` table under pageId `video-subtitles-story`, `video-subtitles-proposal`, and `video-subtitles-proof` (language-specific).
- Video transcripts are stored in the `content` table under pageId `video-transcript-story`, `video-transcript-proposal`, and `video-transcript-proof` (language-specific).
- Storytelling comments are stored in the `story_comments` table and can be curated (positive/published) in Admin → Comments.

## How to test
- `curl -i http://localhost:3000/api/health` and confirm it returns HTTP 200 with `status` set to `OK` or `DEGRADED` depending on database connectivity.
- Paste Mermaid source in Admin → Media → Mindmap, save, then visit `/storytelling` and click the mindmap to confirm the full-screen viewer renders and supports zoom/pan.
- In Admin → Media → Videos, paste scripts, verify teleprompter scroll speed slider changes, record a clip, delete the recording if needed, and confirm the video replaces the existing Cloudinary-hosted media.
- In Admin → Media → Videos, paste WebVTT subtitles and transcripts for each video language, save, and confirm subtitles appear on `/storytelling` with the transcript displayed beneath each video.
- In `/storytelling`, open the comments panel, submit a new comment, and in Admin → Comments toggle Positive/Publish to confirm visibility updates.
- Verify `/api/content/video-script-story` returns HTTP 401 without an admin token and succeeds when authenticated.
