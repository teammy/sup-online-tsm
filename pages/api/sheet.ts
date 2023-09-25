import { google } from "googleapis";
import keys from '../../key_gg.json'

export default function handler(req:any, res:any) {
    try {
        const client = new google.auth.JWT(
            keys.client_email, null, keys.private_key, ['https://www.googleapis.com/auth/spreadsheets']
        );

        client.authorize(async function(err, tokens) {
            if (err) {
                return res.status(400).send(JSON.stringify({error: true}));
            }

            const gsapi = google.sheets({version:'v4', auth: client});

            //CUSTOMIZATION FROM HERE
            const opt = {
                spreadsheetId: '1f3lPATgLXU5vsilWaylMqIm49U75EazBnHIcbGMC8LM',
                range: 'Sheet1!A2:A6'
            };

            let data = await gsapi.spreadsheets.values.get(opt);
            return res.status(400).send(JSON.stringify({error: false, data: data.data.values}));
        });
    } catch (e:any) {
        return res.status(400).send(JSON.stringify({error: true, message: e.message}));
    }
}