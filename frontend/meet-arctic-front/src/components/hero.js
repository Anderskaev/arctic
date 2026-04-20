import { Link } from 'react-router';

export default function Hero() {
    return (
        <div className="hero">
            <div className="hero-tag">66°33′44″ N — Polar circle</div>
            <h1>Meet the Arctic</h1>
            <p>Explore the Arctic - place where people live despite the harsh natural conditions.</p>
            <Link to="/cardlist"  style={{ textDecoration: 'none' }}>
            <button className="btn btn-ghost">
                View settlements
            </button>
            </Link>
        </div>
    );
}