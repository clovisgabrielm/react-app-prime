import React from 'react';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import API from '../../../api/api';
import InputMask from 'react-input-mask';
import Divider from '@material-ui/core/Divider';


export default class ClientePessoaJuridicaCriar extends React.Component {

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
        API.post("clientesPessoaJuridica", this.state)
        .then(() => {
            const { history } = this.props;
            history.push("/clientesPessoaJuridica");
        })
        .catch(err => {
            console.log(err);
        })
    }

    voltar = () => {
        const { history } = this.props;
        history.push("/clientesPessoaJuridica");
    }

    onChange = e => {
        this.setState({[e.target.name]: e.target.value})
    }

  render() {
    return (
        <Container>
            <h2 style={{ marginTop: 100 }}>Cadastrar Cliente (Pessoa Jurídica)</h2>
            <Divider style={{ marginBottom: 20 }} />
            <form noValidate autoComplete="off">
                <div>
                    <TextField
                        required
                        label="Nome fantasia"
                        variant="outlined"
                        margin="dense"
                        style={{ width: 350 }}
                        name="nomeFantasia"
                        onChange={this.onChange}
                    />
                </div>
                <div>
                    <InputMask
                        mask="99.999.999/9999-99"
                        maskChar=" "
                        onChange={this.onChange}
                    >
                        {
                            () => 
                            <TextField
                                required
                                label="CNPJ"
                                name="cnpj"
                                style={{ width: 350 }}
                                variant="outlined"
                                margin="dense"
                            />
                        }
                    </InputMask>
                </div>
                <div>
                    <TextField
                        required
                        label="UF"
                        name="uf"
                        variant="outlined"
                        style={{ width: 350 }}
                        margin="dense"
                        onChange={this.onChange}
                    />
                </div>
                
                <div>
                    <FormLabel style={{ marginTop: 20 }} component="legend">Instituição financeira</FormLabel>
                    <RadioGroup defaultValue="Banco 1" onChange={this.onChange} name="instituicaoFinanceira">
                        <FormControlLabel name="instituicaoFinanceira" value="Banco A" control={<Radio color="primary" />} label="Banco A" />
                        <FormControlLabel name="instituicaoFinanceira" value="Banco B" control={<Radio color="primary" />} label="Banco B" />
                        <FormControlLabel name="instituicaoFinanceira" value="Banco C" control={<Radio color="primary" />} label="Banco C" />
                    </RadioGroup>
                </div>
                <Button variant="contained" onClick={this.onSubmit} style={{ marginTop: 20 }} color="primary">Salvar</Button>
                <Button variant="contained" onClick={this.voltar} style={{ marginTop: 20, marginLeft: 5 }} color="inherit">Voltar</Button>

            </form>
        </Container>
    );
  }
  
}
