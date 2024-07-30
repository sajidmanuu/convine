import { Parser } from 'json2csv';

const generateCSV = (data) => {
  try {
    const json2csvParser = new Parser();
    return json2csvParser.parse(data);
  } catch (err) {
    throw new Error('Error generating CSV: ' + err.message);
  }
};

export default generateCSV;
