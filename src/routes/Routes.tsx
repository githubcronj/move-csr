import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../pages/HomePage';

import './routes.scss';

const Routes: React.FC = () => {  
    const domain = window.location.hostname;
    let name: any = domain.split('.');

    return <div
      
    >
        <Switch>
        
            <Route exact path="/home" component={Home} />
           
        </Switch>
    </div>
}

export default Routes;
