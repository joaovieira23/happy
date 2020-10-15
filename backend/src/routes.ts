import { Router } from 'express';
import InstitutionsController from './controllers/institutionsController';

const routes = Router();

routes.get('/institution', InstitutionsController.index);
routes.post('/institution', InstitutionsController.create);

export default routes;