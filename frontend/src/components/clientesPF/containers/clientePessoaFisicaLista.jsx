import React from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Grid from '@material-ui/core/Grid';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import styles from '../../../index.css';
import API from '../../../api/api';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const columns = [
  { id: 'nome', label: 'Nome', minWidth: 170 },
  { id: 'cpf', label: 'CPF', minWidth: 100 },
  { id: 'dataCadastro', label: 'Data de cadastro', minWidth: 100 },
  { id: 'contatos', label: 'Contatos', minWidth: 100 },
  { id: 'instituicaoFinanceira', label: 'Instituição financeira', minWidth: 100 }
];

export default class ClientePessoaFisicaLista extends React.Component {

    state = {
        page: 0,
        rowsPerPage: 10,
        data: []
    };

    componentDidMount() {
        API.get("clientesPessoaFisica")
            .then(res => {
                this.setState({ data: res.data });
            })
            .catch(err => {
                console.log(err);
            })
    }

    criarNovoClientePF = () => {
        const { history, match: { url } } = this.props;
        history.push(`${url}/criar`);
    }

    getInstituicao = (value) => {
        return (
            <RadioGroup defaultValue={value} onChange={this.onChange} name="instituicaoFinanceira">
                <FormControlLabel name="instituicaoFinanceira" value="Banco 1" control={<Radio color="primary" />} label="Banco 1" />
                <FormControlLabel name="instituicaoFinanceira" value="Banco 2" control={<Radio color="primary" />} label="Banco 2" />
                <FormControlLabel name="instituicaoFinanceira" value="Banco 3" control={<Radio color="primary" />} label="Banco 3" />
            </RadioGroup>
        );
    }

    render() {
        const handleChangePage = (event, newPage) => {
            this.setState(() => ({ page: newPage}))
        };
        
        const handleChangeRowsPerPage = (event) => {
            this.setState(() => ({ page: 0, rowPerPage: event.target.value}))
        };

        
        const { page, rowsPerPage, data } = this.state;
        
        return (
            <Paper className={styles.marginTop}>
                <div className={styles.tableTitle}>
                    <Grid container justify="space-between">  
                        <h2>Lista de Clientes (Pessoa Física)</h2>
                        <h2><Button variant="contained" onClick={this.criarNovoClientePF} color="secondary">Novo <AddCircleOutlineIcon /></Button></h2>
                    </Grid>
                </div>
            <TableContainer className={styles.container}>
                <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                    {columns.map((column) => (
                        <TableCell
                            key={column.id}
                            align={column.align}
                            style={{ minWidth: column.minWidth }}
                        >
                            {column.label}
                        </TableCell>
                    ))}
                    <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={row.nome}>
                        {columns.map((column) => {
                            const value = row[column.id];
                            return (
                            <TableCell key={column.id} align={column.align}>
                                {column.label === 'Instituição financeira' ? this.getInstituicao(value) : value}
                            </TableCell>
                            );
                        })}
                        <TableCell>
                            EDITAR
                        </TableCell>
                        </TableRow>
                    );
                    })}
                </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
                labelRowsPerPage="Items por página"
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
            </Paper>
        );
  }
  
}