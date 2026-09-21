// ============================================================
// PDF-EXPORT.JS - Robust PDF generation for ResumeCV
// ============================================================

/**
 * Export the resume element to PDF
 * Uses html2pdf.js when available, falls back to a styled print window.
 */
function exportResumeToPDF() {
  const paper = document.getElementById('resumePaper');
  if (!paper) return;

  const p = (typeof state !== 'undefined' && state.data && state.data.personal)
    ? state.data.personal
    : {};
  const firstName = (p.firstName || 'Resume').trim();
  const lastName = (p.lastName || '').trim();
  const filename = `${firstName}_${lastName}_Resume.pdf`.replace(/\s+/g, '_');

  // Check if html2pdf is loaded
  if (typeof html2pdf !== 'undefined') {
    if (typeof showToast === 'function') {
      showToast('Generating high-quality PDF...');
    }

    const opt = {
      margin: 0,
      filename: filename,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        letterRendering: true,
        scrollY: 0,
        scrollX: 0
      },
      jsPDF: {
        unit: 'mm',
        format: 'a4',
        orientation: 'portrait'
      }
    };

    html2pdf().set(opt).from(paper).save().then(() => {
      if (typeof showToast === 'function') {
        showToast('PDF downloaded successfully! 🎉');
      }
    }).catch(err => {
      console.warn('html2pdf error, falling back to print dialog:', err);
      printResumeFallback(paper, filename);
    });
  } else {
    // Print fallback
    printResumeFallback(paper, filename);
  }
}

/**
 * Print window fallback with complete cloned styles
 */
function printResumeFallback(paperElement, title) {
  if (typeof showToast === 'function') {
    showToast('Opening print dialog to save as PDF...');
  }

  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    window.print();
    return;
  }

  // Collect all styles from current page
  let styleTags = '';
  document.querySelectorAll('style, link[rel="stylesheet"]').forEach(el => {
    styleTags += el.outerHTML;
  });

  const font = (typeof state !== 'undefined' && state.font) ? state.font : 'Inter';

  printWindow.document.write(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>${title.replace('.pdf', '')}</title>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Rubik:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Lora:ital,wght@0,400;0,600;1,400&family=Fira+Code:wght@400;500;600&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      ${styleTags}
      <style>
        * { box-sizing: border-box; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
        html, body {
          margin: 0 !important;
          padding: 0 !important;
          background: #ffffff !important;
          font-family: '${font}', sans-serif;
        }
        @page {
          size: A4 portrait;
          margin: 0;
        }
        @media print {
          body {
            margin: 0;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          #resumePaper {
            box-shadow: none !important;
            margin: 0 !important;
            width: 100% !important;
            min-height: 100% !important;
          }
        }
      </style>
    </head>
    <body>
      <div style="width:794px; min-height:1123px; margin:0 auto; background:#ffffff;">
        ${paperElement.innerHTML}
      </div>
    </body>
    </html>
  `);

  printWindow.document.close();
  printWindow.focus();

  setTimeout(() => {
    printWindow.print();
    printWindow.close();
  }, 700);
}
