import type {
	IDataObject,
	IExecuteFunctions,
	IHttpRequestMethods,
	IHttpRequestOptions,
} from 'n8n-workflow';

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
			'Accept': 'application/json',
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
		if (error.statusCode === 401) {
			throw new Error('Invalid EmailVerify.io API key');
		}
		if (error.statusCode === 429) {
			throw new Error('Rate limit exceeded');
		}
		if (error.statusCode === 403) {
			throw new Error('Insufficient credits in your EmailVerify.io account');
		}
		throw error;
	}
}

 