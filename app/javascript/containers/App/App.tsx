import React from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import NotFound from "../NotFound/NotFound";
import Home from "../Home/Home";
import Result from "../Result/Result";
import "./App.css"

export default function App() {
    return (
        <div className='root-container'>
            <Switch>
                <Route exact path="/result" component={Result} />
                <Route exact path="/" component={Home} />
                <Route component={NotFound} />
            </Switch>
        </div>
    )
}