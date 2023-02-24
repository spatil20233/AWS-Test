import { APIGatewayProxyEvent } from "aws-lambda";
import { lambdaHandler } from "../../src-ts/app";

describe('Unit test for app handler', function () {
    it('Verifies successful response !!', async () => {
        const event: APIGatewayProxyEvent = {
            body:{},
            queryStringParameters: {
                to: 'INR',
                from: 'EUR',
                amount:5
            },
            headers: {
                apikey:'oMVbCIBFA4sn1pcDMPWzXCHt2ciYH3we'
            }
        } as any
        const result = await lambdaHandler(event)
        expect(result.statusCode).toEqual(200);
    });
    it('Failed if API key Not Provided !!', async () => {
        const event: APIGatewayProxyEvent = {
            body:{},
            queryStringParameters: {
                to: 'INR',
                from: 'EUR',
                amount:5
            },
            headers: {
                
            }
        } as any
        const result = await lambdaHandler(event)
        expect(result.statusCode).toEqual(500);
    });
    it('Failed if to and from params not provided !!', async () => {
        const event: APIGatewayProxyEvent = {
            body:{},
            queryStringParameters: {
                
            },
            headers: {
                apikey:'oMVbCIBFA4sn1pcDMPWzXCHt2ciYH3we'
            }
        } as any
        const result = await lambdaHandler(event)
        expect(result.statusCode).toEqual(500);
    });
});
