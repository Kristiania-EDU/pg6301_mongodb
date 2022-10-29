import React, {useEffect, useState} from "react";
import ReactDOM from 'react-dom';
import {createRoot} from "react-dom/client";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import './index.css';

const root = createRoot(document.getElementById("app"));

function useLoading(loadingFunction) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const [data, setData] = useState();

    async function load() {
        try{
            setLoading(true);
            setData(await loadingFunction());
        } catch(error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
       load();
    }, [setLoading, setError, setData]);

    return {
        loading, error, data
    }
}

async function fetchJSON(url) {
    const res = await fetch(url);

    if(!res.ok) {
        throw new Error(`Failed to load ${res.status}: ${res.statusText}`);
    }

    console.log('Res: ', res);

    const json = await res.json();

    return json;
}

function FrontPage() {
    return (
        <div>
            <h1>Welcome to helpers land!</h1>


        </div>
    );
}

function Spinner() {
    return (
    <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>);
}

function ErrorLoadingDataPage() {
    return (
        <div>
            <h1>Wooopsy!</h1>
            <h2>There was something wrong in the machinery</h2>
        </div>
    );
}

function TodoPage() {
    const {loading, error, data} = useLoading(
        () => fetchJSON("api/todo")
    );

    console.log('Data: ', data);

    if(loading) {
        return ( <Spinner/> );
    }

    if(error) {
        return (
          <ErrorLoadingDataPage/>
        );
    }

    function ItemsTemplate() {
        if(data != null && data.length > 0) {
            return (
                <div className={"items"}>
                    {data.map(x => (
                        <div className={"item"} key={x.id}>
                            <h3>{x.title}</h3>
                            <p>{x.description}</p>
                        </div>
                    ))}
                </div>
            );
        } else {
           return <h2>Empty...</h2>;
        }
    }

    return (
        <div className={"todo-list"}>
            <h1>Todo List</h1>
            {ItemsTemplate()}
        </div>
    );
}

function CompletedTasksPage() {
    return (
        <div>
            <h1>Your completed tasks</h1>
        </div>
    );
}

function Application() {
    return (
        <div className={"content"}>
            <BrowserRouter>
                <header>
                    <h1>ToDo-Do-Do</h1>

                    <nav>
                        <ul>
                            <li><Link to={"/tasks"}>Tasks</Link></li>
                            <li><Link to={"/completed-tasks"}>Completed tasks</Link></li>
                        </ul>
                    </nav>
                </header>

                <main>
                    <Routes>
                        <Route path={"/"} element={<TodoPage/>}></Route>
                        <Route path={"/tasks"} element={<TodoPage/>}></Route>
                        <Route path={"/completed-tasks"} element={<CompletedTasksPage/>}></Route>
                    </Routes>
                </main>
            </BrowserRouter>
        </div>
    );
}

root.render(
    <Application></Application>
);