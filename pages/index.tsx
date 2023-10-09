import React, { useEffect, useState } from "react";
import _pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
_pdfMake.vfs = pdfFonts.pdfMake.vfs;
export const pdfMake = _pdfMake;
import { clsx } from "clsx"
import { TDocumentDefinitions} from "pdfmake/interfaces";
import { Button } from "@/components/ui/button";
var buddhistEra = require('dayjs/plugin/buddhistEra')
import { IBM_Plex_Sans_Thai_Looped } from 'next/font/google';
import Head from "next/head";

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
dayjs.extend(buddhistEra);

pdfMake.fonts = {
  THSarabunNew: {
    normal: "https://fonts.cdnfonts.com/s/16399/THSarabunNew.woff",
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
  const [selectedShift, setSelectedShift] = useState(0);

  let shiftName = '';
if (Number(selectedShift) === 1) {
    shiftName = 'เวรดึก';
} else if (Number(selectedShift) === 2) {
    shiftName = 'เวรเช้า';
} else if (Number(selectedShift) === 3) {
    shiftName = 'เวรบ่าย';
} else {
    shiftName = 'Invalid Shift';
}



  const formatThaiMonth = dayjs(selectedDate).format('D MMMM BBBB');

  const handleSelectChange = (e: any) => {
    setSelectedShift(e);
};

const handleDatePickerChange = (christDate: any, buddhistDate: any) => {
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
        setTableData(data.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [selectedDate,selectedShift]);

  const generatePDF = () => {
    const tableRows:any = [];
    const tableEmsRows:any = [];
    const tableSmcRows:any = [];
    const tableOrRows:any = [];

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
      console.log("tableRows", tableRows);


      if (item[3] === 'MICU') {
        const rowMicu = [
          { text: index+1,alignment: 'center'
          },
              { text: item[3]
                
              },
              { 
                text: item[43],
                alignment: 'center'
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
                text: item[46],
                alignment: 'center'
              },
              { 
                text: item[47],alignment: 'center' 
              },
              { text: item[48],alignment: 'center' },
              { text: item[49],alignment: 'center' },
              { text: item[50],alignment: 'center' },
              { text: item[51],alignment: 'center' },
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
              { text: item[156],alignment: 'center' },
              { text: item[157],alignment: 'center' },
              { text: item[158],alignment: 'center' },
              { text: item[159],alignment: 'center' },
              { text: item[160],alignment: 'center' },
              { text: item[161] }
        ]
        tableRows.push(rowMicu); 
      } 

      if (item[3] === 'SICU') {
        const rowSicu = [
          { text: index+1,alignment: 'center'
          },
              { text: item[3]
                
              },
              { 
                text: item[43],
                alignment: 'center'
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
                text: item[46],
                alignment: 'center'
              },
              { 
                text: item[47],alignment: 'center' 
              },
              { text: item[48],alignment: 'center' },
              { text: item[49],alignment: 'center' },
              { text: item[50],alignment: 'center' },
              { text: item[51],alignment: 'center' },
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
              { text: item[156],alignment: 'center' },
              { text: item[157],alignment: 'center' },
              { text: item[158],alignment: 'center' },
              { text: item[159],alignment: 'center' },
              { text: item[160],alignment: 'center' },
              { text: item[161] }
        ]
        tableRows.push(rowSicu); 
      } 

      if (item[3] === 'SUB  ICU') {
        const rowSubicu = [
          { text: index+1,alignment: 'center'
          },
              { text: item[3]
                
              },
              { 
                text: item[43],
                alignment: 'center'
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
                text: item[46],
                alignment: 'center'
              },
              { 
                text: item[47],alignment: 'center' 
              },
              { text: item[48],alignment: 'center' },
              { text: item[49],alignment: 'center' },
              { text: item[50],alignment: 'center' },
              { text: item[51],alignment: 'center' },
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
              { text: item[156],alignment: 'center' },
              { text: item[157],alignment: 'center' },
              { text: item[158],alignment: 'center' },
              { text: item[159],alignment: 'center' },
              { text: item[160],alignment: 'center' },
              { text: item[161] }
        ]
        tableRows.push(rowSubicu); 
      } 

      if (item[3] === 'NICU') {
        const rowNicu = [
          { text: index+1,alignment: 'center'
          },
              { text: item[3]
                
              },
              { 
                text: item[43],
                alignment: 'center'
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
                text: item[46],
                alignment: 'center'
              },
              { 
                text: item[47],alignment: 'center' 
              },
              { text: item[48],alignment: 'center' },
              { text: item[49],alignment: 'center' },
              { text: item[50],alignment: 'center' },
              { text: item[51],alignment: 'center' },
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
              { text: item[156],alignment: 'center' },
              { text: item[157],alignment: 'center' },
              { text: item[158],alignment: 'center' },
              { text: item[159],alignment: 'center' },
              { text: item[160],alignment: 'center' },
              { text: item[161] }
        ]
        tableRows.push(rowNicu); 
      } 

      if (item[3] === 'หอผู้ป่วยอายุรกรรมหญิง') {
        const rowMedFemale = [
          { text: index+1,alignment: 'center'
          },
              { text: item[3]
                
              },
              { 
                text: item[43],
                alignment: 'center'
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
                text: item[46],
                alignment: 'center'
              },
              { 
                text: item[47],alignment: 'center' 
              },
              { text: item[48],alignment: 'center' },
              { text: item[49],alignment: 'center' },
              { text: item[50],alignment: 'center' },
              { text: item[51],alignment: 'center' },
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
              { text: item[156],alignment: 'center' },
              { text: item[157],alignment: 'center' },
              { text: item[158],alignment: 'center' },
              { text: item[159],alignment: 'center' },
              { text: item[160],alignment: 'center' },
              { text: item[161] }
        ]
        tableRows.push(rowMedFemale); 
      } 

      if (item[3] === 'หอผู้ป่วยอายุรกรรมชาย') {
        const rowMedmale = [
          { text: index+1,alignment: 'center'
          },
              { text: item[3]
                
              },
              { 
                text: item[43],
                alignment: 'center'
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
                text: item[46],
                alignment: 'center'
              },
              { 
                text: item[47],alignment: 'center' 
              },
              { text: item[48],alignment: 'center' },
              { text: item[49],alignment: 'center' },
              { text: item[50],alignment: 'center' },
              { text: item[51],alignment: 'center' },
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
              { text: item[156],alignment: 'center' },
              { text: item[157],alignment: 'center' },
              { text: item[158],alignment: 'center' },
              { text: item[159],alignment: 'center' },
              { text: item[160],alignment: 'center' },
              { text: item[161] }
        ]
        tableRows.push(rowMedmale); 
      } 

      if (item[3] === 'หอผู้ป่วยศัลยกรรมหญิง') {
        const rowSurgFemale = [
          { text: index+1,alignment: 'center'
          },
              { text: item[3]
                
              },
              { 
                text: item[43],
                alignment: 'center'
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
                text: item[46],
                alignment: 'center'
              },
              { 
                text: item[47],alignment: 'center' 
              },
              { text: item[48],alignment: 'center' },
              { text: item[49],alignment: 'center' },
              { text: item[50],alignment: 'center' },
              { text: item[51],alignment: 'center' },
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
              { text: item[156],alignment: 'center' },
              { text: item[157],alignment: 'center' },
              { text: item[158],alignment: 'center' },
              { text: item[159],alignment: 'center' },
              { text: item[160],alignment: 'center' },
              { text: item[161] }
        ]
        tableRows.push(rowSurgFemale); 
      } 

      if (item[3] === 'หอผู้ป่วยจิตเวช') {
        const rowPsychiatry = [
          { text: index+1,alignment: 'center'
          },
              { text: item[3]
                
              },
              { 
                text: item[43],
                alignment: 'center'
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
                text: item[46],
                alignment: 'center'
              },
              { 
                text: item[47],alignment: 'center' 
              },
              { text: item[48],alignment: 'center' },
              { text: item[49],alignment: 'center' },
              { text: item[50],alignment: 'center' },
              { text: item[51],alignment: 'center' },
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
              { text: item[156],alignment: 'center' },
              { text: item[157],alignment: 'center' },
              { text: item[158],alignment: 'center' },
              { text: item[159],alignment: 'center' },
              { text: item[160],alignment: 'center' },
              { text: item[161] }
        ]
        tableRows.push(rowPsychiatry); 
      } 

      if (item[3] === 'งานห้องคลอด') {
        const rowLR = [
          { text: index+1,alignment: 'center'
          },
              { text: item[3]
                
              },
              { 
                text: item[43],
                alignment: 'center'
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
                text: item[46],
                alignment: 'center'
              },
              { 
                text: item[47],alignment: 'center' 
              },
              { text: item[48],alignment: 'center' },
              { text: item[49],alignment: 'center' },
              { text: item[50],alignment: 'center' },
              { text: item[51],alignment: 'center' },
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
              { text: item[156],alignment: 'center' },
              { text: item[157],alignment: 'center' },
              { text: item[158],alignment: 'center' },
              { text: item[159],alignment: 'center' },
              { text: item[160],alignment: 'center' },
              { text: item[161] }
        ]
        tableRows.push(rowLR); 
      } 

      if (item[3] === 'หอผู้ป่วยสุขใจ') {
        const rowHappyHeart = [
          { text: index+1,alignment: 'center'
          },
              { text: item[3]
                
              },
              { 
                text: item[43],
                alignment: 'center'
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
                text: item[46],
                alignment: 'center'
              },
              { 
                text: item[47],alignment: 'center' 
              },
              { text: item[48],alignment: 'center' },
              { text: item[49],alignment: 'center' },
              { text: item[50],alignment: 'center' },
              { text: item[51],alignment: 'center' },
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
              { text: item[156],alignment: 'center' },
              { text: item[157],alignment: 'center' },
              { text: item[158],alignment: 'center' },
              { text: item[159],alignment: 'center' },
              { text: item[160],alignment: 'center' },
              { text: item[161] }
        ]
        tableRows.push(rowHappyHeart); 
      } 

      if (item[3] === 'พิเศษอายุรกรรม ชั้น2 (อาคาร75ปี)') {
        const rowSPmed = [
          { text: index+1,alignment: 'center'
          },
              { text: item[3]
                
              },
              { 
                text: item[29],
                alignment: 'center'
              },
              { 
                text: item[30],
                alignment: 'center'
              },
              { 
                text: item[31],
                alignment: 'center'
              },
              { 
                text: item[32],
                alignment: 'center'
              },
              { 
                text: item[33],alignment: 'center' 
              },
              { text: "",alignment: 'center' },
              { text: "",alignment: 'center' },
              { text: "",alignment: 'center' },
              { text: "",alignment: 'center' },
              { text: item[97],alignment: 'center' },
              { text: item[98],alignment: 'center' },
              { text: item[99],alignment: 'center' },
              { text: item[100],alignment: 'center' },
              { text: item[101],alignment: 'center' },
              { text: item[102],alignment: 'center' },
              { text: item[103],alignment: 'center' },
              { text: item[104],alignment: 'center' },
              { text: item[105],alignment: 'center' },
              { text: item[134],alignment: 'center' },
              { text: item[135],alignment: 'center' },
              { text: item[156],alignment: 'center' },
              { text: item[157],alignment: 'center' },
              { text: item[158],alignment: 'center' },
              { text: item[159],alignment: 'center' },
              { text: item[160],alignment: 'center' },
              { text: item[161] }
        ]
        tableRows.push(rowSPmed); 
      } 

      if (item[3] === 'หอผู้ป่วยศัลยกรรมชาย') {
        const newRowMaleSurgicalWard = [
          [
          { text: index+1,alignment: 'center'
          },
              { text: item[3]
                
              },
              { 
                text: item[14],alignment: 'center'
              },
              { 
                text: item[15] ,alignment: 'center'
              },
              { 
                text: item[16],
                alignment: 'center'
              },
              { 
                text: item[17],
                alignment: 'center'
              },
              { 
                text: item[18],alignment: 'center' 
              },
              { text: "",alignment: 'center' },
              { text: "",alignment: 'center' },
              { text: "",alignment: 'center' },
              { text: "",alignment: 'center' },
              { text: item[70],alignment: 'center' },
              { text: item[71],alignment: 'center' },
              { text: item[72],alignment: 'center' },
              { text: item[73],alignment: 'center' },
              { text: item[74],alignment: 'center' },
              { text: item[75],alignment: 'center' },
              { text: item[76],alignment: 'center' },
              { text: item[77],alignment: 'center' },
              { text: item[78],alignment: 'center' },
              { text: item[128],alignment: 'center' },
              { text: item[129],alignment: 'center' },
              { text: item[156],alignment: 'center' },
              { text: item[157],alignment: 'center' },
              { text: item[158],alignment: 'center' },
              { text: item[159],alignment: 'center' },
              { text: item[160],alignment: 'center' },
              { text: item[161] }
        ],
        [
          { text: ""
          },
              { text: ""
                
              },
              { 
                text: item[34],alignment: 'center'
              },
              { 
                text: item[35] ,alignment: 'center'
              },
              { 
                text: item[36],
                alignment: 'center'
              },
              { 
                text: item[37],
                alignment: 'center'
              },
              { 
                text: item[38],alignment: 'center' 
              },
              { text: item[39],alignment: 'center' },
              { text: item[40],alignment: 'center' },
              { text: item[41],alignment: 'center' },
              { text: item[42],alignment: 'center' },
              { text: item[106],alignment: 'center' },
              { text: item[107],alignment: 'center' },
              { text: item[108],alignment: 'center' },
              { text: item[109],alignment: 'center' },
              { text: item[110],alignment: 'center' },
              { text: item[111],alignment: 'center' },
              { text: item[112],alignment: 'center' },
              { text: item[113],alignment: 'center' },
              { text: item[114],alignment: 'center' },
              { text: item[136],alignment: 'center' },
              { text: "" },
              { text: "" },
              { text: "" },
              { text: "" },
              { text: "" },
              { text: "" },
              { text: "" }
          ]
        ];
        tableRows.push(...newRowMaleSurgicalWard); 
      } 
      
      if (item[3] === 'หอผู้ป่วยศัลยกรรมกระดูก') {
        const newRowOrthopedicSurgicalWard = [
          [
            { text: index+1,alignment: 'center'
            },
                { text: item[3]
                  
                },
                { 
                  text: item[14],alignment: 'center'
                },
                { 
                  text: item[15] ,alignment: 'center'
                },
                { 
                  text: item[16],
                  alignment: 'center'
                },
                { 
                  text: item[17],
                  alignment: 'center'
                },
                { 
                  text: item[18],alignment: 'center' 
                },
                { text: "",alignment: 'center' },
                { text: "",alignment: 'center' },
                { text: "",alignment: 'center' },
                { text: "",alignment: 'center' },
                { text: item[70],alignment: 'center' },
                { text: item[71],alignment: 'center' },
                { text: item[72],alignment: 'center' },
                { text: item[73],alignment: 'center' },
                { text: item[74],alignment: 'center' },
                { text: item[75],alignment: 'center' },
                { text: item[76],alignment: 'center' },
                { text: item[77],alignment: 'center' },
                { text: item[78],alignment: 'center' },
                { text: item[128],alignment: 'center' },
                { text: item[129],alignment: 'center' },
                { text: item[156],alignment: 'center' },
                { text: item[157],alignment: 'center' },
                { text: item[158],alignment: 'center' },
                { text: item[159],alignment: 'center' },
                { text: item[160],alignment: 'center' },
                { text: item[161] }
          ],
          [
            { text: ""
            },
                { text: ""
                  
                },
                { 
                  text: item[34],alignment: 'center'
                },
                { 
                  text: item[35] ,alignment: 'center'
                },
                { 
                  text: item[36],
                  alignment: 'center'
                },
                { 
                  text: item[37],
                  alignment: 'center'
                },
                { 
                  text: item[38],alignment: 'center' 
                },
                { text: item[39],alignment: 'center' },
                { text: item[40],alignment: 'center' },
                { text: item[41],alignment: 'center' },
                { text: item[42],alignment: 'center' },
                { text: item[106],alignment: 'center' },
                { text: item[107],alignment: 'center' },
                { text: item[108],alignment: 'center' },
                { text: item[109],alignment: 'center' },
                { text: item[110],alignment: 'center' },
                { text: item[111],alignment: 'center' },
                { text: item[112],alignment: 'center' },
                { text: item[113],alignment: 'center' },
                { text: item[114],alignment: 'center' },
                { text: item[136],alignment: 'center' },
                { text: "" },
                { text: "" },
                { text: "" },
                { text: "" },
                { text: "" },
                { text: "" },
                { text: "" }
            ]
      ]
        tableRows.push(...newRowOrthopedicSurgicalWard); 
      }

      if (item[3] === 'หอผู้ป่วยตาหูคอจมูก') {
        const newRowENTWard = [
          [
            { text: index+1,alignment: 'center'
            },
                { text: item[3]
                  
                },
                { 
                  text: item[14],alignment: 'center'
                },
                { 
                  text: item[15] ,alignment: 'center'
                },
                { 
                  text: item[16],
                  alignment: 'center'
                },
                { 
                  text: item[17],
                  alignment: 'center'
                },
                { 
                  text: item[18],alignment: 'center' 
                },
                { text: "",alignment: 'center' },
                { text: "",alignment: 'center' },
                { text: "",alignment: 'center' },
                { text: "",alignment: 'center' },
                { text: item[70],alignment: 'center' },
                { text: item[71],alignment: 'center' },
                { text: item[72],alignment: 'center' },
                { text: item[73],alignment: 'center' },
                { text: item[74],alignment: 'center' },
                { text: item[75],alignment: 'center' },
                { text: item[76],alignment: 'center' },
                { text: item[77],alignment: 'center' },
                { text: item[78],alignment: 'center' },
                { text: item[128],alignment: 'center' },
                { text: item[129],alignment: 'center' },
                { text: item[156],alignment: 'center' },
                { text: item[157],alignment: 'center' },
                { text: item[158],alignment: 'center' },
                { text: item[159],alignment: 'center' },
                { text: item[160],alignment: 'center' },
                { text: item[161] }
          ],
          [
            { text: ""
            },
                { text: ""
                  
                },
                { 
                  text: item[34],alignment: 'center'
                },
                { 
                  text: item[35] ,alignment: 'center'
                },
                { 
                  text: item[36],
                  alignment: 'center'
                },
                { 
                  text: item[37],
                  alignment: 'center'
                },
                { 
                  text: item[38],alignment: 'center' 
                },
                { text: item[39],alignment: 'center' },
                { text: item[40],alignment: 'center' },
                { text: item[41],alignment: 'center' },
                { text: item[42],alignment: 'center' },
                { text: item[106],alignment: 'center' },
                { text: item[107],alignment: 'center' },
                { text: item[108],alignment: 'center' },
                { text: item[109],alignment: 'center' },
                { text: item[110],alignment: 'center' },
                { text: item[111],alignment: 'center' },
                { text: item[112],alignment: 'center' },
                { text: item[113],alignment: 'center' },
                { text: item[114],alignment: 'center' },
                { text: item[136],alignment: 'center' },
                { text: "" },
                { text: "" },
                { text: "" },
                { text: "" },
                { text: "" },
                { text: "" },
                { text: "" }
            ]
        ]
        tableRows.push(...newRowENTWard); 
      }

      if (item[3] === 'หอผู้ป่วยสูตินรีเวชกรรม') {
        const newRowObstetricGynecologyWard = [
          [
            { text: index+1,alignment: 'center'
            },
                { text: item[3]
                  
                },
                { 
                  text: item[14],alignment: 'center'
                },
                { 
                  text: item[15] ,alignment: 'center'
                },
                { 
                  text: item[16],
                  alignment: 'center'
                },
                { 
                  text: item[17],
                  alignment: 'center'
                },
                { 
                  text: item[18],alignment: 'center' 
                },
                { text: "",alignment: 'center' },
                { text: "",alignment: 'center' },
                { text: "",alignment: 'center' },
                { text: "",alignment: 'center' },
                { text: item[70],alignment: 'center' },
                { text: item[71],alignment: 'center' },
                { text: item[72],alignment: 'center' },
                { text: item[73],alignment: 'center' },
                { text: item[74],alignment: 'center' },
                { text: item[75],alignment: 'center' },
                { text: item[76],alignment: 'center' },
                { text: item[77],alignment: 'center' },
                { text: item[78],alignment: 'center' },
                { text: item[128],alignment: 'center' },
                { text: item[129],alignment: 'center' },
                { text: item[156],alignment: 'center' },
                { text: item[157],alignment: 'center' },
                { text: item[158],alignment: 'center' },
                { text: item[159],alignment: 'center' },
                { text: item[160],alignment: 'center' },
                { text: item[161] }
          ],
          [
            { text: ""
            },
                { text: ""
                  
                },
                { 
                  text: item[34],alignment: 'center'
                },
                { 
                  text: item[35] ,alignment: 'center'
                },
                { 
                  text: item[36],
                  alignment: 'center'
                },
                { 
                  text: item[37],
                  alignment: 'center'
                },
                { 
                  text: item[38],alignment: 'center' 
                },
                { text: item[39],alignment: 'center' },
                { text: item[40],alignment: 'center' },
                { text: item[41],alignment: 'center' },
                { text: item[42],alignment: 'center' },
                { text: item[106],alignment: 'center' },
                { text: item[107],alignment: 'center' },
                { text: item[108],alignment: 'center' },
                { text: item[109],alignment: 'center' },
                { text: item[110],alignment: 'center' },
                { text: item[111],alignment: 'center' },
                { text: item[112],alignment: 'center' },
                { text: item[113],alignment: 'center' },
                { text: item[114],alignment: 'center' },
                { text: item[136],alignment: 'center' },
                { text: "" },
                { text: "" },
                { text: "" },
                { text: "" },
                { text: "" },
                { text: "" },
                { text: "" }
            ]
      ]
        tableRows.push(...newRowObstetricGynecologyWard); 
      }

      if (item[3] === 'หอผู้ป่วยกุมารเวชกรรม') {
        const newRowBabyWard = [
          [
            { text: index+1,alignment: 'center'
            },
                { text: item[3]
                  
                },
                { 
                  text: item[14],alignment: 'center'
                },
                { 
                  text: item[15] ,alignment: 'center'
                },
                { 
                  text: item[16],
                  alignment: 'center'
                },
                { 
                  text: item[17],
                  alignment: 'center'
                },
                { 
                  text: item[18],alignment: 'center' 
                },
                { text: "",alignment: 'center' },
                { text: "",alignment: 'center' },
                { text: "",alignment: 'center' },
                { text: "",alignment: 'center' },
                { text: item[70],alignment: 'center' },
                { text: item[71],alignment: 'center' },
                { text: item[72],alignment: 'center' },
                { text: item[73],alignment: 'center' },
                { text: item[74],alignment: 'center' },
                { text: item[75],alignment: 'center' },
                { text: item[76],alignment: 'center' },
                { text: item[77],alignment: 'center' },
                { text: item[78],alignment: 'center' },
                { text: item[128],alignment: 'center' },
                { text: item[129],alignment: 'center' },
                { text: item[156],alignment: 'center' },
                { text: item[157],alignment: 'center' },
                { text: item[158],alignment: 'center' },
                { text: item[159],alignment: 'center' },
                { text: item[160],alignment: 'center' },
                { text: item[161] }
          ],
          [
            { text: ""
            },
                { text: ""
                  
                },
                { 
                  text: item[34],alignment: 'center'
                },
                { 
                  text: item[35] ,alignment: 'center'
                },
                { 
                  text: item[36],
                  alignment: 'center'
                },
                { 
                  text: item[37],
                  alignment: 'center'
                },
                { 
                  text: item[38],alignment: 'center' 
                },
                { text: item[39],alignment: 'center' },
                { text: item[40],alignment: 'center' },
                { text: item[41],alignment: 'center' },
                { text: item[42],alignment: 'center' },
                { text: item[106],alignment: 'center' },
                { text: item[107],alignment: 'center' },
                { text: item[108],alignment: 'center' },
                { text: item[109],alignment: 'center' },
                { text: item[110],alignment: 'center' },
                { text: item[111],alignment: 'center' },
                { text: item[112],alignment: 'center' },
                { text: item[113],alignment: 'center' },
                { text: item[114],alignment: 'center' },
                { text: item[136],alignment: 'center' },
                { text: "" },
                { text: "" },
                { text: "" },
                { text: "" },
                { text: "" },
                { text: "" },
                { text: "" }
            ]
      ]
        tableRows.push(...newRowBabyWard); 
      }

      if (item[3] === 'หอผู้ป่วยพระสงฆ์ ชั้น 6 (อาคาร75ปี)') {
        const newRowMonkWard = [ 
          [
            { text: index+1,alignment: 'center'
            },
                { text: item[3]
                  
                },
                { 
                  text: item[4],alignment: 'center'
                },
                { 
                  text: item[5],alignment: 'center'
                },
                { 
                  text: item[6],
                  alignment: 'center'
                },
                { 
                  text: item[7],
                  alignment: 'center'
                },
                { 
                  text: item[8],alignment: 'center' 
                },
                { text: "",alignment: 'center' },
                { text: "",alignment: 'center' },
                { text: "",alignment: 'center' },
                { text: "",alignment: 'center' },
                { text: item[52],alignment: 'center' },
                { text: item[53],alignment: 'center' },
                { text: item[54],alignment: 'center' },
                { text: item[55],alignment: 'center' },
                { text: item[56],alignment: 'center' },
                { text: item[57],alignment: 'center' },
                { text: item[58],alignment: 'center' },
                { text: item[59],alignment: 'center' },
                { text: item[60],alignment: 'center' },
                { text: item[124],alignment: 'center' },
                { text: item[125],alignment: 'center' },
                { text: item[156],alignment: 'center' },
                { text: item[157],alignment: 'center' },
                { text: item[158],alignment: 'center' },
                { text: item[159],alignment: 'center' },
                { text: item[160],alignment: 'center' },
                { text: item[161] }
          ],
          
          [
          { text: "",
          },
              { text: ""
                
              },
              { 
                text: item[9],alignment: 'center'
              },
              { 
                text:item[10],alignment: 'center'
              },
              { 
                text: item[11],
                alignment: 'center'
              },
              { 
                text: item[12],
                alignment: 'center'
              },
              { 
                text: item[13],alignment: 'center' 
              },
              { text: "",alignment: 'center' },
              { text: "",alignment: 'center' },
              { text: "",alignment: 'center' },
              { text: "",alignment: 'center' },
              { text: item[61],alignment: 'center' },
              { text: item[62],alignment: 'center' },
              { text: item[63],alignment: 'center' },
              { text: item[64],alignment: 'center' },
              { text: item[65],alignment: 'center' },
              { text: item[66],alignment: 'center' },
              { text: item[67],alignment: 'center' },
              { text: item[68],alignment: 'center' },
              { text: item[69],alignment: 'center' },
              { text: item[126],alignment: 'center' },
              { text: item[127],alignment: 'center' },
              { text: "" },
              { text: "" },
              { text: "" },
              { text: "" },
              { text: "" },
              { text: "" }
        ]
      ]
        tableRows.push(...newRowMonkWard); 
      }

      if (item[3] === 'หอผู้ป่วยพิเศษชั้น 6-7 อาคาร100ปีฯ') {
        const newRowSpecialWard = [
          [
            { text: index+1,alignment: 'center'
            },
                { text: item[3]
                  
                },
                { 
                  text: item[19],alignment: 'center'
                },
                { 
                  text: item[20],alignment: 'center'
                },
                { 
                  text: item[21],
                  alignment: 'center'
                },
                { 
                  text: item[22],
                  alignment: 'center'
                },
                { 
                  text: item[23],alignment: 'center' 
                },
                { text: "",alignment: 'center' },
                { text: "",alignment: 'center' },
                { text: "",alignment: 'center' },
                { text: "",alignment: 'center' },
                { text: item[79],alignment: 'center' },
                { text: item[80],alignment: 'center' },
                { text: item[81],alignment: 'center' },
                { text: item[82],alignment: 'center' },
                { text: item[83],alignment: 'center' },
                { text: item[84],alignment: 'center' },
                { text: item[85],alignment: 'center' },
                { text: item[86],alignment: 'center' },
                { text: item[87],alignment: 'center' },
                { text: item[130],alignment: 'center' },
                { text: item[131],alignment: 'center' },
                { text: item[156],alignment: 'center' },
                { text: item[157],alignment: 'center' },
                { text: item[158],alignment: 'center' },
                { text: item[159],alignment: 'center' },
                { text: item[160],alignment: 'center' },
                { text: item[161] }
          ],
          [
          { text: "",
          },
              { text: ""
                
              },
              { 
                text: item[24],alignment: 'center'
              },
              { 
                text: item[25],alignment: 'center' 
              },
              { 
                text: item[26],
                alignment: 'center'
              },
              { 
                text: item[27],
                alignment: 'center'
              },
              { 
                text: item[28],alignment: 'center' 
              },
              { text: "",alignment: 'center' },
              { text: "",alignment: 'center' },
              { text: "",alignment: 'center' },
              { text: "",alignment: 'center' },
              { text: item[88],alignment: 'center' },
              { text: item[89],alignment: 'center' },
              { text: item[90],alignment: 'center' },
              { text: item[91],alignment: 'center' },
              { text: item[92],alignment: 'center' },
              { text: item[93],alignment: 'center' },
              { text: item[94],alignment: 'center' },
              { text: item[95],alignment: 'center' },
              { text: item[96],alignment: 'center' },
              { text: item[132],alignment: 'center' },
              { text: item[133],alignment: 'center' },
              { text: "" },
              { text: "" },
              { text: "" },
              { text: "" },
              { text: "" },
              { text: "" }
        ]
      ]
        tableRows.push(...newRowSpecialWard); 
      }

      if (item[3] === 'งานห้องผ่าตัด') {
        const newRowOr = 
          [
            {text:index+1,alignment: 'center'},
            {text:item[3]},
            { text: item[138],alignment: 'center' },
            { text: item[156],alignment: 'center' },
                { text: item[157],alignment: 'center' },
                { text: item[158],alignment: 'center' },
                { text: item[159],alignment: 'center' },
                { text: item[160],alignment: 'center' },
                { text: item[161],alignment: 'center' }
          ]
  
        tableOrRows.push(newRowOr); 
      }

      if (item[3] === 'งานวิสัญญีพยาบาล') {
        const newRowAnes = [
          {text:index+1,alignment: 'center'},
          {text:item[3]},
          { text: item[138],alignment: 'center' },
          { text: item[156],alignment: 'center' },
              { text: item[157],alignment: 'center' },
              { text: item[158],alignment: 'center' },
              { text: item[159],alignment: 'center' },
              { text: item[160],alignment: 'center' },
              { text: item[161],alignment: 'center' }
        ]
        tableOrRows.push(newRowAnes); 
      }

      if (item[3] === 'SMC') {
        const newRowSmc = [
          {text: index+1,alignment: 'center'},
          {text: item[3]},
          { text: item[139],alignment: 'center' },
          { text: item[140],alignment: 'center' },                
          { text: item[141],alignment: 'center' },                
          { text: item[142],alignment: 'center' },                
          { text: item[143],alignment: 'center' },                
          { text: item[144],alignment: 'center' },                
          { text: item[145],alignment: 'center' },                
          { text: item[146],alignment: 'center' },                
          { text: item[147],alignment: 'center' },                
          { text: item[156],alignment: 'center' },
              { text: item[157],alignment: 'center' },
              { text: item[158],alignment: 'center' },
              { text: item[159],alignment: 'center' },
              { text: item[160],alignment: 'center' },
              { text: item[161],alignment: 'center' }
        ]
        tableSmcRows.push(newRowSmc); 
      }

      if (item[3] === 'งานอุบัติเหตุฉุกเฉิน') {
        const newRowEms = 
          [
            {text : index+1,alignment: 'center'},
            {text : item[3]},
            { text: item[148],alignment: 'center' },
            { text: item[149],alignment: 'center' },                
            { text: item[150],alignment: 'center' },                
            { text: item[151],alignment: 'center' },                
            { text: item[152],alignment: 'center' },                
            { text: item[153],alignment: 'center' },                
            { text: item[154],alignment: 'center' },                
            { text: item[155],alignment: 'center' },                
            { text: item[162],alignment: 'center' },                
            { text: item[156],alignment: 'center' },
            { text: item[157],alignment: 'center' },
            { text: item[158],alignment: 'center' },
            { text: item[159],alignment: 'center' },
            { text: item[160],alignment: 'center' },
            { text: item[161],alignment: 'center' }
          ]
      
        tableEmsRows.push(newRowEms); 
      }
    });

    // const docDefinition: TDocumentDefinitions = {
    //   pageSize: 'A4',
    //   pageOrientation: 'landscape',
    //   defaultStyle: {
    //     font: 'THSarabunNew',
    //     fontSize: 11,
    //   },
    //   // pageMargins: [30, 30, 30, 30],
     
    // }
  
    
    const docDefinition:TDocumentDefinitions = {
      pageSize: "A4",
      pageOrientation: "landscape",
      defaultStyle: {
        font: "THSarabunNew",
        fontSize: 11 ,
      },
      // content: [{ text: 'test' }],
      content: [
        {
          text: `แบบรายงานการนิเทศ\nผู้ตรวจการพยาบาล กลุ่มการพยาบาล โรงพยาบาลสมเด็จพระเจ้าตากสินมหาราช\nวันที่ ${formatThaiMonth} ${shiftName}` as string,
          fontSize: 15,
          alignment: 'center',  
          margin: [0, 0, 0, 10],
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
        { text: '', pageBreak: 'after' }
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
              ...tableOrRows
            ],
          },
        },
        { text: '\n\n' },
        {
          style: "tableExample",
          table: {
            widths: [30,
              70,
              30,
              30,
              30,
              30,
              30,
              30,
              30,
              30,
              30,
              30,
              30,
              30,
              30,
              30,
              80,
           ],
            body: [
              [
                {
                  rowSpan: 2,
                  text: "ลำดับที่",
                  margin: [0, 20, 0, 0],
                  alignment: "center",
                },
                {
                  rowSpan: 2,
                  text: "หน่วยงาน",
                  alignment: "center",
                  margin: [0, 20, 0, 0]
                },

                {
                  colSpan: 9,
                  alignment: "center",
                  text: "ข้อมูลผู้ป่วย",
                  margin: [0, 5, 0, 0]
                },
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
                { rowSpan: 2, text: "รายชื่อ\nหัวหน้าเวร",alignment: "center",margin: [0, 15, 0, 0] }, 
              ],

              [
                "",
                "",
                { text: "Med+ID",alignment: 'center',margin: [0, 8, 0, 0] },
                { text: "Surg",alignment: 'center',margin: [0, 8, 0, 0] },                
                { text: "Ortho",alignment: 'center',margin: [0, 8, 0, 0] },                
                { text: "EYE",alignment: 'center',margin: [0, 8, 0, 0] },                
                { text: "Uro",alignment: 'center',margin: [0, 8, 0, 0] },                
                { text: "เวชศาสตร์",alignment: 'center',margin: [0, 8, 0, 0] },                
                { text: "Ped",alignment: 'center',margin: [0, 8, 0, 0] },                
                { text: "U/S,CT",alignment: 'center',margin: [0, 8, 0, 0] },                
                { text: "อื่นๆ",alignment: 'center',margin: [0, 8, 0, 0] },                
                {  text: "RN",margin: [0, 8, 0, 0],alignment: 'center' },
                {  text: "Para",margin: [0, 8, 0, 0],alignment: 'center' },
                {  text: "TN/PN",margin: [0, 8, 0, 0],alignment: 'center' },
                {  text: "EMT",margin: [0, 8, 0, 0],alignment: 'center' },
                {  text: "AID",margin: [0, 8, 0, 0],alignment: 'center' },
                "",
              ],
              ...tableSmcRows
            ],
          },
        },
        { text: '\n\n' },
        {
          style: "tableExample",
          table: {
            widths: [30,
              70,
              30,
              30,
              30,
              30,
              30,
              30,
              30,
              30,
              30,
              30,
              30,
              30,
              30,
              30,
              80,
           ],
            body: [
              [
                {
                  rowSpan: 2,
                  text: "ลำดับที่",
                  margin: [0, 20, 0, 0],
                  alignment: "center",
                },
                {
                  rowSpan: 2,
                  text: "หน่วยงาน",
                  alignment: "center",
                  margin: [0, 20, 0, 0]
                },

                {
                  colSpan: 9,
                  alignment: "center",
                  text: "ข้อมูลผู้ป่วย",
                  margin: [0, 5, 0, 0]
                },
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
                { rowSpan: 2, text: "รายชื่อ\nหัวหน้าเวร",alignment: "center",margin: [0, 15, 0, 0] }, 
              ],

              [
                "",
                "",
                { text: "R",alignment: 'center',margin: [0, 8, 0, 0] },
                { text: "E",alignment: 'center',margin: [0, 8, 0, 0] },                
                { text: "U",alignment: 'center',margin: [0, 8, 0, 0] },                
                { text: "S",alignment: 'center',margin: [0, 8, 0, 0] },                
                { text: "N",alignment: 'center',margin: [0, 8, 0, 0] },                
                { text: "ออก EMS",alignment: 'center',margin: [0, 8, 0, 0] },                
                { text: "รับ Refer",alignment: 'center',margin: [0, 8, 0, 0] },                
                { text: "ส่ง Refer",alignment: 'center',margin: [0, 8, 0, 0] },                
                { text: "คง\nพยาบาล",alignment: 'center',margin: [0, 3, 0, 0] },                
                {  text: "RN",margin: [0, 8, 0, 0],alignment: 'center' },
                {  text: "Para",margin: [0, 8, 0, 0],alignment: 'center' },
                {  text: "TN/PN",margin: [0, 8, 0, 0],alignment: 'center' },
                {  text: "EMT",margin: [0, 8, 0, 0],alignment: 'center' },
                {  text: "AID",margin: [0, 8, 0, 0],alignment: 'center' },
                "",
              ],
              ...tableEmsRows
            ],
          },
        },
      ],
    };
    pdfMake.createPdf(docDefinition).open();
  };

  return <>
  <div>
  <Head>
    <title>แบบรายงานการนิเทศพยาบาล</title>
  </Head>






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
</div>
  </>;
}

export default PDFMakeExample;
