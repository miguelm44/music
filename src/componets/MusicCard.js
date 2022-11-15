import PropTypes from 'prop-types';
import React from 'react';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Mensagem from './Mensagem';

class MusicCard extends React.Component {
  state = {
    loading: false,
    checkPreenchido: false,
  };

  async componentDidMount() {
    const { trackId } = this.props;
    const favorites = await getFavoriteSongs();
    const check = favorites.map((favorite) => favorite.trackId);
    if (check.includes(trackId)) {
      this.setState({
        checkPreenchido: true,
      });
    }
  }

  check = () => {
    const { musicas } = this.props;
    this.setState((estadoAnterior) => ({
      checkPreenchido: !estadoAnterior.checkPreenchido,
    }), async () => {
      this.setState({
        loading: true,
      });
      await addSong(musicas);
      this.setState({
        loading: false,
      });
    });
  };

  render() {
    const { nome, previewUrl, trackId } = this.props;
    const { loading, checkPreenchido } = this.state;

    return (

      <div>
        {
          loading
            ? <Mensagem />
            : (
              <>
                <h4>{nome}</h4>
                <audio data-testid="audio-component" src={ previewUrl } controls>
                  <track kind="captions" />
                  O seu navegador não suporta o elemento
                  {' '}
                  <code>audio</code>
                  .
                </audio>
                <label htmlFor="check">
                  Favorita
                  <input
                    type="checkbox"
                    id="check"
                    data-testid={ `checkbox-music-${trackId}` }
                    checked={ checkPreenchido }
                    onChange={ ({ target }) => this.check(target) }
                  />
                </label>
              </>
            )
        }
      </div>
    );
  }
}

MusicCard.propTypes = {
  nome: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  musicas: PropTypes.shape.isRequired,
};
export default MusicCard;
