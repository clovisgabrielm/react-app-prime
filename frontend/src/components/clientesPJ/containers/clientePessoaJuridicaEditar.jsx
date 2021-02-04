import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import API from '../../../api/api';


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
        console.log(this.state)
        API.put(`clientesPessoaJuridica/${this.state.identificador}`, this.state)
            .then(() => {
                const { history } = this.props;
                history.push("/clientesPessoaJuridica");
            })
            .catch(err => {
                console.log(err);
            });
    }

    onChange = e => {
        this.setState({ ...this.state, [e.target.name]: e.target.value})
    }

  render() {
      
    const { nomeFantasia, cnpj, uf } = this.state;
    return (
        <Container>
            <h3 style={{ marginTop: 100 }}>Editar Cliente (Pessoa Jurídica)</h3>
            <form autoComplete="off">
                <div>
                    <TextField
                        required
                        label="Nome fantasia"
                        variant="outlined"
                        margin="dense"
                        name="nomeFantasia"
                        value={nomeFantasia}
                        onChange={this.onChange}
                    />
                </div>
                <div>
                    <TextField
                        required
                        label="CNPJ"
                        name="cnpj"
                        value={cnpj}
                        variant="outlined"
                        margin="dense"
                        onChange={this.onChange}
                    />
                </div>
                <div>
                    <TextField
                        required
                        label="UF"
                        name="uf"
                        value={uf}
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
