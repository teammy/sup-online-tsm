import React from "react";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

pdfMake.fonts = {
  THSarabunNew: {
    normal: 'THSarabunNew.ttf'
  },
}

class PDFMakeExample extends React.Component {
  generatePDF = () => {
    const docDefinition = {
      pageSize: "A4",
      pageOrientation: "landscape",
      defaultStyle: {
        font: "THSarabunNew",
        fontSize: 16,
      },
      content: [
        {
          style: "tableExample",
          table: {
            widths: ["auto", "auto", "auto","auto","auto","auto","auto","auto"
            ,"auto","auto","auto","auto","auto","auto","auto","auto","auto","auto","auto","auto","auto","auto","auto","auto","auto","auto","auto","auto"],
            headerRows: 5,
            // keepWithHeaderRows: 1,
            body: [

              [
                {
                  rowSpan: 3,
                  text: "ลำดับที่",
                },
                {
                  rowSpan: 3,
                  text: "หน่วยงาน",
                },
                {
                  colSpan: 9,
                  text: "ยอดยกมา (แยกระดับ)",
                },"","","","","","","","",{ colSpan: 11 , text: "ข้อมูลผู้ป่วย"},"","","","","","","","","","",{ colSpan: 5 , text:"จำนวนเจ้าหน้าที่(คน)"},"","","","",{ rowSpan: 3, text: "รายชื่อหัวหน้าเวร"}
              ],
             
              ["", "", 
              {rowSpan: 2, text:"5"},{rowSpan: 2, text:"4"},{rowSpan: 2, text:"3"},{rowSpan: 2, text:"2"},{rowSpan: 2, text:"1"},{rowSpan: 2, text:"ETT"},
              {rowSpan: 2, text:"TT"},{rowSpan: 2, text:"Ven"},{rowSpan: 2, text:"HFNC"},{rowSpan: 2, text:"รับใหม่"},{rowSpan: 2, text:"รับย้าย"},{rowSpan: 2, text:"ผ่าตัด"}
              ,{rowSpan: 2, text:"D/C"},{rowSpan: 2, text:"ย้าย"},{rowSpan: 2, text:"Dead"},{rowSpan: 2, text:"ไม่สมัคร"},{colSpan: 2, text:"Refer"},"15",{rowSpan: 2, text:"คงพยาบาล"},{rowSpan: 2, text:"ห้องพิเศษ"},{rowSpan: 2, text:"RN"},{rowSpan: 2, text:"Para"},{rowSpan: 2, text:"TN/PN"},{rowSpan: 2, text:"EMT"},{rowSpan: 2, text:"AID"},""],
              [" 1", "", " 37","ffff","7","8","9","10","11","12","10","11","it","ha","12","13","xx","yy","รับ","ส่ง","18","19","20","18","19",""],
              
            ],
          },
        },
      ],
    };

    pdfMake.createPdf(docDefinition).open();
  };

  render() {
    return <button onClick={this.generatePDF}>Generate PDF</button>;
  }
}

export default PDFMakeExample;
