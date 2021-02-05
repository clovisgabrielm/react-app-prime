import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import API from '../../../api/api';
import InputMask from 'react-input-mask';
import Divider from '@material-ui/core/Divider';

export default class ClientePessoaJuridicaEditar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            identificador: '',
            nomeFantasia: '',
            cnpj: '',
            uf: '',
            instituicaoFinanceira: ''
        };
    }

    componentDidMount() {
        const {
            match: { params: { id } }
        } = this.props;
        
        API.get(`clientesPessoaJuridica/${id}`)
            .then(res => {
                this.setState({ 
                    identificador: res.data.identificador,
                    nomeFantasia: res.data.nomeFantasia,
                    cnpj: res.data.cnpj,
                    uf: res.data.uf,
                    instituicaoFinanceira: res.data.instituicaoFinanceira
                });
            });
    }

    onSubmit = () => {
        API.put(`clientesPessoaJuridica/${this.state.identificador}`, this.state)
            .then(() => {
                const { history } = this.props;
                history.push("/clientesPessoaJuridica");
            })
            .catch(err => {
                console.log(err);
            });
    }

    voltar = () => {
        const { history } = this.props;
        history.push("/clientesPessoaJuridica");
    }

    onChange = e => {
        this.setState({ ...this.state, [e.target.name]: e.target.value})
    }

  render() {
      
    const { nomeFantasia, cnpj, uf } = this.state;
    return (
        <Container>
            <h2 style={{ marginTop: 100 }}>Editar Cliente (Pessoa Jurídica)</h2>
            <Divider style={{ marginBottom: 20 }} />
            <form autoComplete="off">
                <div>
                    <TextField
                        required
                        label="Nome fantasia"
                        variant="outlined"
                        margin="dense"
                        name="nomeFantasia"
                        style={{ width: 350 }}
                        value={nomeFantasia}
                        onChange={this.onChange}
                    />
                </div>
                <div>
                    <InputMask
                        mask="99.999.999/9999-99"
                        value={cnpj}
                        maskChar=" "
                        onChange={this.onChange}
                    >
                        {
                            () => 
                            <TextField
                                required
                                label="CNPJ"
                                style={{ width: 350 }}
                                name="cnpj"
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
                        style={{ width: 350 }}
                        value={uf}
                        variant="outlined"
                        margin="dense"
                        onChange={this.onChange}
                    />
                </div>
                <Button variant="contained" onClick={this.onSubmit} style={{ marginTop: 20 }} color="primary">Editar</Button>
                <Button variant="contained" onClick={this.voltar} style={{ marginTop: 20, marginLeft: 5 }} color="inherit">Voltar</Button>
            </form>
        </Container>
    );
  }
  
}
