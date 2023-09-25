import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import React from 'react'

const PdfMake = () => {
  const createPdf = () => {
    const documentDefinition = {
      content: [
        {
          table: {
            headerRows: 1,
            body: [
              ['Header 1', 'Header 2', 'Header 3'],
              ['Value 1', 'Value 2', 'Value 3'],
              ['Value 4', 'Value 5', 'Value 6'],
            ]
          }
        }
      ]
    };
    pdfMake.createPdf(documentDefinition).download("example.pdf");
  };

  return (
    <div>
      <button onClick={createPdf}>Download PDF</button>
    </div>
  );
};


export default PdfMake