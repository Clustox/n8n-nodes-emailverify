import type {
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class EmailVerifyApi implements ICredentialType {
	name = 'emailVerifyApi';
	displayName = 'EmailVerify.io API';
	documentationUrl = 'https://emailverify.io/documentation';

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