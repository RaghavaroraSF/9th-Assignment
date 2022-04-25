var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { pool } from './queries.js';
class controller {
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            pool.query(`SELECT users.id,firstname,middlename,lastname,email,
        phone,users.address,customer.name AS customer,roles.name AS role,users.created_on,users.modified_on FROM users 
        LEFT JOIN customer ON customerid = customer.id LEFT JOIN roles 
        ON role = roles.key ORDER BY users.id ASC`, (error, result) => {
                if (error) {
                    throw error;
                }
                else {
                    for (let element of result.rows) {
                        const date = new Date(element.created_on).toLocaleString("en-US");
                        const date1 = new Date(element.modified_on).toLocaleString("en-US");
                        element.created_on = date;
                        element.modified_on = date1;
                    }
                    res.status(200).json(result.rows);
                }
            });
        });
    }
    getUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            pool.query(`SELECT users.id,firstname,middlename,lastname,email,phone,
        users.address,customer.name AS customer,roles.name AS role,users.created_on,users.modified_on FROM users
        LEFT JOIN customer ON customerid = customer.id LEFT JOIN roles 
        ON role = roles.key WHERE users.id = $1`, [id], (error, result) => {
                if (error) {
                    res.status(404).send("You have entered wrong id");
                }
                else {
                    res.status(200).json(result.rows);
                }
            });
        });
    }
    getCustomers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            pool.query('SELECT name from customer ORDER BY id ASC', (err, result) => {
                if (err) {
                    throw err;
                }
                else {
                    res.status(200).json(result.rows);
                }
            });
        });
    }
    getCustomerIdByName(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const customerName = req.params.name;
            pool.query('SELECT id FROM customer WHERE name = $1', [customerName], (err, result) => {
                if (err) {
                    throw err;
                }
                else {
                    res.status(200).send(result.rows);
                }
            });
        });
    }
    getRoles(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            pool.query('SELECT name from roles ORDER BY key ASC', (err, result) => {
                if (err) {
                    throw err;
                }
                else {
                    res.status(200).json(result.rows);
                }
            });
        });
    }
    getRoleKeyByName(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const roleName = req.params.name;
            pool.query('SELECT key FROM roles WHERE name = $1', [roleName], (err, result) => {
                if (err) {
                    throw err;
                }
                else {
                    res.status(200).send(result.rows);
                }
            });
        });
    }
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { firstName, middleName, lastName, email, phone, role, address, customer } = req.body;
            pool.query(`INSERT INTO users(firstname,middlename,lastname,email,phone,role,
            address,customerid) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`, [firstName, middleName, lastName, email, phone, role, address, customer], (err, result) => {
                if (err) {
                    throw err;
                }
                else {
                    res.status(201).send("User added successfully");
                }
            });
        });
    }
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            const { firstName, middleName, lastName, email, phone, role, address, customer } = req.body;
            pool.query(`UPDATE users SET firstname = $1, middlename = $2, lastname = $3, email = $4,
         phone = $5, role = $6, address = $7,customerid = $8 WHERE id = $9`, [firstName, middleName, lastName, email, phone, role, address, customer, id], (err, result) => {
                if (err) {
                    res.status(400).send("Failed due to bad input");
                    throw err;
                }
                else {
                    res.status(200).send("Updated");
                }
            });
        });
    }
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            pool.query('DELETE FROM users WHERE id = $1', [id], (err, result) => {
                if (err) {
                    throw err;
                }
                else {
                    res.status(200).send("Deleted");
                }
            });
        });
    }
}
export const userController = new controller();
//# sourceMappingURL=controller.js.map