import { useFacturesContext } from "../hooks/useFacturesContext"

//date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { format, parseISO } from 'date-fns';

const FactureDetails = ({ facture }) => {

  const { dispatch } = useFacturesContext()
  const handleClick = async()=>{
    const response = await fetch('/api/Factures/'+facture._id,{
      method: 'DELETE'
    })
    const json = await response.json()

    if(response.ok){
      dispatch({type: 'DELETE_FACTURE', payload: json})
    }

  }

  const formattedDate = format(parseISO(facture.date), 'dd/MM/yyyy');

    return (
      <div className="facture-details">
        <h4>No Facture : {facture.nofacture}</h4>
        <p><strong>Adresse: </strong>{facture.adresse}</p>
        <p><strong>Montant (DH): </strong>{facture.montant}</p>
        <p><strong>Date: </strong>{formattedDate}</p>
        <p>{formatDistanceToNow(new Date(facture.createdAt),{addSuffix: true})}</p>
        <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
      </div>
    )
  }
  
  export default FactureDetails