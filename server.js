const express = require('express');
const expressGraphQL = require('express-graphql').graphqlHTTP;
const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLList, GraphQLNonNull, GraphQLInt } = require('graphql');
const { authors, books } = require('./databaseContent');

const app = express();
const PORT_NUMBER = 3000;

// book type query
const BookType = new GraphQLObjectType({
	name: 'Book',
	description: 'This represents a book written by an author',
	fields: () => ({
		id: { type: GraphQLNonNull(GraphQLInt) },
		name: { type: GraphQLNonNull(GraphQLString) },
		authorId: { type: GraphQLNonNull(GraphQLInt) },
		author: {
			type: AuthorType,
			resolve: (book) => {
				return authors.find((author) => author.id === book.authorId);
			},
		},
	}),
});

// author type query
const AuthorType = new GraphQLObjectType({
	name: 'Author',
	description: 'This represents an Author of a book',
	fields: () => ({
		id: { type: GraphQLNonNull(GraphQLInt) },
		name: { type: GraphQLNonNull(GraphQLString) },
		books: {
			type: new GraphQLList(BookType),
			resolve: (author) => {
				return books.filter((book) => book.authorId === author.id);
			},
		},
	}),
});

// root or main query
const RootQueryType = new GraphQLObjectType({
	name: 'Query',
	description: 'Root Query',
	fields: () => ({
		books: {
			type: new GraphQLList(BookType), // List of book
			description: 'List of all Books',
			resolve: () => books,
		},
		book: {
			type: BookType, // single book
			description: 'A Single Book',
			args: {
				id: {
					type: GraphQLInt,
				},
			},
			resolve: (parent, args) => books.find((book) => book.id === args.id),
		},
		authors: {
			type: new GraphQLList(AuthorType), // List of author
			description: 'List of all Authors',
			resolve: () => authors,
		},
		author: {
			type: AuthorType, // single author
			description: 'A Single Author',
			args: {
				id: {
					type: GraphQLInt,
				},
			},
			resolve: (parent, args) => authors.find((author) => author.id === args.id),
		},
	}),
});

const RootMutationType = new GraphQLObjectType({
	name: 'Mutation',
	description: 'Root Mutation',
	fields: () => ({
		addBook: {
			type: BookType,
			description: 'Add a book',
			args: {
				name: { type: GraphQLNonNull(GraphQLString) },
				authorId: { type: GraphQLNonNull(GraphQLInt) },
			},
			resolve: (parent, args) => {
				const book = {
					id: books.length + 1,
					name: args.name,
					authorId: args.authorId,
				};
				books.push(book);
				return book;
			},
		},
		addAuthor: {
			type: AuthorType,
			description: 'Add an Author',
			args: {
				name: { type: GraphQLNonNull(GraphQLString) },
			},
			resolve: (parent, args) => {
				const author = {
					id: authors.length + 1,
					name: args.name,
				};
				authors.push(author);
				return author;
			},
		},
	}),
});

const schema = new GraphQLSchema({
	query: RootQueryType,
	mutation: RootMutationType, // mutation is used to perform operations such as adding, updating etc....
});

app.use(
	'/graphql',
	expressGraphQL({
		graphiql: true,
		schema: schema,
	})
);

app.listen(PORT_NUMBER, () => console.log(`Server listening on port ${PORT_NUMBER}`));
