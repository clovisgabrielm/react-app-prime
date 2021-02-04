import React from 'react';
// import Paper from '@material-ui/core/Paper';
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import Grid from '@material-ui/core/Grid';
// import TableCell from '@material-ui/core/TableCell';
// import TableContainer from '@material-ui/core/TableContainer';
// import TableHead from '@material-ui/core/TableHead';
// import TablePagination from '@material-ui/core/TablePagination';
// import TableRow from '@material-ui/core/TableRow';
// import Button from '@material-ui/core/Button';
// import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
// import styles from '../../../index.css';


export default class ClientePessoaFisicaCriar extends React.Component {

    state = {
        page: 0,
        rowsPerPage: 10
    };

    componentDidMount() {
        console.log("ss")
    }

    criarNovoClientePF = () => {
        const { history, match: { url } } = this.props;
        history.push(`${url}/criar`);
    }

    render() {
        return (
            <h2>HELLO</h2>
        );
    }
  
}