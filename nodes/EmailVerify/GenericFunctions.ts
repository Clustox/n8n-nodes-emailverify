import type { 
	IDataObject, 
	IExecuteFunctions, 
	IHttpRequestMethods, 
	IRequestOptions,
} from 'n8n-workflow';

export async function emailVerifyIoApiRequest(
	this: IExecuteFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body: IDataObject = {},
	qs: IDataObject = {},
): Promise<any> {
	const credentials = await this.getCredentials('emailVerifyApi');
	
	const options: IRequestOptions = {
		method,
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
		uri: `https://app.emailverify.io/api/v1${endpoint}`,
		body,
		qs: {
			...qs,
			key: credentials.apiKey,
		},
		json: true,
	};

	if (Object.keys(body).length === 0) {
		delete options.body;
	}

	try {
		return await this.helpers.request(options);
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