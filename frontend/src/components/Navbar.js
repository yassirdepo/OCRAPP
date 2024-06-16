import { Link } from "react-router-dom"

const Navbar = () => {
    return (
        <header>
            <div className="container">
                <Link to="/upload">
                    <h1>Factures App</h1>
                </Link>
                <nav>
                    <div>
                        <h3>
                            <Link to="/">Tout les Factures</Link>
                            <Link to="/upload">Upload Facture</Link>
                        </h3>
                    </div>
                </nav>
            </div>
        </header>
    )
}

export default Navbar