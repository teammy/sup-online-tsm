import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const generatePDF = () => {
  const documentDefinition = {
    content: [
      {
        table: {
          body: [
            ['No', 'Name', 'Phone', 'Total'],
            ['1', 'John Doe', '123456789', '5']
          ]
        }
      }
    ]
  };

  // You can also download the PDF with this line
  pdfMake.createPdf(documentDefinition).download('example.pdf');
  
  // Or get the URL of the generated PDF if it is saved on a server or cloud storage
  const pdfURL = '/public/filepdf'; // replace with your actual PDF URL
  return pdfURL;
};
