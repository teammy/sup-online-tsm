import { google } from "googleapis";
import keys from "../../key_gg.json";

function convertDateToDDMMYYYY(date: string) {
  const [year, month, day] = date.split("-");
  return `${day}/${month}/${year}`;
}

function formatDate(date:string) {
    const d = new Date(date);
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
  }

function convertNumberToText(number: number) {
  const num = parseInt(number.toString(), 10);
  switch (num) {
    case 1:
      return "ดึก";
    case 2:
      return "เช้า";
    case 3:
      return "บ่าย";
    default:
      return "All";
  }
}

export default function handler(req: any, res: any) {
  const { sentDate, worktime } = req.query;
  const convertDate = formatDate(sentDate);
  const convertWorktime = convertNumberToText(parseInt(worktime));

  try {
    const client = new google.auth.JWT(
      keys.client_email,
      undefined,
      keys.private_key,
      ["https://www.googleapis.com/auth/spreadsheets"]
    );

    client.authorize(async function (err, tokens) {
      if (err) {
        return res.status(400).send(JSON.stringify({ error: true }));
      }

      const gsapi = google.sheets({ version: "v4", auth: client });

      //CUSTOMIZATION FROM HERE
      const opt = {
        spreadsheetId: process.env.SHEET_ID,
        range: "Sheet1!A2:FG",
      };

      let data: any = await gsapi.spreadsheets.values.get(opt);

      const departmentRows: { [department: string]: any[] } = {};

      for (const item of data.data.values) {
        if (item[1] === convertDate && item[2] === convertWorktime) {
            const department = item[3];
            const timestamp = new Date(item[0]).getTime();
            
            // If the department isn't in our map or if the current timestamp is more recent, update the map
            if (!departmentRows[department] || timestamp > new Date(departmentRows[department][0]).getTime()) {
                departmentRows[department] = item;
            }
        }
    }

    const filterData = Object.values(departmentRows);
    

      console.log(filterData);


      return res.status(200).send(JSON.stringify({error: false, data: filterData}));
    });
  } catch (e: any) {
    return res
      .status(400)
      .send(JSON.stringify({ error: true, message: e.message }));
  }
}
