import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Mensagem from '../componets/Mensagem';

class Login extends Component {
  constructor() {
    super();
    this.habilitar = this.habilitar.bind(this);
    this.capturarNome = this.capturarNome.bind(this);
    this.click = this.click.bind(this);
    this.state = {
      nome: '',
      habilitar: true,
      loading: false,
    };
  }

  capturarNome = ({ value, name }) => {
    this.setState({
      [name]: value,
    }, () => {
      this.habilitar();
    });
  };

  click = async () => {
    const { nome } = this.state;
    const { history } = this.props;
    this.setState({ loading: true });
    await createUser({ name: nome });
    this.setState({
      loading: false,
    });
    history.push('/search');
  };

  habilitar = () => {
    const num1 = 3;
    const { nome } = this.state;
    if (nome.length >= num1) {
      this.setState({
        habilitar: false,
      });
    } else {
      this.setState({
        habilitar: true,
      });
    }
  };

  render() {
    const { nome, habilitar, loading } = this.state;
    return (
      <div data-testid="page-login">
        {
          loading
            ? <Mensagem />
            : (
              <form>
                <br />
                <label htmlFor="name">
                  <input
                    type="text"
                    name="nome"
                    id="name"
                    data-testid="login-name-input"
                    value={ nome }
                    onChange={ ({ target }) => this.capturarNome(target) }
                  />
                </label>
                <button
                  type="button"
                  data-testid="login-submit-button"
                  id="button"
                  disabled={ habilitar }
                  onClick={ this.click }
                >
                  Entrar
                </button>
              </form>
            )
        }
      </div>

    );
  }
}

Login.propTypes = {
  history: PropTypes.shape.isRequired,
  push: PropTypes.func.isRequired,
};
export default Login;
