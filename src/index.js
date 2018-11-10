import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter,Switch,Route} from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import reducers from './reducers';
import User from './components/User';
import AddUser from './components/AddUser';
import EditUser from './components/EditUser';

const store = createStore(reducers);

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
         <Switch>
           <Route path='/' component={User} exact/> 
           <Route path='/add-user' component={AddUser}/> 
           <Route path='/edit-user/:id' component={EditUser}/>     
        </Switch>
        </Provider>
    </BrowserRouter>
 
, document.getElementById('root'));
 