import express from 'express';
import { customerController } from './customerController.js';
import { userController } from './controller.js';
import { roleController } from './roleController.js';

const route = express.Router();

route.get('/users', userController.getAll);
route.get('/users/:id', userController.getUserById);
route.post('/add', userController.createUser);
route.put('/update/:id', userController.updateUser);
route.delete('/delete/:id', userController.deleteUser);
route.get('/customers',customerController.getCustomers);
route.get('/customers/:name',customerController.getCustomerIdByName);
route.get('/roles',roleController.getRoles);
route.get('/roles/:name',roleController.getRoleKeyByName);
export default route;