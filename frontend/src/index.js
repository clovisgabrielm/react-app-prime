import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Container from '@material-ui/core/Container';
import DenseAppBar from './components/commons/DenseAppBar';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import ClientePessoaFisica from './components/clientesPF/clientePessoaFisica';

ReactDOM.render(
  <BrowserRouter>
    <DenseAppBar />
    <Container fixed>
      <Switch>
        <Route path="/clientesPessoaFisica" exact={true} component={ClientePessoaFisica} />
      </Switch>
    </Container>
  </ BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
