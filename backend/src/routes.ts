import { Router } from 'express';
import InstitutionsController from './controllers/institutionsController';

const routes = Router();

routes.post('/institution', InstitutionsController.create);

export default routes;