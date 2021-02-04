import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import API from '../../../api/api';


export default class ClientePessoaFisicaEditar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            identificador: '',
            nome: '',
            cpf: '',
            dataCadastro: '',
            instituicaoFinanceira: '',
            contatos: []
        };
    }

    componentDidMount() {
        const {
            match: { params: { id } }
        } = this.props;
        
        API.get(`clientesPessoaFisica/${id}`)
            .then(res => {
                this.setState({ 
                    identificador: res.data.identificador,
                    nome: res.data.nome,
                    cpf: res.data.cpf,
                    dataCadastro: res.data.dataCadastro,
                    contatos: res.data.contatos,
                    instituicaoFinanceira: res.data.instituicaoFinanceira
                });
            });
    }

    onSubmit = () => {
        console.log(this.state)
        API.put(`clientesPessoaFisica/${this.state.identificador}`, this.state)
            .then(() => {
                const { history } = this.props;
                history.push("/clientesPessoaFisica");
            })
            .catch(err => {
                console.log(err);
            });
    }

    onChange = e => {
        this.setState({ ...this.state, [e.target.name]: e.target.value})
    }

  render() {
      
    const { nome, cpf } = this.state;
    return (
        <Container>
            <h3 style={{ marginTop: 100 }}>Editar Cliente (Pessoa Física)</h3>
            <form autoComplete="off">
                <div>
                    <TextField
                        required
                        label="Nome"
                        variant="outlined"
                        margin="dense"
                        name="nome"
                        value={nome}
                        onChange={this.onChange}
                    />
                </div>
                <div>
                    <TextField
                        required
                        label="CPF"
                        name="cpf"
                        value={cpf}
                        variant="outlined"
                        margin="dense"
                        onChange={this.onChange}
                    />
                </div>
                <Button variant="contained" onClick={this.onSubmit} color="primary">Editar</Button>
            </form>
        </Container>
    );
  }
  
}
