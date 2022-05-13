import {pool} from '../utils/db';
import {UserLogin} from "../types";
import {FieldPacket} from "mysql2";

interface BranchName {
    name: string;
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

    async setPassword() {
        await pool.execute("UPDATE `users` SET `password` = :password WHERE `id` = :id ", {
            id: this.id,
            password: this.password,
        });
    }

    async setBranch() {
        const [results] = await pool.execute("SELECT `name` FROM `branch` WHERE `id` = :branchId ", {
            branchId: this.branchId
        }) as [BranchName[], FieldPacket[]];
        return results[0]
    }

}
