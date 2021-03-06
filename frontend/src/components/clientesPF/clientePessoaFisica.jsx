import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {
  ClientePessoaFisicaLista,
  ClientePessoaFisicaCriar,
  ClientePessoaFisicaEditar
} from './containers';

export default class ClientePessoaFisica extends React.Component {
 
  render() {
    const { match: { path } } = this.props;
    return (
        <BrowserRouter>
            <Switch>
                <Route
                    path={`${path}/criar`}
                    exact
                    component={ClientePessoaFisicaCriar}
                />
                <Route
                    path={`${path}/editar/:id`}
                    exact
                    component={ClientePessoaFisicaEditar}
                />
                <Route
                    path={`${path}`}
                    exact
                    component={ClientePessoaFisicaLista}
                />
            </Switch>
        </BrowserRouter>
        
    );
  }
}