import {Router} from 'express';
import {CompanyRecord} from '../records/company.record';


export const companyRouter = Router();

companyRouter
    .get('/', async (req, res) => {
        const company = await CompanyRecord.getCompany();
        res.json(company);
    });