import {Router} from "express";

const TODO_COLLECTION = 'todo';

export function TodoAPI(mongoDatabase) {
    const router = new Router();

    router.get("/", async (req, res) => {
        const todoItems = await mongoDatabase.collection(TODO_COLLECTION)
            .find()
            .toArray();

        res.json(todoItems);
    });

    router.post("/", async (req, res) => {
        const {title, description } = req.body;

        const result = mongoDatabase.collection(TODO_COLLECTION).insertOne({
            title,
            description
        });

        res.sendStatus(200);
    });

    return router;
}


