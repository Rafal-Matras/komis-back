import {FieldPacket} from 'mysql2';
import {v4 as uuid} from 'uuid';

import {User} from '../types';
import {pool} from '../utils/db';
import {ValidationError} from '../utils/errors';

type UsersResults = [User[], FieldPacket[]];

export class UserRecord implements User {
    id?: string;
    name: string;
    lastName: string;
    email: string;
    login: string;
    password: string;
    branchId: string;
    role: string;

    constructor(obj: User) {

        if (!obj.name || obj.name.length > 15) {
            throw new ValidationError('imię nie może być puste ani przekraczać 15 znaków.');
        }
        if (!obj.lastName || obj.lastName.length > 22) {
            throw new ValidationError('nazwisko nie może być puste ani przekraczać 22 znaków.');
        }
        if (!obj.email || obj.email.length > 50) {
            throw new ValidationError('e-mail nie może być pusty ani przekraczać 50 znaków.');
        }
        if (!obj.login || obj.login.length > 20) {
            throw new ValidationError('login nie może być pusty ani przekraczać 20 znaków.');
        }
        if (!obj.password || obj.password.length > 60) {
            throw new ValidationError('hasło nie może być puste ani przekraczać 60 znaków.');
        }
        if (!obj.branchId || obj.branchId.length > 36) {
            throw new ValidationError('oddział nie może być pusty ani przekraczać 36 znaków.');
        }
        if (!obj.role || obj.role.length > 10) {
            throw new ValidationError('rola nie może być pusta ani przekraczać 10 znaków.');
        }

        this.id = obj.id;
        this.name = obj.name;
        this.lastName = obj.lastName;
        this.email = obj.email;
        this.login = obj.login;
        this.password = obj.password;
        this.branchId = obj.branchId;
        this.role = obj.role;
    }

    static async findAllUsers() {
        const [results] = await pool.execute('SELECT `name`,`lastName`,`email`,`login`,`branchName`,`role` FROM `users` JOIN `branch` ON `branch`.`id` = `users`.`branchId` ORDER BY `lastName`') as UsersResults;
        return results;
    }

    static async findUsersBranch(id: string) {
        const [results] = await pool.execute('SELECT `name` FROM `users` WHERE `branchId` = :id', {
            id
        }) as UsersResults;
        return results;
    }

    // static async findOneUser(id: string): Promise<User | null> {
    //     const [results] = await pool.execute('SELECT * FROM `users` WHERE `id` = :id ', {
    //         id,
    //     }) as UsersResults;
    //     return results.length < 1 ? null : new UserRecord(results[0]);
    // }

    static async findOneUserLogin(login: string): Promise<User | null> {
        const [results] = await pool.execute('SELECT * FROM `users` WHERE `login` = :login ', {
            login,
        }) as UsersResults;
        return results.length < 1 ? null : new UserRecord(results[0]);
    }

    static async findOneUserEmail(email: string): Promise<User | null> {
        const [results] = await pool.execute('SELECT * FROM `users` WHERE `email` = :email ', {
            email,
        }) as UsersResults;
        return results.length < 1 ? null : new UserRecord(results[0]);
    }

    async insertUser() {
        this.id = uuid();
        await pool.execute('INSERT INTO `users`(id,name,lastName,email,password,login,branchId,role) VALUES(:id,:name,:lastName,:email,:password,:login,:branchId,:role)', this);
        return this.id;
    }

    async editUser() {
        await pool.execute('UPDATE `users` SET `name` = :name, `lastName` = :lastName, `email` = :email, `login` = :login, `password` = :password, `branchId` = :branchId, `role` = :role WHERE `id` = :id', this);
        return this.id;
    }

    async deleteUser() {
        await pool.execute('DELETE FROM `users` WHERE `login` = :login', {
            login: this.login,
        });
        return this.id;
    }
}