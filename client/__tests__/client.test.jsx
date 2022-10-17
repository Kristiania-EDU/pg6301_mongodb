import {createRoot} from "react-dom/client";
import {FrontPage} from "../components/frontpage.js";
import * as React from 'react';
import {act} from "react-dom/test-utils";

describe('Client test suite', () => {
    it('Front page gets rendered', () => {
        const element = document.createElement('div');
        const root = createRoot(element);

        act(() => {
            root.render(<FrontPage></FrontPage>);
        });

        expect(element.innerText).toMatchSnapshot();
        expect(element.querySelector("h1").innerHTML).toEqual('Welcome');
    });
});