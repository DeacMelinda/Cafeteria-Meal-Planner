import React from 'react';
import './App.css';
import Login from "./Login";
import Register from "./Register";
import { SimpleUserInterface } from './SimpleUserInterface';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Tomorrow from './TomorrowsOptionsSimple';
import Today from './TodaysOptionsSimple';
import { AuthProvider, useAuth } from './components/Auth';
import { RequireAuth } from './components/RequireAuth';
import { MainCafeterias } from "./MainCafeterias";
import { TodayCaf } from "./TodayCafeteria";
import { TomorrowCaf } from "./TomorrowCafeteria";
import { MenuItems } from './MenuItems';
import { Settings } from './Settings';
import { ViewProfile } from './ViewProfile';
import { FavoriteCafeterias } from './FavoriteCafeterias';

function App() {

  return (
    <AuthProvider>
      <Router>
      <div className="App">
        <Switch>
          <Route path="/login" component={Login}/>
          <Route path="/profile/cafeterias"><RequireAuth><SimpleUserInterface/></RequireAuth></Route>
          <Route path="/profile/today"><RequireAuth><Today/></RequireAuth></Route>
          <Route path="/profile/tomorrow"><RequireAuth><Tomorrow/></RequireAuth></Route>
          <Route path="/register" component={Register}/>
          <Route path="/cafeteria/home"><RequireAuth><MainCafeterias/></RequireAuth></Route>
          <Route path="/cafeteria/today"><RequireAuth><TodayCaf/></RequireAuth></Route>
          <Route path="/cafeteria/tomorrow"><RequireAuth><TomorrowCaf/></RequireAuth></Route>
          <Route path="/cafeteria/menuItems"><RequireAuth><MenuItems/></RequireAuth></Route>
          <Route path="/settings"><RequireAuth><Settings /></RequireAuth></Route>
          <Route path="/profile"><RequireAuth><ViewProfile /></RequireAuth></Route>
          <Route path="/favorites"><RequireAuth><FavoriteCafeterias /></RequireAuth></Route>
          <Route exact path="" component={Login}/>
          <Route exact path="/" component={Login}/>
        </Switch>
      </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
