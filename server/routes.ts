// import external dependencies
import { Request, Response, Router } from 'express';

// import system dependencies
import path from 'path';

// import internal dependencies
import controllers from './controllers';

////////////////////////////////////////////////////////////////////////////////

export const router: Router = Router();

router.get('/', (request: Request, response: Response) => {
    response.sendFile(path.resolve(__dirname, './views/index.html'));
});

router.get('/api', (request: Request, response: Response) => {
    response.redirect('/api/v1');
});

router.get('/api/v1', (request: Request, response: Response) => {
    response.json({ greeting: 'Hello World!' });
});

router.get('/api/v1/properties', controllers.properties.getCollection);
router.get('/api/v1/properties/:id', controllers.properties.getResource);
router.post('/api/v1/properties', controllers.properties.postCollection);
router.put('/api/v1/properties/:id', controllers.properties.putResource);
router.delete('/api/v1/properties/:id', controllers.properties.deleteResource);

////////////////////////////////////////////////////////////////////////////////

export default router;
