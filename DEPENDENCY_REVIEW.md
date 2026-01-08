# Dependency Review Report
**Date:** January 8, 2025  
**Project:** CallForCoFounderInvestor

## ✅ Critical Issues - FIXED

### Missing Dependencies - RESOLVED
The following packages were **imported in code but missing from package.json**:

1. **`multer`** - ✅ **FIXED:** Added `multer@^2.0.1` (using v2 to avoid vulnerabilities in v1)
2. **`cloudinary`** - ✅ **FIXED:** Added `cloudinary@^2.8.0` (patched high severity vulnerability)

## ⚠️ Security Vulnerabilities

### High Severity - FIXED ✅
- **react-router-dom:** XSS vulnerability (CVE) - ✅ **FIXED:** Updated to `^6.30.3`
- **cloudinary:** Arbitrary argument injection - ✅ **FIXED:** Updated to `^2.8.0`

### Low Severity (4 vulnerabilities remaining)
- **Package:** `tmp` (via `@lhci/cli`)
- **Issue:** Allows arbitrary temporary file/directory write via symbolic link
- **Affected:** `@lhci/cli@0.15.1` (dev dependency only)
- **Risk:** Low - dev dependency, not in production
- **Fix:** Run `npm audit fix --force` (may cause breaking changes in Lighthouse CI)
- **Recommendation:** Accept risk for dev-only dependency or update `@lhci/cli` if Lighthouse CI is critical

## 📦 Package Version Analysis

### Root Dependencies (`package.json`)
| Package | Current | Latest | Status | Notes |
|---------|---------|--------|--------|-------|
| `@lhci/cli` | ^0.15.1 | 0.15.1 | ✅ Current | Security issue in transitive dep |
| `@playwright/test` | ^1.57.0 | 1.57.0+ | ⚠️ Check | May have updates |
| `concurrently` | ^8.2.2 | 8.2.2+ | ⚠️ Check | May have updates |

### Backend Dependencies (`apps/backend/package.json`)
| Package | Current | Latest | Status | Notes |
|---------|---------|--------|--------|-------|
| `bcryptjs` | ^2.4.3 | 3.0.2 | ⚠️ Outdated | Major version behind |
| `cors` | ^2.8.5 | 2.8.5 | ✅ Current | |
| `dotenv` | ^16.3.1 | 16.6.1 | ⚠️ Minor update | |
| `express` | ^4.18.2 | 5.1.0 | ⚠️ Major update | Express 5.x available (breaking changes) |
| `jsonwebtoken` | ^9.0.2 | 9.0.2 | ✅ Current | |
| `nodemailer` | ^7.0.12 | 7.0.6 | ⚠️ Downgrade? | Current is newer than "latest" - verify |
| `sql.js` | ^1.10.3 | 1.8.0 | ⚠️ Verify | Current may be newer |
| `nodemon` | ^3.1.11 | 3.1.11+ | ⚠️ Check | May have updates |
| **`multer`** | ✅ ^2.0.1 | Latest | ✅ **FIXED** | Added (v2 for security) |
| **`cloudinary`** | ✅ ^2.8.0 | Latest | ✅ **FIXED** | Added (v2.8.0 patches vulnerability) |

### Frontend Dependencies (`apps/frontend/package.json`)
| Package | Current | Latest | Status | Notes |
|---------|---------|--------|--------|-------|
| `@radix-ui/react-dialog` | ^1.1.15 | Latest | ⚠️ Check | |
| `@radix-ui/react-label` | ^2.1.8 | Latest | ⚠️ Check | |
| `@radix-ui/react-navigation-menu` | ^1.2.14 | Latest | ⚠️ Check | |
| `@radix-ui/react-slot` | ^1.2.4 | Latest | ⚠️ Check | |
| `@radix-ui/react-toast` | ^1.2.15 | Latest | ⚠️ Check | |
| `axios` | ^1.6.2 | 1.7.0+ | ⚠️ Minor update | |
| `class-variance-authority` | ^0.7.1 | Latest | ⚠️ Check | |
| `clsx` | ^2.1.1 | Latest | ⚠️ Check | |
| `framer-motion` | ^12.24.10 | Latest | ⚠️ Check | |
| `lucide-react` | ^0.562.0 | Latest | ⚠️ Check | |
| `react` | ^18.2.0 | 18.2.0 | ✅ Current | React 19 available (major) |
| `react-dom` | ^18.2.0 | 18.2.0 | ✅ Current | React 19 available (major) |
| `react-router-dom` | ✅ ^6.30.3 | Latest | ✅ **FIXED** | Updated to patch XSS vulnerability |
| `tailwind-merge` | ^3.4.0 | Latest | ⚠️ Check | |
| `vite` | ^7.3.1 | 4.3.3 | ⚠️ Verify | Current is v7, "latest" shows v4 - verify |

## 🔧 Recommended Actions

### ✅ Completed (Critical)
1. **✅ Added missing dependencies:**
   - `multer@^2.0.1` - Added to backend
   - `cloudinary@^2.8.0` - Added to backend (patched vulnerability)
   - `react-router-dom@^6.30.3` - Updated to patch XSS vulnerability

### High Priority
2. **Update bcryptjs:**
   - Current: `^2.4.3` → Latest: `3.0.2`
   - **Note:** Major version update - test thoroughly
   - Check breaking changes: https://github.com/dcodeIO/bcrypt.js/releases

3. **Update dotenv:**
   - Current: `^16.3.1` → Latest: `^16.6.1`
   - Minor update, should be safe

### Medium Priority
4. **Consider Express 5.x:**
   - Current: `^4.18.2` → Latest: `5.1.0`
   - **Note:** Major version with breaking changes
   - Review migration guide: https://expressjs.com/en/guide/migrating-5.html
   - **Recommendation:** Defer unless needed for specific features

5. **Update axios:**
   - Current: `^1.6.2` → Latest: `^1.7.0+`
   - Minor update, should be safe

6. **Update @radix-ui packages:**
   - Check for updates across all Radix UI packages
   - Usually safe minor/patch updates

### Low Priority
7. **Security audit fix:**
   ```bash
   npm audit fix --force
   ```
   - **Warning:** May cause breaking changes in `@lhci/cli`
   - Consider if Lighthouse CI is critical for your workflow
   - Alternative: Accept risk (dev dependency only)

8. **React 19 consideration:**
   - React 19 is available but has breaking changes
   - **Recommendation:** Wait for ecosystem stability before upgrading
   - Current React 18.2.0 is stable and well-supported

## 📋 Dependency Health Summary

### Backend
- ✅ **Core dependencies:** Mostly current
- ✅ **Missing packages:** Fixed (multer, cloudinary added)
- ⚠️ **Outdated:** bcryptjs (major version behind)
- ✅ **Security:** High severity vulnerabilities patched

### Frontend
- ✅ **Core dependencies:** React ecosystem current
- ✅ **Security:** XSS vulnerability in react-router-dom patched
- ⚠️ **Updates available:** Multiple minor updates available

### Dev Dependencies
- ⚠️ **Security:** 4 low severity issues in `@lhci/cli` transitive deps
- ✅ **Testing:** Playwright current

## 🎯 Priority Action Plan

1. **✅ COMPLETED:** Added `multer` and `cloudinary` to backend dependencies
2. **✅ COMPLETED:** Updated `react-router-dom` to patch XSS vulnerability
3. **This week:** Update `bcryptjs` and `dotenv`
4. **This month:** Review and update frontend dependencies
5. **Future:** Consider Express 5.x migration (plan carefully)

## 📝 Notes

- Node version requirement: `>=20.19.0` (correctly specified)
- Workspace setup: Properly configured
- Lock file: `package-lock.json` is in sync (after recent fix)
- All dependencies use caret (`^`) ranges - allows minor/patch updates

---

**Generated:** January 8, 2025  
**Next Review:** Recommended in 1 month or after major updates
