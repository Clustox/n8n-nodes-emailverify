import type {
	IAuthenticateGeneric,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class EmailVerifyApi implements ICredentialType {
	name = 'emailVerifyApi';
	displayName = 'EmailVerify.io API';
	documentationUrl = 'https://www.emailverify.io/api/docs/';

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			qs: {
				key: '={{$credentials.apiKey}}',
			},
		},
	};

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			required: true,
			description: 'API key from EmailVerify.io',
		},
	];
}
 