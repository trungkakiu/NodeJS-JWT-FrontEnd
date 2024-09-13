import qs from 'qs';
import axios from 'axios';
import { CookieJar } from 'tough-cookie';
import { wrapper } from 'axios-cookiejar-support';


const getHtmlUsingAxios = async () => {
  try {
    const response = await axios.get('http://220.231.119.171/kcntt/(S(2bsblpph42culdgzo1fbxgv))/login.aspx');
    await extractContentUsingRegex(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching HTML:', error.message);
  }
};

const extractContentUsingRegex = (html) => {
  const regex = /<input type="hidden" name="__VIEWSTATE" id="__VIEWSTATE" value="([\s\S]*?)" \/>/;
  const match = html.match(regex);

  if (match && match[1]) {
    console.log('Extracted VIEWSTATE:', match[1]);
    return match[1];
  } else {
    console.error('VIEWSTATE not found');
    return null;
  }
};

const extractEventValidationUsingRegex = (html) => {
  const regex = /<input type="hidden" name="__EVENTVALIDATION" id="__EVENTVALIDATION" value="([\s\S]*?)" \/>/;
  const match = html.match(regex);

  if (match && match[1]) {
    console.log('Extracted EVENTVALIDATION:', match[1]);
    return match[1];
  } else {
    console.error('EVENTVALIDATION not found');
    return null;
  }
};

const GetXlsxfile = async (txtUserName, txtPassword) => {
  let HTML = await getHtmlUsingAxios();
  let VIEWSTATE = extractContentUsingRegex(HTML);
  let EVENTVALIDATION = extractEventValidationUsingRegex(HTML);
  if (!VIEWSTATE || !EVENTVALIDATION) {
    console.error('Missing required fields for POST request.');
    return;
  }

  const data = qs.stringify({
    __EVENTTARGET: '',
    __EVENTARGUMENT: '',
    __LASTFOCUS: '',
    __VIEWSTATE: VIEWSTATE,
    __VIEWSTATEGENERATOR: '92FB0661',
    __EVENTVALIDATION: EVENTVALIDATION,
    'PageHeader1$drpNgonNgu': '010527EFBEB84BCA8919321CFD5C3A34',
    'PageHeader1$hidisNotify': '0',
    'PageHeader1$hidValueNotify': '.',
    txtUserName: txtUserName,
    txtPassword: txtPassword,
    btnSubmit: 'Đăng nhập',
    hidUserId: '',
    hidUserFullName: '',
    hidTrainingSystemId: ''
  });

  const config = {
    method: 'post',
    url: '/kcntt/(S(lkd02fyfaon1cjikhho1nd3o))/login.aspx',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
      'Accept-Encoding': 'gzip, deflate',
      'Accept-Language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5',
      'Cache-Control': 'max-age=0',
      'Connection': 'keep-alive',
      'Content-Length': data.length,
      'Host': '220.231.119.171',
      'Origin': 'http://220.231.119.171',
      'Referer': 'http://220.231.119.171/kcntt/(S(lkd02fyfaon1cjikhho1nd3o))/login.aspx',
      'Upgrade-Insecure-Requests': '1',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
    },
    data: data,
   
  };
  const jar = new CookieJar();
  const client = wrapper(axios.create({ jar }));
  try {
    const response = await client(config);
    const cookieString = jar.getCookieStringSync('http://220.231.119.171'); // Replace with the domain you are working with
    console.log('Cookies:', cookieString);    
    console.log('Response status:', response.status);
    console.log('Set-Cookie:', jar.serializeSync());
  } catch (error) {
    console.error('Error:', error.message);
  }
};

export default GetXlsxfile;
