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
	} catch (error) {
		const statusCode =
			(error as { statusCode?: number; httpCode?: number })?.statusCode ??
			(error as { httpCode?: number })?.httpCode;

		if (statusCode === 401) {
			throw new NodeApiError(this.getNode(), error as JsonObject, {
				message: 'Invalid EmailVerify.io API key',
				description: 'Check the API key configured in the EmailVerify.io credentials.',
				httpCode: '401',
			});
		}
		if (statusCode === 403) {
			throw new NodeApiError(this.getNode(), error as JsonObject, {
				message: 'Insufficient credits in your EmailVerify.io account',
				description: 'Top up your EmailVerify.io account and try again.',
				httpCode: '403',
			});
		}
		if (statusCode === 429) {
			throw new NodeApiError(this.getNode(), error as JsonObject, {
				message: 'EmailVerify.io rate limit exceeded',
				description: 'Slow down requests or upgrade your EmailVerify.io plan.',
				httpCode: '429',
			});
		}

		throw new NodeApiError(this.getNode(), error as JsonObject);
	}
}
