import React, { useEffect, useState } from "react";
import { Document, Page, Text, View, StyleSheet,Font } from "@react-pdf/renderer";
import { Table, TR, TH, TD } from "@ag-media/react-pdf-table";

type fetchedData = {
  title: string;
  description: string;
  price: number;
};


Font.register({
  family: 'TH_Sarabun',
  format: 'truetype', 
  fonts: [
    { src: '/THSarabunNew.ttf' }
  ],
});

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    fontFamily: 'TH_Sarabun',
    fontSize: 14,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  center: {
    justifyContent: 'center',
    textAlign: 'center',
  },
  textBold: {
    fontWeight: 700,
  }
});


const MyDocument = ({ data }: { data: fetchedData }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page} orientation="landscape">
        <View style={styles.section}>
          <Text style={styles.center}>แบบรายงานนิเทศ</Text>
          <Text style={styles.center}>ผู้ตรวจการพยาบาล กลุ่มการพยาบาล โรงพยาบาลสมเด็จพระเจ้าตากสินมหาราช</Text>
          <Text style={styles.center}>วันที่ 26 กันยายน 2566 เวร เช้า</Text>
          

          <Table tdStyle={{
      padding: '2px'
    }} weightings={[0.05, 0.15, 0.03,0.03,0.03,0.03,0.03,0.03,0.03,0.03,0.04,0.04,0.04,
    0.03,0.03,0.03,0.03,0.04,0.04,0.04,0.04,0.04,0.04,0.04,0.04, 0.04, 0.04, 0.04]}>
                <TH fixed style={{
        fontSize: 13
      }}>
                    <TD weighting={0.05} style={{justifyContent: 'center'}}>ลำดับ</TD>
                    <TD weighting={0.19} style={{justifyContent: 'center'}}>หน่วยงาน</TD>
                    <TD style={{
          justifyContent: 'center',
          padding: '7px 0px 7px 0px'
        }} weighting={0.33}>ยอดยกมา (แยกระดับ)</TD>
        <TD style={{
          justifyContent: 'center',
          // padding: '2px 9px 2px 10px'
        }} weighting={0.7}>ข้อมูลผู้ป่วย</TD>
        <TD style={{
          justifyContent: 'center',
          // padding: '2px 9px 2px 10px'
        }} weighting={0.2}>จำนวนเจ้าหน้าที่(คน)</TD>
        <TD style={{
          justifyContent: 'center',
          padding: '2px 9px 2px 10px'
        }} weighting={0.1}>รายชื่อหัวหน้าเวร</TD>
                </TH>
                <TH fixed style={{
        fontSize: 11.5
      }}>
                    <TD weighting={0.04} />
                    <TD weighting={0.16}/>
                    <TD style={{
          justifyContent: 'center'
        }}>5</TD>
                    <TD style={{
          justifyContent: 'center'
        }}>4</TD>
                    <TD style={{
          justifyContent: 'center'
        }}>3</TD>
                    <TD style={{
          justifyContent: 'center'
        }}>2</TD>
                    <TD style={{
          justifyContent: 'center'
        }}>1</TD>
                    <TD style={{
          justifyContent: 'center'
        }}>ETT</TD>
                    <TD style={{
          justifyContent: 'center'
        }}>TT</TD>
                    <TD style={{
          justifyContent: 'center'
        }}>Ven</TD>
         <TD style={{
          justifyContent: 'center'
        }}>HFNC</TD>
                    <TD style={{
          justifyContent: 'flex-end'
        }}>รับใหม่</TD>
                    <TD style={{
          justifyContent: 'flex-end'
        }}>รับย้าย</TD>
                    <TD style={{
          justifyContent: 'center'
        }}>ผ่าตัด</TD>
        <TD style={{
          justifyContent: 'center'
        }}>D/C</TD>
        <TD style={{
          justifyContent: 'center'
        }}>ย้าย</TD>
        <TD style={{
          justifyContent: 'center'
        }}>Dead</TD>
        <TD style={{
          justifyContent: 'center'
        }}>ไม่สมัคร</TD>
        <TD style={{
          justifyContent: 'center'
        }}>รับ</TD>
        <TD style={{
          justifyContent: 'center'
        }}>ส่ง</TD>
        <TD style={{
          justifyContent: 'center'
        }}>คงพยาบ</TD>
        <TD style={{
          justifyContent: 'center'
        }}>ห้องพิเศษ</TD>
        <TD style={{
          justifyContent: 'center'
        }}>RN</TD>
        <TD style={{
          justifyContent: 'center'
        }}>Para</TD>
        <TD style={{
          justifyContent: 'center'
        }}>TN/PN</TD>
        <TD style={{
          justifyContent: 'center'
        }}>EMT</TD>
        <TD style={{
          justifyContent: 'center'
        }}>A/D</TD>
         <TD style={{
          justifyContent: 'center'
        }} weighting={0.1}>A/D</TD>

                </TH>
   
               
            </Table>
 
        </View>
      </Page>
    </Document>
  );
};

export default MyDocument;
