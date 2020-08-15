const authors = [
	{ id: 1, name: 'J. K. Rowling' },
	{ id: 2, name: 'J. R. R. Tolkien' },
	{ id: 3, name: 'Brent Weeks' },
];

const books = [
	{ id: 1, name: 'Harry Potter part 1', authorId: 1 },
	{ id: 2, name: 'Harry Potter part 2', authorId: 1 },
	{ id: 3, name: 'Harry Potter part 3', authorId: 1 },
	{ id: 4, name: 'Harry Potter part 4', authorId: 2 },
	{ id: 5, name: 'Harry Potter part 5', authorId: 2 },
	{ id: 6, name: 'Harry Potter part 6', authorId: 2 },
	{ id: 7, name: 'Harry Potter part 7', authorId: 3 },
	{ id: 8, name: 'Harry Potter part 8', authorId: 3 },
];

module.exports = { authors, books}