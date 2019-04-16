import React from 'react'
import ReactDOM from 'react-dom'
import './style.less'
import { AppContainer } from 'react-hot-loader';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom'

import Login from './pages/Login.jsx'
import LayoutRouter  from './router/index.jsx'

class RouterComponent  extends React.Component {
    render() {
        return ( 
            <Router>
                <Switch>
                    <Route path='/login' component={Login} />
                    <Route path='/' component={LayoutRouter } />
                </Switch>
            </Router>
        )
    }
}


if (module.hot) {
    console.log(module.hot,11)
    module.hot.accept(() => {
      ReactDom.render(
          <AppContainer>
              <RouterComponent />
          </AppContainer>,
          document.getElementById('app')
      )
    })
}

ReactDOM.render(
    <AppContainer>
        <RouterComponent /> 
    </AppContainer>,
    document.getElementById('app')
)
