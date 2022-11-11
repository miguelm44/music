import React from 'react';
import Header from '../componets/Header';

class Search extends React.Component {
  state = {
    habilitar: true,
    nomeArtista: '',
  };

  nome = ({ name, value }) => {
    this.setState({
      [name]: value,
    }, () => {
      this.habilitarBtn();
    });
  };

  habilitarBtn = () => {
    const { nomeArtista } = this.state;
    if (nomeArtista.length >= 2) {
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
    const { habilitar, nomeArtista } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            type="text"
            data-testid="search-artist-input"
            onChange={ ({ target }) => this.nome(target) }
            name="nomeArtista"
            value={ nomeArtista }
          />
          <button
            data-testid="search-artist-button"
            type="button"
            name="button"
            disabled={ habilitar }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
