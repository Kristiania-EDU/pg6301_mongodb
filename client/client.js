import {createRoot} from "react-dom/client";
import * as React from 'react';
import {BrowserRouter, HashRouter, Route, Routes} from "react-router-dom";
import {FrontPage} from "./components/frontpage.js";
import {Login} from "./components/loginpage.jsx";

const element = document.getElementById('app');
const app = createRoot(element);

function Application() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<FrontPage></FrontPage>}></Route>
                <Route path={"/login"} element={<Login></Login>}></Route>
            </Routes>
        </BrowserRouter>
    );
}

app.render(<Application></Application>)