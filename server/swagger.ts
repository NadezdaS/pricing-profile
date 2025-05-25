import swaggerJSDoc from 'swagger-jsdoc';

export const swaggerOptions: swaggerJSDoc.Options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'Pricing Profile API',
			version: '1.0.0',
			description: 'API docs for product pricing profiles',
		},
		servers: [
			{
				url: 'http://localhost:8080/api',
			},
		],
	},
	apis: ['./src/routes/*.ts']
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);
