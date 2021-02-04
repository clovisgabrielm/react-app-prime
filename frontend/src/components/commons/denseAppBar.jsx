import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import Typography from '@material-ui/core/Typography';

export default class DenseAppBar extends React.Component {

  listarClientesPF = () => {
     window.open("/clientesPessoaFisica", "_self")
  }
  
  listarClientesPJ = () => {
    window.open("/clientesPessoaJuridica", "_self")
  }
  
  render() {
    return (
      <div style={{ flexGrow: 1 }}>
        <AppBar style={{ backgroundColor: "#1976d2" }} position="fixed">
          <Toolbar variant="dense">
            <Grid container justify="space-between">  
              <Typography variant="h6" align="left" color="inherit">
                Teste Seletivo - Prime Control
              </Typography>
              <Typography align="right">
                <Button color="inherit" onClick={this.listarClientesPF}>Clientes PF</Button>
                <Button color="inherit" onClick={this.listarClientesPJ}>Clientes PJ</Button>
              </Typography>
            </Grid>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
  
}


