import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ userId, logout }: { userId: string | null, logout: () => void }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    localStorage.removeItem('userId');
    localStorage.removeItem('user');
    navigate('/logowanie');

  };

  return (
    <>
      <nav className="navbar">
        <div>
          <h1 id="logo">Platforma dla NGO</h1>
        </div>
        <ul className="navbar-links">
          <li><Link to="/">Blog Akcji</Link></li>
          <li><Link to="/kalendarz">Kalendarz akcji</Link></li>
          {userId ? (
            <>
              <li><Link to="/konto">Twoje konto</Link></li>
              <li><a onClick={handleLogout} style={{ cursor: 'pointer' }}>Wyloguj</a></li>
            </>
          ) : (
            <li><Link to="/logowanie">Zaloguj się</Link></li>
          )}
        </ul>
      </nav>
      <hr />
    </>
  );
};

export default Navbar;