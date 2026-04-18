import { Link } from 'react-router'
export default function Navbar() {
  return (
    <nav>
      <Link to="/">Главная</Link>
      <Link to="/cardlist">Список городов</Link>
      <Link to="/card">Город</Link>
    </nav>
  )
}