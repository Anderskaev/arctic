import { Link } from 'react-router'


export default function Navbar() {
  return (
    <nav>
      {/* <div class="nav-logo">
        <div class="nav-logo-icon">
          <svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>
        </div>
        Meet the Arctic
      </div> */}
      <Link to="/">Главная</Link>
      <Link to="/cardlist">Список городов</Link>
    </nav>
  )
}