import { GraphQLObjectType, GraphQLString } from 'graphql';
import { getAllField, searchIdField } from './utils';
import { widgetType } from './widget-type';
import { ownerType } from './owner-type';
import { bookType } from './book-type';
import { authorType } from './author-type';
import pluralize from 'pluralize';

export const queryType = new GraphQLObjectType({

	name: 'Query',
	description: 'A query operation for our GraphQL server.',
	fields: () => {

		const fields = {};

		fields.message = {
			type: GraphQLString,
			description: 'A kind message of hope and love.',
			resolve: () => 'Have a nice day.'
		};
		
		const resourceFields = widgetType => {
			const singularTypeName = widgetType.name.toLowerCase();
			const pluralTypeName = pluralize(singularTypeName);
			return {
				[pluralTypeName]: getAllField(widgetType, pluralTypeName),
				[singularTypeName]: searchIdField(widgetType, pluralTypeName),
			};
		};

		return {
			...fields,
			...resourceFields(widgetType),
			...resourceFields(ownerType),
			...resourceFields(bookType),
			...resourceFields(authorType),
		};
	}

});