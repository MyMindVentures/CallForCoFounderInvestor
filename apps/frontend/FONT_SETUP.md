# TT Hoves Pro Font Setup Guide

This guide explains how to add TT Hoves Pro font to your project.

## About TT Hoves Pro

TT Hoves Pro is a highly adaptable sans-serif typeface designed by TypeType Foundry. It features:
- Neutral yet recognizable character
- Excellent readability at all sizes
- Multiple weights and styles
- Professional and versatile design

## License Information

⚠️ **Important**: TT Hoves Pro is a commercial font that requires a license for use.

- **Personal Use**: Trial version available (free for personal use only)
- **Commercial Use**: Requires purchase from [MyFonts](https://www.myfonts.com/collections/tt-hoves-font-typetype/) or TypeType Foundry
- **Full Family**: Includes 98 fonts, priced at $659.00 USD

## Setup Instructions

### Step 1: Obtain Font Files

1. **If you have a license**: Download the font files from your TypeType account
2. **For testing**: Download the trial version (personal use only)
3. Ensure you have the following weights:
   - Regular (400)
   - Medium (500)
   - SemiBold (600)
   - Bold (700)
   - ExtraBold (800)

### Step 2: Add Font Files to Project

1. Create a `fonts` directory in `apps/frontend/public/`:
   ```bash
   mkdir -p apps/frontend/public/fonts
   ```

2. Copy your TT Hoves Pro font files to `apps/frontend/public/fonts/`

   Recommended file structure:
   ```
   apps/frontend/public/fonts/
   ├── TTHovesPro-Regular.woff2
   ├── TTHovesPro-Regular.woff
   ├── TTHovesPro-Medium.woff2
   ├── TTHovesPro-Medium.woff
   ├── TTHovesPro-SemiBold.woff2
   ├── TTHovesPro-SemiBold.woff
   ├── TTHovesPro-Bold.woff2
   ├── TTHovesPro-Bold.woff
   ├── TTHovesPro-ExtraBold.woff2
   └── TTHovesPro-ExtraBold.woff
   ```

### Step 3: Enable Font Face Declarations

1. Open `apps/frontend/src/index.css`
2. Find the commented `@font-face` declarations at the top
3. Uncomment them
4. Update file paths if your font files have different names

Example:
```css
@font-face {
  font-family: 'TT Hoves Pro';
  src: url('/fonts/TTHovesPro-Regular.woff2') format('woff2'),
       url('/fonts/TTHovesPro-Regular.woff') format('woff');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
```

### Step 4: Verify Font Loading

1. Start your development server: `npm run dev`
2. Open browser DevTools → Network tab
3. Filter by "Font"
4. Verify that TT Hoves Pro fonts are loading
5. Check the Elements tab to confirm the font is being used

## Font Format Recommendations

### Preferred Formats (in order):
1. **WOFF2** - Best compression, widest browser support
2. **WOFF** - Good compression, fallback for older browsers
3. **TTF/OTF** - Original formats, larger file sizes

### Converting Fonts

If you only have TTF/OTF files, convert them to WOFF2:

**Using online tools:**
- [CloudConvert](https://cloudconvert.com/ttf-to-woff2)
- [FontSquirrel Webfont Generator](https://www.fontsquirrel.com/tools/webfont-generator)

**Using command line (with fonttools):**
```bash
pip install fonttools[woff]
pyftsubset TTHovesPro-Regular.ttf --output-file=TTHovesPro-Regular.woff2 --flavor=woff2
```

## Current Font Stack

The app is configured to use:

1. **Primary**: TT Hoves Pro (if loaded)
2. **Fallback**: System fonts (SF Pro, Roboto, Segoe UI)
3. **Web Font**: Geist Sans
4. **Universal**: Arial, sans-serif

## Testing Without Font Files

If you don't have TT Hoves Pro yet, the app will automatically fall back to:
- System fonts (SF Pro on Mac, Roboto on Android, Segoe UI on Windows)
- Geist Sans web font

The design will still look great with these fallbacks!

## Troubleshooting

### Font Not Loading

1. Check file paths in `@font-face` declarations
2. Verify files exist in `public/fonts/` directory
3. Check browser console for 404 errors
4. Ensure file names match exactly (case-sensitive)

### Font Not Applying

1. Clear browser cache
2. Check DevTools → Elements → Computed styles
3. Verify font-family stack includes 'TT Hoves Pro'
4. Check that font-weight matches available weights

### Performance Issues

1. Use WOFF2 format (smallest file size)
2. Only include weights you actually use
3. Use `font-display: swap` (already configured)
4. Consider subsetting fonts to include only needed characters

## Additional Resources

- [TT Hoves Pro on MyFonts](https://www.myfonts.com/collections/tt-hoves-font-typetype/)
- [TypeType Foundry](https://typetype.org/)
- [Web Font Best Practices](https://web.dev/font-best-practices/)

## Support

If you need help setting up TT Hoves Pro, ensure you have:
1. Valid font license
2. Font files in correct format
3. Files placed in correct directory
4. `@font-face` declarations uncommented

The font stack is already configured - you just need to add the font files!
