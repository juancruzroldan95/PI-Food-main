import './App.css';
import { Route, useLocation } from 'react-router-dom';
import { Detail, Form, Home, Landing } from './views';
import Nav from './components/Nav/Nav';

function App() {
  const location = useLocation();

  return (
    <div className="App">
      {location.pathname !== '/' && <Nav />}
      <Route exact path="/" component={Landing} />
      <Route path="/home" render={() => <Home />} />
      <Route path="/detail/:id" component={Detail} />
      <Route path="/create" render={() => <Form />} /> 
    </div>
  );
};

export default App;
