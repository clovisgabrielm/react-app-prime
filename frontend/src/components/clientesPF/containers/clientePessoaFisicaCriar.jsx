import React from 'react';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import API from '../../../api/api';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import InputMask from 'react-input-mask';
import Divider from '@material-ui/core/Divider';


export default class ClientePessoaFisicaCriar extends React.Component {

    constructor() {
        super();

        const today = new Date(),
        date = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
    
        this.state = {
            nome: '',
            cpf: '',
            dataCadastro: date,
            instituicaoFinanceira: 'Banco A',
            contatos: [{
                telefone: ''
            }]
        }
    }

    onSubmit = () => {
        API.post("clientesPessoaFisica", this.state)
        .then(() => {
            const { history } = this.props;
            history.push("/clientesPessoaFisica");
        })
        .catch(err => {
            console.log(err);
        })
    }

    onChange = e => {
        this.setState({[e.target.name]: e.target.value});
    }

    onChangeTelefone = (e, index) => {
        let contatos = [...this.state.contatos];
        let contato = {...contatos[index]};
        contato.telefone = e.target.value;
        contatos[index] = contato;
        this.setState({contatos});
    }

    novoContato = () => {
        this.setState({ ...this.state, contatos: [ ...this.state.contatos, { telefone: '' }] });
    }
    
    voltar = () => {
        const { history } = this.props;
        history.push("/clientesPessoaFisica");
    }

    
  render() {
    
    const { contatos } = this.state;

    return (
        <Container>
            <h2 style={{ marginTop: 100 }}>Cadastrar Cliente (Pessoa Física)</h2>
            <Divider style={{ marginBottom: 20 }} />
            <form noValidate autoComplete="off">
                <div>
                    <TextField
                        required
                        label="Nome"
                        variant="outlined"
                        margin="dense"
                        style={{ width: 350 }}
                        name="nome"
                        onChange={this.onChange}
                    />
                </div>
                <div>
                    <InputMask
                        mask="999.999.999-99"
                        maskChar=" "
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
                <div>
                    <FormLabel style={{ marginTop: 20 }} component="legend">Instituição financeira</FormLabel>
                    <RadioGroup defaultValue="Banco 1" onChange={this.onChange} name="instituicaoFinanceira">
                        <FormControlLabel name="instituicaoFinanceira" value="Banco A" control={<Radio color="primary" />} label="Banco A" />
                        <FormControlLabel name="instituicaoFinanceira" value="Banco B" control={<Radio color="primary" />} label="Banco B" />
                        <FormControlLabel name="instituicaoFinanceira" value="Banco C" control={<Radio color="primary" />} label="Banco C" />
                    </RadioGroup>
                </div>
                <Button variant="contained" onClick={this.onSubmit} style={{ marginTop: 20}} color="primary">Salvar</Button>
                <Button variant="contained" onClick={this.voltar} style={{ marginTop: 20, marginLeft: 5 }} color="inherit">Voltar</Button>

            </form>
        </Container>
    );
  }
  
}
