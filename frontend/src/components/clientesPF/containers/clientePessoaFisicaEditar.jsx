import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import API from '../../../api/api';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import InputMask from 'react-input-mask';
import Divider from '@material-ui/core/Divider';

export default class ClientePessoaFisicaEditar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            identificador: '',
            nome: '',
            cpf: '',
            dataCadastro: '',
            instituicaoFinanceira: '',
            contatos: [{
                identificador: 0,
                clientePessoaFisicaIdentificador: 0,
                telefone: ''
            }]
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

    onChangeTelefone = (e, index) => {
        let contatos = [...this.state.contatos];
        let contato = {...contatos[index]};
        contato.clientePessoaFisicaIdentificador = this.state.identificador;
        contato.telefone = e.target.value;
        contatos[index] = contato;
        this.setState({contatos});
    }

    novoContato = () => {
        this.setState({ ...this.state, contatos: [ ...this.state.contatos, {}] });
    }

  render() {
      
    const { nome, cpf, contatos } = this.state;
    return (
        <Container>
            <h2 style={{ marginTop: 100 }}>Editar Cliente (Pessoa Física)</h2>
            <Divider style={{ marginBottom: 20 }} />
            <form autoComplete="off">
                <div>
                    <TextField
                        required
                        label="Nome"
                        variant="outlined"
                        margin="dense"
                        name="nome"
                        style={{ width: 350 }}
                        value={nome}
                        onChange={this.onChange}
                    />
                </div>
                <div>
                    <InputMask
                        mask="999.999.999-99"
                        maskChar=" "
                        value={cpf}
                        onChange={this.onChange}
                    >
                        {
                            () => 
                            <TextField
                                required
                                label="CPF"
                                name="cpf"
                                style={{ width: 350 }}
                                variant="outlined"
                                margin="dense"
                            />
                        }
                    </InputMask>
                </div>
                
                <div>
                    {
                        contatos.map((contato, index) => {
                            return (
                            <div key={index}>
                                <InputMask
                                    mask="(99) 99999-9999"
                                    maskChar=" "
                                    value={contato.telefone}
                                    onChange={(e) => this.onChangeTelefone(e, index)}
                                >
                                    {
                                        () => 
                                        <TextField
                                            required
                                            label={"Telefone " + (index + 1)}
                                            name={"telefone" + (index + 1)}
                                            style={{ width: 350 }}
                                            variant="outlined"
                                            margin="dense"
                                        />
                                    }
                                </InputMask>
                                <Button 
                                    style={{marginTop: 10}}
                                    onClick={this.novoContato}
                                >
                                    <AddCircleIcon/>
                                </Button>
                            </div>);
                        })
                    }
                </div>
                <Button variant="contained" onClick={this.onSubmit} style={{ marginTop: 20 }} color="primary">Editar</Button>
                <Button variant="contained" onClick={this.voltar} style={{ marginTop: 20, marginLeft: 5 }} color="inherit">Voltar</Button>
            </form>
        </Container>
    );
  }
  
}
