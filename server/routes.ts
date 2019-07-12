// import external dependencies
import { Request, Response, Router } from 'express';

// import system dependencies
import path from 'path';

// import internal dependencies
// import config from './config';

// temporary
import { Property } from './models';
import { properties } from './data';
import { ServerError } from './errors';

////////////////////////////////////////////////////////////////////////////////

export const router: Router = Router();
console.log('[DEBUG] Properties Module:', properties); // DEBUG

router.get('/', (request: Request, response: Response) => {
    response.sendFile(path.resolve(__dirname, './views/index.html'));
});

router.get('/api', (request: Request, response: Response) => {
    response.redirect('/api/v1');
});

router.get('/api/v1', (request: Request, response: Response) => {
    response.json({ greeting: 'Hello World!' });
});

router.get('/api/v1/properties', (request: Request, response: Response) => {
    properties
        .list()
        .then((properties: Property[]) => {
            response.json({ success: true, data: properties });
        })
        .catch(() => {
            response
                .status(500)
                .json({
                    success: false,
                    error: {
                        message: 'Sorry, an unknown error occured',
                        status: 500
                    }
                });
        });
});

router.get('/api/v1/properties/:id', (request: Request, response: Response) => {
    if (!request.params.id) {
        response
            .status(400)
            .json({
                success: false,
                error: {
                    message: 'Request parameters could not be parsed',
                    status: 400,
                }
            });
    } else {
        properties
            .single(request.params.id)
            .then((property) => {
                response.json({ succes: true, data: property });
            })
            .catch((error) => {
                response.status(500).json({
                    success: false,
                    error: {
                        message: 'Oops, something went wrong',
                        status: 500,
                    }
                });
            });
    }
});

////////////////////////////////////////////////////////////////////////////////

export default router;
