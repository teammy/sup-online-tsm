import React, { useEffect, useState } from "react";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { clsx } from "clsx"
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { Button } from "@/components/ui/button";
// var buddhistEra = require('dayjs/plugin/buddhistEra')
import { IBM_Plex_Sans_Thai_Looped } from 'next/font/google';
const thaiFont = IBM_Plex_Sans_Thai_Looped({
  subsets: ['thai'],
  weight: "400"
});
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { ThaiDatePicker } from "thaidatepicker-react";
import dayjs from "dayjs";
import "dayjs/locale/th";
dayjs.locale("th");
// dayjs.extend(buddhistEra);

pdfMake.fonts = {
  THSarabunNew: {
    normal: "THSarabunNew.ttf",
  },
};

interface TableData {
  userId: number;
  id: number;
  title: string;
  body: string;
}

function PDFMakeExample() {
  const [tableData, setTableData] = useState<TableData[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedThaiDate, setSelectedThaiDate] = useState();
  const [selectedShift, setSelectedShift] = useState("");

  // const formatThaiMonth = dayjs(selectedThaiDate, { buddhistEra: true }).format('D MMMM BBBB', { buddhistEra: true });

  const handleSelectChange = (e: any) => {
    console.log(e);
    setSelectedShift(e);
};

const handleDatePickerChange = (christDate: any, buddhistDate: any) => {
  console.log(christDate);
  console.log(buddhistDate);
  setSelectedDate(christDate);
  setSelectedThaiDate(buddhistDate);
};

const handleShiftChange = (value:any) => {
  console.log(value);
  setSelectedShift(value);
};

  // fetching data from API
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `http://localhost:3000/api/sheet?sentDate=${selectedDate}&worktime=${selectedShift}`
        );
        const data = await response.json();
        console.log("Fetched Data:", data.data);
        setTableData(data.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [selectedDate,selectedShift]);

  const generatePDF = () => {
    const tableRows:any = [];

    const orderSortData = [
      'MICU', 
      'SICU', 
      'SUB  ICU', 
      'NICU', 
      'หอผู้ป่วยอายุรกรรมหญิง', 
      'หอผู้ป่วยอายุรกรรมชาย', 
      'หอผู้ป่วยศัลยกรรมหญิง',
      'หอผู้ป่วยจิตเวช',
      'งานห้องคลอด',
      'หอผู้ป่วยสุขใจ',
      'พิเศษอายุรกรรม ชั้น2 (อาคาร75ปี)',
      'หอผู้ป่วยศัลยกรรมชาย',
      'หอผู้ป่วยศัลยกรรมกระดูก',
      'หอผู้ป่วยตาหูคอจมูก',
      'หอผู้ป่วยสูตินรีเวชกรรม',
      'หอผู้ป่วยกุมารเวชกรรม',
      'หอผู้ป่วยพระสงฆ์ ชั้น 6 (อาคาร75ปี)',
      'หอผู้ป่วยพิเศษชั้น 6-7 อาคาร100ปีฯ',
      'งานห้องผ่าตัด',
      'งานวิสัญญีพยาบาล',
      'SMC',
      'งานอุบัติเหตุฉุกเฉิน'
    ];

    tableData.sort((a:any, b:any) => {
      const aValue = a[2]; 
      const bValue = b[2];
      
      const aIndex = orderSortData.indexOf(aValue);
      const bIndex = orderSortData.indexOf(bValue);
    
      // handle unknown categories, push them to the end of the sorted list
      if (aIndex === -1) return 1; 
      if (bIndex === -1) return -1; 
    
      return aIndex - bIndex;
    });
    
    tableData.map((item: any, index) => {

      const row5 = () => {
        if(item[2]==='พิเศษอายุรกรรม ชั้น2 (อาคาร75ปี)') {
          return item[28]
        }else if (item[2]==='หอผู้ป่วยศัลยกรรมชาย') {
          return item[13]
        }else if (item[2]==='หอผู้ป่วยพระสงฆ์ ชั้น 6 (อาคาร75ปี)') {
          return item[3]
        }else {
          return item[42]
        }
      }

      const rowOriginal = [
        { text: index+1,
          alignment: 'center'
        },
            { text: item[2],
              
            },
            { 
              text: item[2] ==='พิเศษอายุรกรรม ชั้น2 (อาคาร75ปี)' ? item[42] : item[28]
            },
            { 
              text: row5()  
            },
            { 
              text: item[44],
              alignment: 'center'
            },
            { 
              text: item[45],
              alignment: 'center'
            },
            { 
              text: item[46],alignment: 'center' 
            },
            { text: item[47],alignment: 'center' },
            { text: item[48],alignment: 'center' },
            { text: item[49],alignment: 'center' },
            { text: item[50],alignment: 'center' },
            { text: item[115],alignment: 'center' },
            { text: item[116],alignment: 'center' },
            { text: item[117],alignment: 'center' },
            { text: item[118],alignment: 'center' },
            { text: item[119],alignment: 'center' },
            { text: item[120],alignment: 'center' },
            { text: item[121],alignment: 'center' },
            { text: item[122],alignment: 'center' },
            { text: item[123],alignment: 'center' },
            { text: item[137],alignment: 'center' },
            "",
            { text: item[155],alignment: 'center' },
            { text: item[156],alignment: 'center' },
            { text: item[157],alignment: 'center' },
            { text: item[158],alignment: 'center' },
            { text: item[159],alignment: 'center' },
            { text: item[160] },
      ];

      tableRows.push(rowOriginal);

      if (item[2] === 'หอผู้ป่วยศัลยกรรมชาย') {
        const newRowMaleSurgicalWard = [
          { text: "",
          },
              { text: "ddwadwa"
                
              },
              { 
                text: item[2] ==='พิเศษอายุรกรรม ชั้น2 (อาคาร75ปี)' ? item[42] : item[28]
              },
              { 
                text: "" 
              },
              { 
                text: item[44],
                alignment: 'center'
              },
              { 
                text: item[45],
                alignment: 'center'
              },
              { 
                text: item[46],alignment: 'center' 
              },
              { text: item[47],alignment: 'center' },
              { text: item[48],alignment: 'center' },
              { text: item[49],alignment: 'center' },
              { text: item[50],alignment: 'center' },
              { text: item[115],alignment: 'center' },
              { text: item[116],alignment: 'center' },
              { text: item[117],alignment: 'center' },
              { text: item[118],alignment: 'center' },
              { text: item[119],alignment: 'center' },
              { text: item[120],alignment: 'center' },
              { text: item[121],alignment: 'center' },
              { text: item[122],alignment: 'center' },
              { text: item[123],alignment: 'center' },
              { text: item[137],alignment: 'center' },
              "",
              { text: item[155],alignment: 'center' },
              { text: item[156],alignment: 'center' },
              { text: item[157],alignment: 'center' },
              { text: item[158],alignment: 'center' },
              { text: item[159],alignment: 'center' },
              { text: item[160] }
        ]
        tableRows.push(newRowMaleSurgicalWard); 
      } 
      
      if (item[2] === 'หอผู้ป่วยศัลยกรรมกระดูก') {
        const newRowOrthopedicSurgicalWard = [
          { text: "",
          },
              { text: "Orthopedic Surgical Ward New Line"
                
              },
              { 
                text: item[2] ==='พิเศษอายุรกรรม ชั้น2 (อาคาร75ปี)' ? item[42] : item[28]
              },
              { 
                text: "" 
              },
              { 
                text: item[44],
                alignment: 'center'
              },
              { 
                text: item[45],
                alignment: 'center'
              },
              { 
                text: item[46],alignment: 'center' 
              },
              { text: item[47],alignment: 'center' },
              { text: item[48],alignment: 'center' },
              { text: item[49],alignment: 'center' },
              { text: item[50],alignment: 'center' },
              { text: item[115],alignment: 'center' },
              { text: item[116],alignment: 'center' },
              { text: item[117],alignment: 'center' },
              { text: item[118],alignment: 'center' },
              { text: item[119],alignment: 'center' },
              { text: item[120],alignment: 'center' },
              { text: item[121],alignment: 'center' },
              { text: item[122],alignment: 'center' },
              { text: item[123],alignment: 'center' },
              { text: item[137],alignment: 'center' },
              "",
              { text: item[155],alignment: 'center' },
              { text: item[156],alignment: 'center' },
              { text: item[157],alignment: 'center' },
              { text: item[158],alignment: 'center' },
              { text: item[159],alignment: 'center' },
              { text: item[160] }
        ]
        tableRows.push(newRowOrthopedicSurgicalWard); 
      }

      if (item[2] === 'หอผู้ป่วยตาหูคอจมูก') {
        const newRowENTWard = [
          { text: "",
          },
              { text: "ENT Ward New Line"
                
              },
              { 
                text: item[2] ==='พิเศษอายุรกรรม ชั้น2 (อาคาร75ปี)' ? item[42] : item[28]
              },
              { 
                text: "" 
              },
              { 
                text: item[44],
                alignment: 'center'
              },
              { 
                text: item[45],
                alignment: 'center'
              },
              { 
                text: item[46],alignment: 'center' 
              },
              { text: item[47],alignment: 'center' },
              { text: item[48],alignment: 'center' },
              { text: item[49],alignment: 'center' },
              { text: item[50],alignment: 'center' },
              { text: item[115],alignment: 'center' },
              { text: item[116],alignment: 'center' },
              { text: item[117],alignment: 'center' },
              { text: item[118],alignment: 'center' },
              { text: item[119],alignment: 'center' },
              { text: item[120],alignment: 'center' },
              { text: item[121],alignment: 'center' },
              { text: item[122],alignment: 'center' },
              { text: item[123],alignment: 'center' },
              { text: item[137],alignment: 'center' },
              "",
              { text: item[155],alignment: 'center' },
              { text: item[156],alignment: 'center' },
              { text: item[157],alignment: 'center' },
              { text: item[158],alignment: 'center' },
              { text: item[159],alignment: 'center' },
              { text: item[160] }
        ]
        tableRows.push(newRowENTWard); 
      }

      if (item[2] === 'หอผู้ป่วยสูตินรีเวชกรรม') {
        const newRowObstetricGynecologyWard = [
          { text: "",
          },
              { text: "ENT Ward New Line"
                
              },
              { 
                text: item[2] ==='พิเศษอายุรกรรม ชั้น2 (อาคาร75ปี)' ? item[42] : item[28]
              },
              { 
                text: "" 
              },
              { 
                text: item[44],
                alignment: 'center'
              },
              { 
                text: item[45],
                alignment: 'center'
              },
              { 
                text: item[46],alignment: 'center' 
              },
              { text: item[47],alignment: 'center' },
              { text: item[48],alignment: 'center' },
              { text: item[49],alignment: 'center' },
              { text: item[50],alignment: 'center' },
              { text: item[115],alignment: 'center' },
              { text: item[116],alignment: 'center' },
              { text: item[117],alignment: 'center' },
              { text: item[118],alignment: 'center' },
              { text: item[119],alignment: 'center' },
              { text: item[120],alignment: 'center' },
              { text: item[121],alignment: 'center' },
              { text: item[122],alignment: 'center' },
              { text: item[123],alignment: 'center' },
              { text: item[137],alignment: 'center' },
              "",
              { text: item[155],alignment: 'center' },
              { text: item[156],alignment: 'center' },
              { text: item[157],alignment: 'center' },
              { text: item[158],alignment: 'center' },
              { text: item[159],alignment: 'center' },
              { text: item[160] }
        ]
        tableRows.push(newRowObstetricGynecologyWard); 
      }

      if (item[2] === 'หอผู้ป่วยพระสงฆ์ ชั้น 6 (อาคาร75ปี)') {
        const newRowMonkWard = [
          { text: "",
          },
              { text: "Monk Ward New Line"
                
              },
              { 
                text: item[2] ==='พิเศษอายุรกรรม ชั้น2 (อาคาร75ปี)' ? item[42] : item[28]
              },
              { 
                text: "" 
              },
              { 
                text: item[44],
                alignment: 'center'
              },
              { 
                text: item[45],
                alignment: 'center'
              },
              { 
                text: item[46],alignment: 'center' 
              },
              { text: item[47],alignment: 'center' },
              { text: item[48],alignment: 'center' },
              { text: item[49],alignment: 'center' },
              { text: item[50],alignment: 'center' },
              { text: item[115],alignment: 'center' },
              { text: item[116],alignment: 'center' },
              { text: item[117],alignment: 'center' },
              { text: item[118],alignment: 'center' },
              { text: item[119],alignment: 'center' },
              { text: item[120],alignment: 'center' },
              { text: item[121],alignment: 'center' },
              { text: item[122],alignment: 'center' },
              { text: item[123],alignment: 'center' },
              { text: item[137],alignment: 'center' },
              "",
              { text: item[155],alignment: 'center' },
              { text: item[156],alignment: 'center' },
              { text: item[157],alignment: 'center' },
              { text: item[158],alignment: 'center' },
              { text: item[159],alignment: 'center' },
              { text: item[160] }
        ]
        tableRows.push(newRowMonkWard); 
      }

      if (item[2] === 'หอผู้ป่วยพิเศษชั้น 6-7 อาคาร100ปีฯ') {
        const newRowSpecialWard = [
          { text: "",
          },
              { text: "Special Ward New Line"
                
              },
              { 
                text: item[2] ==='พิเศษอายุรกรรม ชั้น2 (อาคาร75ปี)' ? item[42] : item[28]
              },
              { 
                text: "" 
              },
              { 
                text: item[44],
                alignment: 'center'
              },
              { 
                text: item[45],
                alignment: 'center'
              },
              { 
                text: item[46],alignment: 'center' 
              },
              { text: item[47],alignment: 'center' },
              { text: item[48],alignment: 'center' },
              { text: item[49],alignment: 'center' },
              { text: item[50],alignment: 'center' },
              { text: item[115],alignment: 'center' },
              { text: item[116],alignment: 'center' },
              { text: item[117],alignment: 'center' },
              { text: item[118],alignment: 'center' },
              { text: item[119],alignment: 'center' },
              { text: item[120],alignment: 'center' },
              { text: item[121],alignment: 'center' },
              { text: item[122],alignment: 'center' },
              { text: item[123],alignment: 'center' },
              { text: item[137],alignment: 'center' },
              "",
              { text: item[155],alignment: 'center' },
              { text: item[156],alignment: 'center' },
              { text: item[157],alignment: 'center' },
              { text: item[158],alignment: 'center' },
              { text: item[159],alignment: 'center' },
              { text: item[160] }
        ]
        tableRows.push(newRowSpecialWard); 
      }

    
  
    });

    const docDefinition = {
      pageSize: "A4",
      pageOrientation: "landscape",
      defaultStyle: {
        font: "THSarabunNew",
        fontSize: 11,
      },
      content: [
        {
          text: `แบบรายงานการนิเทศ\nผู้ตรวจการพยาบาล กลุ่มการพยาบาล โรงพยาบาลสมเด็จพระเจ้าตากสินมหาราช\nวันที่ ${selectedThaiDate} เวร เช้า`,
          fontSize: 15,
          alignment: 'center',  
          margin: [0, 0, 0, 10]
      },
        {
          
          style: "tableExample",
          table: {
            widths: [
              20,
              130,
              10,
              10,
              10,
              10,
              10,
              15,
              10,
              15,
              20,
              15,
              15,
              10,
              15,
              15,
              20,
              20,
              10,
              10,
              20,
              20,
              10,
              15,
              15,
              15,
              15,
              "auto",
            ],
            headerRows: 3,
            // keepWithHeaderRows: 1,
            body: [
              [
                {
                  rowSpan: 3,
                  text: "ลำดับ\nที่",
                  margin: [0, 20, 0, 0],
                  alignment: "center",
                },
                {
                  rowSpan: 3,
                  text: "หน่วยงาน",
                  alignment: "center",
                  margin: [0, 30, 0, 0]
                },
                {
                  colSpan: 9,
                  alignment: "center",
                  text: "ยอดยกมา\n(แยกระดับ)",
                },
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                { colSpan: 11, text: "ข้อมูลผู้ป่วย",alignment: "center",margin: [0, 8, 0, 0], },
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                { colSpan: 5, text: "จำนวนเจ้าหน้าที่\n(คน)",alignment: "center" },
                "",
                "",
                "",
                "",
                { rowSpan: 3, text: "รายชื่อ\nหัวหน้าเวร",alignment: "center",margin: [0, 20, 0, 0] }, 
              ],

              [
                "",
                "",
                { rowSpan: 2, text: "5",alignment: 'center',margin: [0, 8, 0, 0] },
                { rowSpan: 2, text: "4",alignment: 'center',margin: [0, 8, 0, 0] },
                { rowSpan: 2, text: "3",alignment: 'center',margin: [0, 8, 0, 0] },
                { rowSpan: 2, text: "2",alignment: 'center',margin: [0, 8, 0, 0] },
                { rowSpan: 2, text: "1",alignment: 'center',margin: [0, 8, 0, 0] },
                { rowSpan: 2, text: "ETT",margin: [0, 8, 0, 0],alignment: 'center' },
                { rowSpan: 2, text: "TT",margin: [0, 8, 0, 0],alignment: 'center' },
                { rowSpan: 2, text: "Ven",margin: [0, 8, 0, 0],alignment: 'center' },
                { rowSpan: 2, text: "HFNC",margin: [0, 8, 0, 0],alignment: 'center' },
                { rowSpan: 2, text: "รับ\nใหม่",alignment: 'center' },
                { rowSpan: 2, text: "รับ\nย้าย",alignment: 'center' },
                { rowSpan: 2, text: "ผ่าตัด",alignment: 'center' },
                { rowSpan: 2, text: "D/C",alignment: 'center',margin: [0, 8, 0, 0] },
                { rowSpan: 2, text: "ย้าย",alignment: 'center',margin: [0, 8, 0, 0] },
                { rowSpan: 2, text: "Dead",alignment: 'center',margin: [0, 8, 0, 0] },
                { rowSpan: 2, text: "ไม่\nสมัคร",alignment: 'center' },
                { colSpan: 2, text: "Refer",alignment: 'center' },
                "15",
                { rowSpan: 2, text: "คง\nพยบ",alignment: 'center' },
                { rowSpan: 2, text: "ห้อง\nพิเศษ",alignment: 'center' },
                { rowSpan: 2, text: "RN",margin: [0, 8, 0, 0] },
                { rowSpan: 2, text: "Para",margin: [0, 8, 0, 0] },
                { rowSpan: 2, text: "TN/PN" },
                { rowSpan: 2, text: "EMT",margin: [0, 8, 0, 0] },
                { rowSpan: 2, text: "AID",margin: [0, 8, 0, 0] },
                "",
              ],
              [
                " 1",
                "",
                " 37",
                "ffff",
                "7",
                "8",
                "9",
                "10",
                "11",
                "12",
                "10",
                "11",
                "it",
                "ha",
                "12",
                "13",
                "xx",
                "yy",
                "รับ",
                "ส่ง",
                "18",
                "19",
                "20",
                "18",
                "19",
                "",
              ],
              ...tableRows
            ],
          },
        },
        { text: '', pageBreak: 'after' },
        ,{
          style: "tableExample",
          table: {
            widths: [30,
              100,
              100,
              20,
              20,
              25,
              20,
              20,
              80,
             
           ],
            body: [
              [
                {
                  rowSpan: 2,
                  text: "ลำดับที่",
                  margin: [0, 20, 0, 0],
                  alignment: "center",
                  width: 100,
                },
                {
                  rowSpan: 2,
                  text: "หน่วยงาน",
                  alignment: "center",
                  margin: [0, 30, 0, 0]
                },

                {
                  rowSpan: 2,
                  alignment: "center",
                  text: "จำนวนคนไข้ผ่าตัด",
                },
                
                { colSpan: 5, text: "จำนวนเจ้าหน้าที่\n(คน)",alignment: "center" },
                "",
                "",
                "",
                "",
                { rowSpan: 2, text: "รายชื่อ\nหัวหน้าเวร",alignment: "center",margin: [0, 20, 0, 0] }, 
              ],

              [
                "",
                "",
                { text: "5",alignment: 'center',margin: [0, 8, 0, 0] },
                
                {  text: "RN",margin: [0, 5, 0, 0],alignment: 'center' },
                {  text: "Para",margin: [0, 5, 0, 0],alignment: 'center' },
                {  text: "TN/PN",margin: [0, 5, 0, 0],alignment: 'center' },
                {  text: "EMT",margin: [0, 5, 0, 0],alignment: 'center' },
                {  text: "AID",margin: [0, 5, 0, 0],alignment: 'center' },
                "",
              ],
            ],
          },
        }
      ],
    };
    pdfMake.createPdf(docDefinition).open();
  };

  return <>
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4 justify-center items-center">
  <div className="w-full md:w-1/2 mt-10 flex gap-4 justify-center items-center">
    <div>
    <ThaiDatePicker
        value={selectedDate}
        placeholder="เลือกวัน"
        inputProps={{
          displayFormat: "D MMM YYYY",
          className:
            "max-w-xs text-[#05060f] p-2 border border-[#cfcfcf] rounded",
        }}
        onChange={handleDatePickerChange}
      />
    </div>
    <div>
      <Select onValueChange={handleSelectChange}>
        <SelectTrigger className="w-[180px] bg-white border border-[#cfcfcf] rounded">
          <SelectValue placeholder="เลือกเวรที่ต้องการ" />
        </SelectTrigger>
        <SelectContent className="bg-white">
          <SelectGroup>
          <SelectItem value="all">ทุกเวร</SelectItem>
            <SelectItem value="1">เวรดึก</SelectItem>
            <SelectItem value="2">เวรเช้า</SelectItem>
            <SelectItem value="3">เวรบ่าย</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
    <div>
      <Button
        variant="outline"
        onClick={generatePDF}
        className={clsx("bg-[#5627ff] hover:bg-[#5627ff] text-white font-bold rounded hover:text-white border-none hover:opacity-100",thaiFont.className)}
      >
        ค้นหาข้อมูล
      </Button>
    </div>
  </div>
</div>
<hr className="mt-4 w-full border-[#cfcfcf]" />
  </>;
}

export default PDFMakeExample;
