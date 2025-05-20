import express, { Express } from 'express';
import { getHomePage, postCreateUser, putUpdateUser, getUserById, deleteUser } from '../controllers/user.controller';

const router = express.Router();

const webRoutes = (app: Express) => {
    router.get('/users', getHomePage)
    router.get('/users/:id', getUserById)
    router.post('/users', postCreateUser);
    router.put('/users/:id', putUpdateUser);
    router.delete('/users/:id', deleteUser)
    app.use('/', router);
};

export default webRoutes;

