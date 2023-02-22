import PropTypes from 'prop-types';
import React from 'react';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  state = {
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
    const { musicas, setIsloading, remover } = this.props;
    this.setState((estadoAnterior) => ({
      checkPreenchido: !estadoAnterior.checkPreenchido,
    }), async () => {
      const { checkPreenchido } = this.state;
      if (checkPreenchido) {
        setIsloading(true);
        await addSong(musicas);
        setIsloading(false);
      } else {
        remover(musicas);
      }
    });
  };

  render() {
    const { nome, previewUrl, trackId } = this.props;
    const { loading, checkPreenchido } = this.state;

    return (

      <div>

        <h4>{nome}</h4>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        <label htmlFor={ trackId }>
          Favorita
          <input
            type="checkbox"
            id={ trackId }
            data-testid={ `checkbox-music-${trackId}` }
            checked={ checkPreenchido }
            onChange={ ({ target }) => this.check(target) }
          />
        </label>

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
