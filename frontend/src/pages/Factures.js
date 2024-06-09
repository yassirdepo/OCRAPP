import { useEffect } from "react"
import { useFacturesContext } from "../hooks/useFacturesContext"

// components
import FactureDetails from "../components/FactureDetails"

const Factures = () => {
  const { factures, dispatch } = useFacturesContext()

  useEffect(() => {
    const fetchFactures = async () => {
      const response = await fetch('/api/Factures')
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_FACTURES', payload: json})
      }
    }
    
    fetchFactures()
  }, [dispatch])

  return (
    <div className="home">
      <div className="factures">
        <h2>Tout les Factures :</h2>
        {factures && factures.map(facture => (
          <FactureDetails facture={facture} key={facture._id} />
        ))}
      </div>
    </div>
  )
}

export default Factures