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
import API from '../../../api/api';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Modal from '@material-ui/core/Modal';
import _ from 'lodash';
import moment from 'moment';

const columns = [
  { id: 'nome', label: 'Nome', minWidth: 170 },
  { id: 'cpf', label: 'CPF', minWidth: 100 },
  { id: 'dataCadastro', label: 'Data de cadastro', minWidth: 100 },
  { id: 'instituicaoFinanceira', label: 'Instituição financeira', minWidth: 100 }
];


export default class ClientePessoaFisicaLista extends React.Component {
   
    state = {
        page: 0,
        rowsPerPage: 5,
        data: [],
        abrirModalDeletar: false,
        abrirModalVisualizar: false,
        clienteParaDeletar: {},
        clienteVisualizar: {}
    };

    componentDidMount() {
        // Listando todos os clientes
        API.get("clientesPessoaFisica")
            .then(res => {
                res.data.map(item => item.dataCadastro = moment(item.dataCadastro).format("DD/MM/YYYY"))
                this.setState({ data: res.data });
            })
            .catch(err => {
                console.log(err);
            });
    }

    /* Ir para a tela de cadastro de novo cliente */
    criarNovoClientePF = () => {
        const { history, match: { url } } = this.props;
        history.push(`${url}/criar`);
    }

    /* Ir para a tela de edição de cliente */
    editarClientePF = (id) => {
        const { history, match: { url } } = this.props;
        history.push(`${url}/editar/${id}`);
    }

    /* Visualizar cliente em modal */
    verClientePF = (id) => {
        API.get(`clientesPessoaFisica/${id}`)
            .then(res => {
                this.setState({ clienteVisualizar: res.data, abrirModalVisualizar: true });
            })
            .catch(err => {
                console.log(err);
            });
    }

    /* Abre modal de confirmação de exclusão de cliente */
    confirmDelete = (cliente) => {
        this.setState({ clienteParaDeletar: cliente, abrirModalDeletar: true });
    }

    /* Deleta o cliente */
    onDelete = (id) => {
        API.delete(`clientesPessoaFisica/delete/${id}`)
            .then(() => {
                this.setState({ abrirModalDeletar: false });
                window.location.reload();
            })
            .catch(err => {
                console.log(err);
            });
    }

    onRadioButtonChange = (e, cliente) => {
        cliente.instituicaoFinanceira = e.target.value;
        cliente.dataCadastro = moment(cliente.dataCadastro).format("YYYY-MM-DD");
        API.put(`clientesPessoaFisica/instituicaoFinanceira/${cliente.identificador}`, cliente)
            .then(() => {
                console.log("Instituição financeira atualizada por SP.");
            })
            .catch(err => {
                console.log(err);
            });
    }

    /* Fecha os modais */
    fechar = () => {
        this.setState({ abrirModalDeletar: false, abrirModalVisualizar: false });
    }

    /* Retorna instituições em um RadioGroup */
    obterInstituicao = (value, cliente) => {
        return (
            <RadioGroup defaultValue={value} onChange={(e) => this.onRadioButtonChange(e, cliente)} name="instituicaoFinanceira">
                <FormControlLabel name="instituicaoFinanceira" value="Banco A" control={<Radio color="primary" />} label="Banco A" />
                <FormControlLabel name="instituicaoFinanceira" value="Banco B" control={<Radio color="primary" />} label="Banco B" />
                <FormControlLabel name="instituicaoFinanceira" value="Banco C" control={<Radio color="primary" />} label="Banco C" />
            </RadioGroup>
        );
    }
    
    /* Obtém contatos do cliente a ser visualizado */
    obterContatos = (clienteVisualizar) => {
        let contatosStr = "";
        if (!_.isEmpty(clienteVisualizar)) {
            clienteVisualizar.contatos.forEach(contato => {
                contatosStr += contato.telefone + " / ";
            });
            return contatosStr;
        }
        
        return "-";
    }

    /* Trata mudança de página */
    handleChangePage = (event, newPage) => {
        this.setState(() => ({ page: newPage}))
    }
    
    /* Trata mudança de quantidade de itens por página */
    handleChangeRowsPerPage = (event) => {
        this.setState(() => ({ page: 0, rowPerPage: event.target.value}))
    }

    /* Renderização da tabela com a lista */
    render() {
        const {
            page,
            rowsPerPage, 
            data,
            abrirModalDeletar,
            abrirModalVisualizar,
            clienteParaDeletar,
            clienteVisualizar
        } = this.state;

        return (
            <Paper style={{ marginTop: 100 }}>
                <div className="tableTitle">
                    <Grid container justify="space-between">  
                        <h2 style={{ marginLeft: 30 }}>Lista de Clientes (Pessoa Física)</h2>
                        <h2 style={{ marginRight: 30 }}><Button variant="contained" onClick={this.criarNovoClientePF} color="secondary">Novo <AddCircleOutlineIcon /></Button></h2>
                    </Grid>
                </div>
                <TableContainer className="container">
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
                            <TableRow hover role="checkbox" tabIndex={-1} key={row.identificador}>
                                {columns.map((column) => {
                                    const value = row[column.id];
                                    return (
                                    <TableCell key={column.id} align={column.align}>
                                        {column.label === 'Instituição financeira' ? this.obterInstituicao(value, row) : value}
                                    </TableCell>
                                    );
                                })}
                                <TableCell>
                                    <ButtonGroup size="small" aria-label="small outlined button group">
                                        <Button variant="contained" onClick={() => this.verClientePF(row.identificador)} color="primary"><VisibilityIcon /></Button>
                                        <Button variant="contained" onClick={() => this.editarClientePF(row.identificador)} color="primary"><EditIcon /></Button>
                                        <Button 
                                            variant="contained" 
                                            onClick={() => this.confirmDelete(row)} 
                                            color="secondary"
                                        >
                                            <DeleteIcon />
                                        </Button>
                                    </ButtonGroup>
                                </TableCell>
                            </TableRow>
                        );
                        })}
                    </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 15]}
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
                    labelRowsPerPage="Items por página"
                    page={page}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
                <Modal
                    open={abrirModalDeletar}
                    onClose={this.fechar}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    <div style={{ marginLeft: 200, marginTop: 100, width: 340, backgroundColor: '#fff' }}>
                        <div style={{ paddingLeft: 15, paddingBottom: 15, marginRight: 15 }}>
                            <h2>Confirmação de exclusão</h2>
                            <p id="simple-modal-description">
                                Deseja realmente apagar o cliente {clienteParaDeletar.nome}?
                            </p>
                            <Button variant="contained" onClick={() => this.onDelete(clienteParaDeletar.identificador)} color="primary">Confirmar</Button>
                        </div>
                    </div>
                </Modal>
                <Modal
                    open={abrirModalVisualizar}
                    onClose={this.fechar}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    <div style={{ marginLeft: 200, marginTop: 100, width: 340, backgroundColor: '#fff' }}>
                        <div style={{ paddingLeft: 15, paddingBottom: 15, marginRight: 15 }}>
                            <h2>Visualizar cliente</h2>
                            <p id="simple-modal-description">
                                <strong>Nome:</strong> {clienteVisualizar.nome}
                            </p>
                            <p id="simple-modal-description">
                                <strong>CPF:</strong> {clienteVisualizar.cpf}
                            </p>
                            <p id="simple-modal-description">
                                <strong>Instituição financeira:</strong> {clienteVisualizar.instituicaoFinanceira}
                            </p>
                            <p id="simple-modal-description">
                                <strong>Data de cadastro:</strong> {moment(clienteVisualizar.dataCadastro).format("DD/MM/YYYY")}
                            </p>
                            <p id="simple-modal-description">
                                <strong>Telefone(s):</strong> {this.obterContatos(clienteVisualizar)}
                            </p>
                            <Button variant="contained" onClick={this.fechar} color="primary">Fechar</Button>
                        </div>
                    </div>
                </Modal>
            </Paper>
        );
  }
  
}