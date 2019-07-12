// import external dependencies
import express, { Application } from 'express';
import { default as parser } from 'body-parser';

// import internal dependencies
import config from './config';
import routes from './routes';

////////////////////////////////////////////////////////////////////////////////

const server: Application = express();

server.use(express.static('build'));
server.use(parser.json());
server.use(routes);

server.listen(3000, (error: any) => {
    if (error) {
        console.error(error);
    } else {
        console.log(`Server running at ${config.server.url}`);
    }
});
