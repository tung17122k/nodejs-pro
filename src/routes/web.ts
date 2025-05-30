import express, { Express } from 'express';
import { getHomePage, postCreateUser, putUpdateUser, getUserById, deleteUser, postCreateFile } from '../controllers/user.controller';
import fileUploadMiddleware from '../middleware/multer';
import { postCreateProduct, putUpdateProduct } from '../controllers/product.controller';



const router = express.Router();

const webRoutes = (app: Express) => {
    router.get('/users', getHomePage)
    router.get('/users/:id', getUserById)
    router.post('/users', fileUploadMiddleware('avatar'), postCreateUser);
    router.put('/users/:id', fileUploadMiddleware('avatar'), putUpdateUser);
    router.delete('/users/:id', deleteUser)
    router.post('/upload', fileUploadMiddleware('avatar'), postCreateFile);


    router.post('/product', fileUploadMiddleware('image', 'images/product'), postCreateProduct);

    router.put('/users/:id', fileUploadMiddleware('image', 'images/product'), putUpdateProduct);

    app.use('/', router);
};

export default webRoutes;

