# Production Environment Notes

- This repository is running in production.
- Do not load or depend on `.env` files in runtime code.
- All configuration must come from real environment variables (e.g., Railway Variables).
- Any new feature requiring configuration must be added to production variables.
