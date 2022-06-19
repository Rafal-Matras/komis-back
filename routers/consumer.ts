import {Router} from 'express';
import {ConsumerRecord} from '../records/consumer.record';

export const consumerRouter = Router();

consumerRouter
    .get('/', async (req, res) => {
        const consumers = await ConsumerRecord.findAll();
        res.json(consumers);
    })

    .post('/', async (req, res) => {
        const consumer = new ConsumerRecord(req.body);
        await consumer.insertConsumer();
        res.json(consumer);
    })

    .delete('/:id', async (req, res) => {
        const consumer = await ConsumerRecord.findOne(req.params.id);
        await consumer.removeConsumer();
        res.json(consumer.id);
    });