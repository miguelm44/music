import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../componets/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Mensagem from '../componets/Mensagem';

class Search extends React.Component {
  state = {
    habilitar: true,
    nomeArtista: '',
    guardarNomeArtista: '',
    loading: false,
    retornoApi: [],
    nameUndefined: false,
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

  artistaExiste = (nome) => {
    if (nome.length === 0) {
      this.setState({
        nameUndefined: true,
      });
    } else {
      this.setState({
        nameUndefined: false,
      });
    }
  };

  clicar = async () => {
    const { nomeArtista } = this.state;
    this.setState({
      nomeArtista: '',
      guardarNomeArtista: nomeArtista,
    });
    this.setState({
      loading: true,
    });
    const result = await searchAlbumsAPI(nomeArtista);
    this.setState({
      loading: false,
      retornoApi: result,
    }, () => {
      this.artistaExiste(result);
    });
  };

  render() {
    const { habilitar,
      nomeArtista, loading,
      guardarNomeArtista,
      retornoApi,
      nameUndefined,
    } = this.state;
    return (
      <div data-testid="page-search" className="search">
        {loading ? <Mensagem />
          : (
            <form>
              <Header />
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
                onClick={ this.clicar }
              >
                Pesquisar
              </button>
              {
                retornoApi.length > 0
                  ? (
                    <p>{`Resultado de álbuns de:  ${guardarNomeArtista}`}</p>
                  )
                  : ''
              }
              {
                nameUndefined && <p>`Nenhum álbum foi encontrado</p>
              }
              {

                retornoApi.map((elemento) => (
                  <Link
                    style={ { textDecoration: 'none' } }
                    to={ `/album/${elemento.collectionId}` }
                    data-testid={ `link-to-album-${elemento.collectionId}` }
                    key={ elemento.collectionId }
                  >
                    <div key={ elemento.collectionId } className="bloco">
                      <img
                        src={ elemento.artworkUrl100 }
                        alt={ elemento.artistName }
                        className="atrb0"
                      />
                      <h4 className="atrb1">{`Àlbum: ${elemento.collectionName}`}</h4>
                      <p className="atrb2">{`Cantor: ${elemento.artistName}`}</p>
                      <p className="atrb3">{`Preço: R$ ${elemento.collectionPrice}`}</p>
                    </div>
                  </Link>
                ))

              }
            </form>
          )}
      </div>
    );
  }
}

export default Search;
