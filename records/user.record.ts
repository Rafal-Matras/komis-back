import {pool} from '../utils/db';
import {Person, UserLogin} from "../types";
import {FieldPacket} from "mysql2";
import {v4 as uuid} from 'uuid';

interface BranchName {
    branchName: string;
    id: string;
}

export class UserRecord {
    id: string | undefined;
    login: string;
    password: string;
    branchId: string;
    role: string;

    constructor(obj: UserLogin) {

        this.id = obj.id;
        this.login = obj.login;
        this.password = obj.password;
        this.branchId = obj.branchId;
        this.role = obj.role;
    }

    static async findOne(login: string): Promise<UserRecord | null> {
        const [results] = await pool.execute("SELECT * FROM `users` WHERE `login` = :login ", {
            login,
        }) as [UserRecord[], FieldPacket[]];
        return results.length < 1 ? null : new UserRecord(results[0]);
    }

    static async findAllUsers() {
        const [results] = await pool.execute(
            "SELECT `name`,`lastName`,`email`,`login`,`branchName` FROM" +
            " `users`JOIN`branch` ON `branch`.`id` = `users`.`branchId` ORDER BY `lastName`")
        return results;
    }

    static async addUser(person: Person) {
        const id = uuid()
        await pool.execute("INSERT INTO `users`(id,name,lastName,email,password,login,branchId,role)" +
            " VALUES(:id,:name,:lastName,:email,:password,:login,:branchId,:role)", {
            id,
            name: person.name,
            lastName: person.lastName,
            email: person.email,
            password: person.password,
            login: person.login,
            branchId: person.branchId,
            role: person.role,
        })
        return id
    }

    static async sameLogin() {
        const [results] = await pool.execute("SELECT `login` FROM `users`");
        return results;
    }

    static async setBranchId(branchName: string) {
        const [results] = await pool.execute("SELECT `id` FROM `branch` WHERE `branchName` = :branchName", {
            branchName,
        }) as [BranchName[], FieldPacket[]];
        return results[0].id
    }

    static async findBranchName(id: string) {
        const [results] = await pool.execute("SELECT `branchName` FROM `branch` WHERE `id` = :id", {
            id,
        }) as [BranchName[], FieldPacket[]];
        return results[0].branchName;
    }

    static async setBranchName() {
        const [results] = await pool.execute("SELECT DISTINCT `branchName` FROM `branch`");
        return results;
    }

    async editUser() {

    }

    async setPassword() {
        await pool.execute("UPDATE `users` SET `password` = :password WHERE `id` = :id ", {
            id: this.id,
            password: this.password,
        });
    }

    async deleteUser() {

    }

    async setBranch() {
        const [results] = await pool.execute("SELECT `branchName` FROM `branch` WHERE `id` = :branchId ", {
            branchId: this.branchId
        }) as [BranchName[], FieldPacket[]];
        return results[0].branchName;
    }

}
