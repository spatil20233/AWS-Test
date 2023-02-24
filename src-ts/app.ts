import axios from 'axios';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { BASE_URL } from './helper';

export const lambdaHandler = async (
    event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
    try {
            const headers = { headers: { 'apiKey': event.headers['apikey'] } }
            const {to, from , amount} = event.queryStringParameters
            const query = `to=${to}&from=${from}&amount=${amount}`
            const fixerUrl = `${BASE_URL.fixerRate}?${query}`
            const exchangeUrl = `${BASE_URL.exchangeRate}?${query}`
            const resultFixer = await axios.get(fixerUrl, headers)
            const resultExchangeRates = await axios.get(exchangeUrl, headers)
            const resultAvg = (resultFixer.data.result + resultExchangeRates.data.result)/2
            return await response(200, 1, "Take Average Successfully !!", resultAvg, null) as APIGatewayProxyResult; 
        } catch (e) {
            return await response(500, 0, "Error: While taking average !!", null, e) as APIGatewayProxyResult;
    }
}

async function response(statusCode = 200, status = 0, msg = "Command executed", data = {}, err = {}, mobile_msg = "") {
    return new Promise(
        function (resolve, reject) {
            let r = {
                "status": Number(status),
                "msg": msg,
                "mobile_msg": mobile_msg != "" ? mobile_msg : msg,
                "data": data,
                "err": err
            };

            let response = {
                "statusCode": statusCode,
                "headers": {},
                "body": JSON.stringify(r),
                "isBase64Encoded": false
            };
            resolve(response);
        }
    );
}
    