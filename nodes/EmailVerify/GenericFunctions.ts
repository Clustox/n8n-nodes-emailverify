import type {
	IDataObject,
	IExecuteFunctions,
	IHttpRequestMethods,
	IHttpRequestOptions,
	JsonObject,
} from 'n8n-workflow';
import { NodeApiError } from 'n8n-workflow';

export async function emailVerifyIoApiRequest(
	this: IExecuteFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body: IDataObject = {},
	qs: IDataObject = {},
): Promise<any> {
	const options: IHttpRequestOptions = {
		method,
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		url: `https://app.emailverify.io/api/v1${endpoint}`,
		qs,
	};

	if (Object.keys(body).length > 0) {
		options.body = body;
	}

	try {
		return await this.helpers.httpRequestWithAuthentication.call(this, 'emailVerifyApi', options);
	} catch (error: any) {
		// Preserve HTTP context for n8n UI by throwing NodeApiError
		if (error?.statusCode === 401) {
			throw new NodeApiError(this.getNode(), {
				message: 'Invalid EmailVerify.io API key',
				statusCode: 401,
			} as unknown as JsonObject);
		}
		if (error?.statusCode === 429) {
			throw new NodeApiError(this.getNode(), {
				message: 'Rate limit exceeded',
				statusCode: 429,
			} as unknown as JsonObject);
		}
		if (error?.statusCode === 403) {
			throw new NodeApiError(this.getNode(), {
				message: 'Insufficient credits in your EmailVerify.io account',
				statusCode: 403,
			} as unknown as JsonObject);
		}
		throw new NodeApiError(this.getNode(), error as JsonObject);
	}
}
