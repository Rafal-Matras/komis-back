import {FieldPacket} from "mysql2";
import {v4 as uuid} from 'uuid';

import {Branch} from '../types'
import {ValidationError} from "../utils/errors";
import {pool} from "../utils/db";

type BranchResults = [Branch[], FieldPacket[]];

export class BranchRecord implements Branch {
    id?: string;
    branchName: string;
    city: string;
    postCode: string;
    address: string;

    constructor(obj: Branch) {

        if (!obj.branchName || obj.branchName.length > 20) {
            throw new ValidationError('nazwa filli nie może być pusta ani przekraczać 6 znaków.')
        }

        if (!obj.city || obj.city.length > 20) {
            throw new ValidationError('miasto nie może być puste ani przekraczać 20 znaków.')
        }

        if (!obj.postCode || obj.postCode.length > 6) {
            throw new ValidationError('kod pocztowy nie może być pusty ani przekraczać 6 znaków.')
        }

        if (!obj.address || obj.address.length > 60) {
            throw new ValidationError('adres nie może być pusty ani przekraczać 60 znaków.')
        }

        this.id = obj.id;
        this.branchName = obj.branchName;
        this.city = obj.city;
        this.postCode = obj.postCode;
        this.address = obj.address;

    }

    static async findAllBranches() {
        const [results] = await pool.execute("SELECT * FROM `branch` WHERE `branchName` != :branchName ORDER BY" +
            " `branchName` ", {
            branchName: 'all',
        })
        return results
    }

    static async findOneBranch(id: string): Promise<Branch | null> {
        const [results] = await pool.execute("SELECT * FROM `branch` WHERE `id` = :id", {
            id,
        }) as BranchResults;
        return results.length < 1 ? null : new BranchRecord(results[0]);
    }

    async insertBranch(): Promise<void> {
        if (!this.id) {
            this.id = uuid()
        } else {
            throw new Error('nie można zmienić istniejące pole')
        }
        await pool.execute("INSERT INTO `branch` (`id`,`branchName`,`city`,`postCode`,`address`) VALUES" +
            " (:id,:branchName,:city,:postCode,:address) ", this)
    }

    async editBranch(): Promise<void> {
        await pool.execute("UPDATE `branch` SET `branchName` = :branchName, `city` = :city, `postCode` = :postCode," +
            " `address` = :address WHERE `id` = :id", {
            id: this.id,
            branchName: this.branchName,
            city: this.city,
            postCode: this.postCode,
            address: this.address,
        })
    }

    async deleteBranch(): Promise<void> {
        await pool.execute("DELETE FROM `branch` WHERE `id` = :id", {
            id: this.id,
        })
    }

}