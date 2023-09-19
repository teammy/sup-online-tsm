import React, { useState, useEffect } from "react";
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
// add thai datepicker
import { ThaiDatePicker } from "thaidatepicker-react";
import dayjs from "dayjs";
import "dayjs/locale/th";
dayjs.locale("th");
import dynamic from "next/dynamic";
import MyDocument from "@/components/mydocument";
import { clsx } from "clsx"

const PDFViewer = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
);

const IndexPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedThaiDate, setSelectedThaiDate] = useState();
  const [selectedShift, setSelectedShift] = useState("");
  const [fetchedData, setFetchedData] = useState("");

  const handleShiftChange = (value:any) => {
    console.log(value);
    setSelectedShift(value);
  };

  const handleSearch = async () => {
    const response = await fetch(`https://dummyjson.com/products/${selectedShift}`);
    // const response = await fetch(`YOUR_API_ENDPOINT?date=${selectedDate}&shift=${selectedShift}`);
    const data = await response.json();
    // console.table(data);
    setFetchedData(data);
  };

  const handleDatePickerChange = (christDate: any, buddhistDate: any) => {
    console.log(christDate);
    console.log(buddhistDate);
    setSelectedDate(christDate);
    setSelectedThaiDate(buddhistDate);
  };

  const handleSelectChange = (e: any) => {
    console.log(e);
    setSelectedShift(e);
};

  return (
    <>
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
              onClick={handleSearch}
              className={clsx("bg-[#5627ff] hover:bg-[#5627ff] text-white font-bold rounded hover:text-white border-none hover:opacity-100",thaiFont.className)}
            >
              ค้นหาข้อมูล
            </Button>
          </div>
        </div>
      </div>
      <hr className="mt-4 w-full border-[#cfcfcf]" />
      <div className="flex w-full justify-center items-center mt-4">
        <PDFViewer  width={1600} height={900}>
          <MyDocument data={fetchedData} />
        </PDFViewer>
      </div>
    </>
  );
};

export default IndexPage;
