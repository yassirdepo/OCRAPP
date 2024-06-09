import { Link } from "react-router-dom"

const Navbar = () => {
    return (
        <header>
            <div className="container">
                <Link to="/">
                    <h1>Factures App</h1>
                </Link>
                <nav>
                    <div>
                        <h3>
                            <Link to="/">Upload Facture</Link>
                            <Link to="/Factures">Tout les Factures</Link>
                        </h3>
                    </div>
                </nav>
            </div>
        </header>
    )
}

export default Navbar