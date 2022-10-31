import {Router} from "express";


export function TodoAPI(mongoDatabase) {
    const router = new Router();

    router.get("/", async (req, res) => {
        const todoItems = await mongoDatabase.collection('todo')
            .find()
            .toArray();

        res.json(todoItems);
    });

    router.post("/", async (req, res) => {

        res.sendStatus(500);
    });

    return router;
}


