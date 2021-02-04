import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {
  ClientePessoaJuridicaLista,
  ClientePessoaJuridicaCriar,
  ClientePessoaJuridicaEditar
} from './containers';

export default class ClientePessoaJuridica extends React.Component {
 
  render() {
    const { match: { path } } = this.props;
    return (
        <BrowserRouter>
            <Switch>
                <Route
                    path={`${path}/criar`}
                    exact
                    component={ClientePessoaJuridicaCriar}
                />
                <Route
                    path={`${path}/editar/:id`}
                    exact
                    component={ClientePessoaJuridicaEditar}
                />
                <Route
                    path={`${path}`}
                    exact
                    component={ClientePessoaJuridicaLista}
                />
            </Switch>
        </BrowserRouter>
        
    );
  }
}