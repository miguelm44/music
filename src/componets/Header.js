import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Mensagem
  from './Mensagem';

class Header extends React.Component {
  state = {
    name: '',
    loading: true,
  };

  async componentDidMount() {
    const nameResult = await getUser();
    console.log(nameResult);
    this.setState({
      name: nameResult.name,
      loading: false,
    });
  }

  render() {
    const { loading, name } = this.state;
    return (
      <header data-testid="header-component">
        {loading && <Mensagem /> }
        <p data-testid="header-user-name">{name}</p>
        <Link to="/search" data-testid="link-to-search">Pesquisar</Link>
        <Link to="/favorites" data-testid="link-to-favorites">Músicas favoritas</Link>
        <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
      </header>
    );
  }
}
export default Header;
