import React, { useEffect, useState } from "react";
import { Document, Page, Text, View, StyleSheet,Font } from "@react-pdf/renderer";
import { Table, TR, TH, TD } from "@ag-media/react-pdf-table";
import { Sarabun } from 'next/font/google';
const thaiSarabun = Sarabun({
  subsets: ['thai'],
  weight: "400"
});


type fetchedData = {
  title: string;
  description: string;
  price: number;
};
Font.register({ family: 'TH_Sarabun', fonts: [{ src: thaiSarabun }] });

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",

  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
    // fontFamily: 'TH_Sarabun',
  },
});


const MyDocument = ({ data }: { data: fetchedData }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page} orientation="landscape">
        <View style={styles.section}>
          <Text>แบบรายงานนิเทศ</Text>
          <Text>ผู้ตรวจการพยาบาล กลุ่มการพยาบาล โรงพยาบาลสมเด็จพระเจ้าตากสินมหาราช</Text>
          <Text>วันที่{} เวร {}</Text>
          <Table tdStyle={{
            padding: '10px',
          }}>
            <TH>
              <TD>ลำดับที่</TD>
              <TD>หน่วยงาน</TD>
              <TD>ยอดยกมา (แยกระดับ)</TD>
              <TD>ข้อมูลผู้ป่วย</TD>
              <TD>จำนวนเจ้าหน้าที่ (คน)</TD>
              <TD>รายชื่อหัวหน้าเวร</TD>
            </TH>
            <TH fixed>
              <TD>5</TD>
              <TD>4</TD>
              <TD>3</TD>
              <TD>2</TD>
              <TD>1</TD>
            </TH>
            <TR>
              <TD>{data.title}</TD>
              <TD>{data.description}</TD>
            </TR>
          </Table>
          <Table tdStyle={{
            padding: '10px',
            fontSize: 10,
          }}>
                                        <TR>
                                <TD style={{
                justifyContent: 'center',
                padding: '2px',
              }} weighting={0.1}>Row 2</TD>
              <TD>Col 1</TD>
                            </TR>
                            {/* <TH>
                                <TD>Col 1</TD>
                                <TD>Col 2</TD>
                                <TD>Col 3</TD>
                            </TH>
                            <TR>
                                <TD>Row 1</TD>
                                <TD>Row 1</TD>
                                <TD>Row 1</TD>
                            </TR> */}

                        </Table>
        </View>
      </Page>
    </Document>
  );
};

export default MyDocument;
