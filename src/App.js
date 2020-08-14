import React from 'react';    
import './App.css';
import Layout from './components/UI/Layout/Layout';
import {Route, Switch} from 'react-router-dom';
import Home from './containers/Home/Home';
import About from './containers/About/About'
import Clients from './containers/Clients/Clients';
import Genius from './components/Genius/Genius'
import WhoWeAre from './containers/WhoWeAre/WhoWeAre';

function App() {

  return(
    <>
      <Layout>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/about' component={About} />
          <Route path='/clients' component={Clients} />
          <Route path='/genius' component={Genius} />
          <Route path='/who-we-are' component={WhoWeAre} />
        </Switch>
      </Layout>
    </>
  );



  // return (
  //   <>
  //     <Layout>
  //       <Switch>
  //         <Route path='/' exact component={Home} />
  //       </Switch>
  //       <Score/>
  //       <Board/>
  //     </Layout>
  //   </>
  // );
}

export default App;
