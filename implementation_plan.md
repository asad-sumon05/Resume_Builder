# Enhancv Clone - Complete Resume Builder

## Overview
Full-featured resume builder website matching Enhancv.com's look, feel, design system, and functionality - completely free without any paywall.

## Pages / Views
1. **Landing page** (`index.html`)
   - Header with dropdown menus and CTA buttons
   - Hero section with dual CTAs and social proof badges
   - Company hiring logos (Google, Amazon, Spotify, Tesla, Microsoft, etc.)
   - Interactive live templates showcase with color theme switcher
   - Core features breakdown and benefits grid
   - Interactive ATS Score Checker simulation widget
   - Customer testimonials and reviews
   - Interactive FAQ accordion
   - Comprehensive footer

2. **Resume Builder** (`builder.html`)
   - Split layout: live responsive A4 preview on right, comprehensive editor on left
   - 19 Resume Templates (Modern Pro, Classic ATS, Executive, Minimal, Tech Dark, Elegant, Timeline, Compact ATS, Startup Bold, Academic CV, Dark Pro, Nordic Clean, Infographic, etc.)
   - 10 Curated color palettes + live color picker
   - 6 Google Fonts typography selector + font size + line spacing controls
   - Zoom controls (+/-) and mobile preview toggle
   - Real-time ATS Strength Score meter (0-100%) with dynamic feedback
   - 13 Section Types:
     * Personal Information & Photo upload
     * Professional Summary with AI content suggestions
     * Work Experience with AI bullet enhancers
     * Education & Academic details
     * Skills with visual proficiency slider
     * Languages & Fluency levels
     * Certifications & Licenses
     * Projects with repositories and links
     * Awards & Honors
     * Volunteering & Leadership
     * Publications & Research
     * Hobbies & Passions
     * References
   - 4 Sample Preset Data Loaders (Senior Software Engineer, Product & UX Designer, Growth Marketing Director, Recent Graduate / Data Analyst)
   - Export Menu:
     * High-res PDF download via html2pdf & print fallback
     * Plain Text (.txt) formatted for direct ATS portal pasting
     * JSON Backup Export
     * JSON Backup Import / Restore
     * Reset / Clear All with confirmation
   - Multi-level Undo / Redo history stack
   - Automatic `localStorage` persistence

3. **Templates Gallery** (`templates.html`)
   - 19 Resume templates categorized across Modern, Classic, Creative, Minimal, Tech
   - Search bar and category filter tabs
   - Interactive preview modal with palette color switcher
   - Direct "Use Template" integration navigating straight to builder with template preselected

## File Structure
- `index.html` - Enhancv landing page
- `builder.html` - Resume builder app
- `templates.html` - Templates showcase gallery
- `css/style.css` - Landing page styling
- `css/builder.css` - Builder layout, editor tabs, dropdowns & preview
- `css/templates.css` - Gallery styling, cards & modal
- `js/main.js` - Landing page interactivity & FAQ
- `js/builder.js` - Builder state management, template renderers & forms
- `js/templates.js` - Template gallery data & interactive preview modal
- `js/pdf-export.js` - High-quality PDF export & print fallback

