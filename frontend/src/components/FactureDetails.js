import { useFacturesContext } from "../hooks/useFacturesContext"

//date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { format, parseISO } from 'date-fns';

const FactureDetails = ({ facture }) => {

  const { dispatch } = useFacturesContext()
  const handleClick = async()=>{
    const response = await fetch('/api/factures/'+facture._id,{
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
        <h4>N° Compte : {facture.nocompte}</h4>
        <p><strong>Email: </strong>{facture.email}</p>
        <p><strong>Montant (DH): </strong>{facture.montant}</p>
        <p><strong>Date: </strong>{formattedDate}</p>
        <p>Added {formatDistanceToNow(new Date(facture.createdAt),{addSuffix: true})}</p>
        <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
      </div>
    )
  }
  
  export default FactureDetails