import {Router} from "express";


export function TodoAPI() {
    const router = new Router();

    const TODO_ITEMS = [
        {
            id: 1,
            title: "Vaske opp",
            description: "Du må vaske opp leiligheten"
        },
        {
            id: 2,
            title: "Handle",
            description: "Du må på butikken"
        }
    ];

    router.get("/", (req, res) => {
        res.json(TODO_ITEMS);
    });

    router.post("/", (req, res) => {
        res.sendStatus(500);
    });

    return router;
}


