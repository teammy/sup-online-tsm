import React, { useEffect, useState } from "react";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { clsx } from "clsx"
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { Button } from "@/components/ui/button";
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
    const tableRows = tableData.map((item: any, index) => {
      return [
        { text: index+1 },
        { text: item[2] },
        { 
          text: item[42] === 'พิเศษอายุรกรรม ชั้น2 (อาคาร75ปี)' ? item[28] : item[42] 
        },
        { 
          text: item[43] === 'พิเศษอายุรกรรม ชั้น2 (อาคาร75ปี)' ? item[29] : item[43] 
        },
        { 
          text: item[44] === 'พิเศษอายุรกรรม ชั้น2 (อาคาร75ปี)' ? item[30] : item[44] 
        },
        { 
          text: item[45] === 'พิเศษอายุรกรรม ชั้น2 (อาคาร75ปี)' ? item[31] : item[45] 
        },
        { 
          text: item[46] === 'พิเศษอายุรกรรม ชั้น2 (อาคาร75ปี)' ? item[32] : item[46] 
        },
        { text: item[47] },
        { text: item[48] },
        { text: item[49] },
        { text: item[50] },
        { text: item[115] },
        { text: item[116] },
        { text: item[117] },
        { text: item[118] },
        { text: item[119] },
        { text: item[120] },
        { text: item[121] },
        { text: item[122] },
        { text: item[123] },
        { text: item[137] },
        "",
        { text: item[155] },
        { text: item[156] },
        { text: item[157] },
        { text: item[158] },
        { text: item[159] },
        { text: item[160] },
      ];
    });

    const docDefinition = {
      pageSize: "A4",
      pageOrientation: "landscape",
      defaultStyle: {
        font: "THSarabunNew",
        fontSize: 12,
      },
      content: [
        {
          style: "tableExample",
          table: {
            widths: [
              "auto",
              "auto",
              "auto",
              "auto",
              "auto",
              "auto",
              "auto",
              "auto",
              "auto",
              "auto",
              "auto",
              "auto",
              "auto",
              "auto",
              "auto",
              "auto",
              "auto",
              "auto",
              "auto",
              "auto",
              "auto",
              "auto",
              "auto",
              "auto",
              "auto",
              "auto",
              "auto",
              "auto",
            ],
            headerRows: 3,
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
                },
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                { colSpan: 11, text: "ข้อมูลผู้ป่วย" },
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
                { colSpan: 5, text: "จำนวนเจ้าหน้าที่(คน)" },
                "",
                "",
                "",
                "",
                { rowSpan: 3, text: "รายชื่อหัวหน้าเวร" },
              ],

              [
                "",
                "",
                { rowSpan: 2, text: "5" },
                { rowSpan: 2, text: "4" },
                { rowSpan: 2, text: "3" },
                { rowSpan: 2, text: "2" },
                { rowSpan: 2, text: "1" },
                { rowSpan: 2, text: "ETT" },
                { rowSpan: 2, text: "TT" },
                { rowSpan: 2, text: "Ven" },
                { rowSpan: 2, text: "HFNC" },
                { rowSpan: 2, text: "รับใหม่" },
                { rowSpan: 2, text: "รับย้าย" },
                { rowSpan: 2, text: "ผ่าตัด" },
                { rowSpan: 2, text: "D/C" },
                { rowSpan: 2, text: "ย้าย" },
                { rowSpan: 2, text: "Dead" },
                { rowSpan: 2, text: "ไม่สมัคร" },
                { colSpan: 2, text: "Refer" },
                "15",
                { rowSpan: 2, text: "คงพยาบาล" },
                { rowSpan: 2, text: "ห้องพิเศษ" },
                { rowSpan: 2, text: "RN" },
                { rowSpan: 2, text: "Para" },
                { rowSpan: 2, text: "TN/PN" },
                { rowSpan: 2, text: "EMT" },
                { rowSpan: 2, text: "AID" },
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
              ...tableRows,
            ],
          },
        },
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
