import pg from 'pg'

export const db = new pg.Pool({
	host: "localhost",
	port: 5432,
	database: "one_page_project",
	user: "postgres",
	password: "admin"
})

