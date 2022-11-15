import React from 'react';
import Header from '../componets/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Mensagem from '../componets/Mensagem';
import MusicCard from '../componets/MusicCard';

class Favorites extends React.Component {
  state = {
    retornoApi: [],
    loading: false,
  };

  componentDidMount() {
    this.api();
  }

  api = async () => {
    this.setState({
      loading: true,
    });
    const result = await getFavoriteSongs();
    this.setState({
      retornoApi: result,
      loading: false,
    });
  };

  render() {
    const { retornoApi, loading } = this.state;
    return (
      <div data-testid="page-favorites">
        {
          loading
            ? <Mensagem />
            : (
              <>
                <h2>Músicas Favoritas</h2>
                {retornoApi.map((elemento) => (

                  <MusicCard
                    key={ elemento.trackName }
                    nome={ elemento.trackName }
                    previewUrl={ elemento.previewUrl }
                    trackId={ elemento.trackId }
                    musicas={ elemento }
                  />
                ))}
              </>
            )
        }
        <Header />
      </div>
    );
  }
}
export default Favorites;
