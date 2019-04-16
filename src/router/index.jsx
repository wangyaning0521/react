import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
} from 'react-router-dom';


import Home from '../pages/home.jsx'
import Layout from '../layout/index.jsx'

class LayoutRouter extends React.Component{
    render(){
        return (
            <Layout>
                <Switch>
                    <Route path='/' exact component={Home}></Route>
                </Switch>
            </Layout>
        )
    }
}
export default LayoutRouter 