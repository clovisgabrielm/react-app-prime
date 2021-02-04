import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    backgroundAppBar: {
      backgroundColor: "#1976d2"
    },
    links: {
      marginRight: "20px",
      color: "#FFFFFF"
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
}));
  
export default function DenseAppBar() {
  const classes = useStyles();
  
  return (
    <div className={classes.root}>
      <AppBar className={classes.backgroundAppBar} position="fixed">
        <Toolbar variant="dense">
          <Grid container justify="space-between">  
            <Typography variant="h6" align="left" color="inherit">
              Teste Seletivo - Prime Control
            </Typography>
            <Typography align="right">
              <Link to="/clientesPessoaFisica" className={classes.links}>
                Clientes PF 
              </Link>
              <Link to="/clientesPessoaJuridica" className={classes.links}>
                Clientes PJ
              </Link>
            </Typography>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}


