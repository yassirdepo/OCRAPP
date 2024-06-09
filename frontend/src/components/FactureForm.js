import { useEffect,useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useFacturesContext } from "../hooks/useFacturesContext"
import { format,parse } from "date-fns";

const FactureForm = (props) => {
  const { dispatch } = useFacturesContext()
  const [nofacture, setnofacture] = useState('')
  const [adresse, setadresse] = useState('')
  const [montant, setmontant] = useState('')
  const [date, setdate] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const facture = {nofacture, adresse, montant, date}
    
    const response = await fetch('/api', {
      method: 'POST',
      body: JSON.stringify(facture),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setEmptyFields([])
      setError(null)
      setnofacture('')
      setadresse('')
      setmontant('')
      setdate('')
      dispatch({type: 'CREATE_FACTURE', payload: json})
      navigate("/Factures")
    }

    

  }

  // FIND MATCHES

  const text = props.text;

  useEffect(() => {

    const regexnofacture = /Numéro de facture : ([a-zA-Z0-9]+)/;
    const regexadresse = /Adresse : ([a-zA-Z]+)/;
    const regexmontant = /Montant : ([0-9]+)/;
    const regexdate = /Date : (\d{2}\/\d{2}\/\d{4})/;

    const matchnofacture = text.match(regexnofacture);
    const matchadresse = text.match(regexadresse);
    const matchmontant = text.match(regexmontant);
    const matchdate = text.match(regexdate);

    if (matchnofacture) {
        setnofacture(matchnofacture[1]);
    }

    if (matchadresse) {
        setadresse(matchadresse[1]);
    }

    if (matchmontant) {
        setmontant(matchmontant[1]);
    }

    if (matchdate) {
        const dateString = matchdate[1];
        const parsedDate = parse(dateString, 'dd/MM/yyyy', new Date());
        const formattedDate = format(parsedDate, 'yyyy-MM-dd');
        setdate(formattedDate);
    }

  }, [text]); 



  return (
    <form className="create" onSubmit={handleSubmit}> 
      <h2>Ajouter une Facture</h2>

      <label>Numéro de Facture:</label>
      <input 
        type="text" 
        onChange={(e) => setnofacture(e.target.value)} 
        value={nofacture}
        className={emptyFields.includes('nofacture') ? 'error' : ''}
      />

     <label>Adresse:</label>
      <input 
        type="text" 
        onChange={(e) => setadresse(e.target.value)} 
        value={adresse}
        className={emptyFields.includes('adresse') ? 'error' : ''}
      />


      <label>Montant (en DH):</label>
      <input 
        type="number" 
        onChange={(e) => setmontant(e.target.value)} 
        value={montant}
        className={emptyFields.includes('montant') ? 'error' : ''}
      />


      <label>Date:</label>
      <input 
        type="date" 
        onChange={(e) => setdate(e.target.value)} 
        value={date}
        className={emptyFields.includes('date') ? 'error' : ''}
      />

      <button>Ajouter</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default FactureForm