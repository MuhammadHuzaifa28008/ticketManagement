import express from 'express'
const router = express.Router();
import { createCustomer } from '../controllers/customerControllers.js';
// import { authentication } from './middlewares/auth.js';

router.post('/', createCustomer);
// router.post('/signup', signUp);
// router.get('/isUserAuth', isUserAuth);
// router.patch('/update/:id', authentication, editUser);
// router.delete('/delete/:id', authentication, deleteUser);

export default router;