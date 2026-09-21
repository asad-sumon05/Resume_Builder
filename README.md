# Resume Builder 📄✨

A modern, interactive, and ATS-friendly Resume Builder built with **React**, **Vite**, and **Tailored CSS**, inspired by Enhancv. Create, edit directly on canvas, customize sections, and export pixel-perfect PDF resumes in seconds.

🔗 **GitHub Repository**: [https://github.com/asad-sumon05/Resume_Builder](https://github.com/asad-sumon05/Resume_Builder)

---

## 🚀 Features

- **Direct On-Screen Editing**: Click and edit any text directly on the resume paper canvas.
- **Multiple Professional Templates**:
  - **Modern Pro**: Two-column layout with dark sidebar and clean typography.
  - **Classic ATS**: Single/dual-column ATS-optimized traditional layout.
  - **Minimalist**: Clean, elegant white-space focused design.
  - **Timeline**: Visual chronological milestone career path.
  - **Executive**: High-density executive leadership layout.
  - **Tech Dark**: Developer terminal-inspired dark theme.
- **On-Canvas Section Moving**:
  - Hover over any section to access quick `↑` / `↓` buttons or the `Move ▾` drop-up menu.
  - Move sections to top of document, bottom of page, or place directly after any specific section.
- **Custom Sections**:
  - Add unlimited custom sections with various display styles (Bullet List, Paragraph / Text, Tag Cloud, Key-Value Info).
- **Profile Photo Support**:
  - Upload passport-size profile pictures with crop and positioning support across templates.
- **Education & Grading Flexibility**:
  - Seamless support for CGPA / GPA scoring.
  - Flexible graduation year format (single passing year, year range, or "Running").
  - Clean university and city alignment.
- **Clean PDF Export**:
  - Instant client-side PDF export with zero visual artifacts or buttons on the final document.
- **Data Persistence & Portability**:
  - Auto-saves to LocalStorage.
  - Export and Import resume data as `.json`.

---

## 🛠️ Tech Stack

- **Frontend**: React 18
- **Build Tool**: Vite
- **Styling**: Modern CSS / Flexbox / CSS Grid
- **Icons**: Lucide React
- **PDF Generation**: html2pdf.js / html2canvas / jsPDF

---

## 📦 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (v16+) installed.

### Installation

```bash
# Clone the repository
git clone https://github.com/asad-sumon05/Resume_Builder.git

# Navigate into project directory
cd Resume_Builder

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (or the port shown in terminal) in your browser.

### Production Build

```bash
npm run build
npm run preview
```

---

## 📄 License

MIT License. Feel free to use, modify, and distribute.
