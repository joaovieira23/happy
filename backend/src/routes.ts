import { Router } from 'express';
import multer from 'multer';
import uploadConfig from './config/upload';
import InstitutionsController from './controllers/institutionsController';

const routes = Router();
const upload = multer(uploadConfig);

routes.get('/institution', InstitutionsController.index);
routes.get('/institution/:id', InstitutionsController.show);
routes.post('/institution', upload.array('images'), InstitutionsController.create);

export default routes;