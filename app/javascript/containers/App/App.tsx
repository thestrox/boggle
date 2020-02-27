import React from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import NotFound from "../NotFound/NotFound";
import Home from "../Home/Home";
import Result from "../Result/Result";

export default function App() {
    return (
        <>
            <Switch>
                <Route exact path="/result" component={Result} />
                <Route exact path="/" component={Home} />
                <Route component={NotFound} />
            </Switch>
        </>
    )
}