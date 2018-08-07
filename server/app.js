import express from 'express';
import cors from 'cors';
import graphqlHTTP from 'express-graphql';
import schema from './schema';
import { createServer } from 'http';

const PORT = 3021;

var app = express();

app.use(cors());

app.use('/graphql', graphqlHTTP({
    schema
}));

const server = createServer(app);

server.listen(PORT, () => {
    console.log(`API Server is now running on http://localhost:${PORT}/graphql`)
});