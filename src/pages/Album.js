/* s */
import React from 'react';
import PropTypes from 'prop-types';
import Header from '../componets/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../componets/MusicCard';
import Mensagem from '../componets/Mensagem';

class Album extends React.Component {
  state = {
    retornoApi: [],
    retornoUnico: [],
    loading: false,
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const result = await getMusics(id);
    const resultSpret = [...result];
    const extrair = resultSpret.shift();
    /* const remove = result.splice(0, 1); */
    this.seleciona(extrair);
    this.setState({
      retornoApi: resultSpret,
    });
  }

  setIsloading = (check) => {
    this.setState({ loading: check });
  };

  seleciona = (array) => {
    const { artistName, collectionName } = array;
    this.setState({
      retornoUnico: [artistName, collectionName],
    });
  };

  render() {
    const { retornoUnico, retornoApi, loading } = this.state;
    const [artistName, collectionName] = retornoUnico;
    return (
      <div data-testid="page-album">
        {console.log(retornoApi)}
        <Header />
        <p data-testid="artist-name">{artistName}</p>
        <p data-testid="album-name">{collectionName}</p>
        {
          loading
            ? <Mensagem />
            : (
              retornoApi.map((elemento) => (
                <MusicCard
                  key={ elemento.trackName }
                  nome={ elemento.trackName }
                  previewUrl={ elemento.previewUrl }
                  trackId={ elemento.trackId }
                  musicas={ elemento }
                  setIsloading={ this.setIsloading }
                />
              )))
        }
      </div>
    );
  }
}
Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
export default Album;
