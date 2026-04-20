import { NavLink } from 'react-router'


export default function Navbar() {
  return (
    <>
    <div className='nav'>
       <div className="nav-logo">
        <div className="nav-logo-icon">
          <svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>
        </div>
        Meet the Arctic
      </div> 
    </div>
      <div className='tabs'>
        <NavLink 
          to="/" 
          className={({ isActive }) => isActive ? 'tab active' : 'tab'}
          style={{ textDecoration: 'none' }}>
        <div>Главная</div>
        </NavLink >
        <NavLink  
          to="/cardlist" 
          className={({ isActive }) => isActive ? 'tab active' : 'tab'}
          style={{ textDecoration: 'none' }}>
          <div>Список городов</div>
        </NavLink >
      </div>
      </>    
  )
}