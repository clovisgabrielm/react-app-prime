import React from 'react';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import API from '../../../api/api';


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
        this.setState({[e.target.name]: e.target.value})
    }

  render() {
    return (
        <Container>
            <h3 style={{ marginTop: 100 }}>Cadastrar Cliente (Pessoa Física)</h3>
            <form noValidate autoComplete="off">
                <div>
                    <TextField
                        required
                        label="Nome"
                        variant="outlined"
                        margin="dense"
                        name="nome"
                        onChange={this.onChange}
                    />
                </div>
                <div>
                    <TextField
                        required
                        label="CPF"
                        name="cpf"
                        variant="outlined"
                        margin="dense"
                        onChange={this.onChange}
                    />
                </div>
                
                <div>
                    <FormLabel component="legend">Instituição financeira</FormLabel>
                    <RadioGroup defaultValue="Banco 1" onChange={this.onChange} name="instituicaoFinanceira">
                        <FormControlLabel name="instituicaoFinanceira" value="Banco A" control={<Radio color="primary" />} label="Banco A" />
                        <FormControlLabel name="instituicaoFinanceira" value="Banco B" control={<Radio color="primary" />} label="Banco B" />
                        <FormControlLabel name="instituicaoFinanceira" value="Banco C" control={<Radio color="primary" />} label="Banco C" />
                    </RadioGroup>
                </div>
                <Button variant="contained" onClick={this.onSubmit} color="primary">Salvar</Button>
            </form>
        </Container>
    );
  }
  
}
