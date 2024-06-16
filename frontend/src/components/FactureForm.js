import { useEffect,useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useFacturesContext } from "../hooks/useFacturesContext"
import { format,parse } from "date-fns";

const FactureForm = (props) => {
  const { dispatch } = useFacturesContext()
  const [nocompte, setnocompte] = useState('')
  const [email, setemail] = useState('')
  const [montant, setmontant] = useState('')
  const [date, setdate] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const facture = {nocompte, email, montant, date}
    
    const response = await fetch('/api/factures', {
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
      setnocompte('')
      setemail('')
      setmontant('')
      setdate('')
      navigate("/")
      dispatch({type: 'CREATE_FACTURE', payload: json})
    }

    

  }

  // FIND MATCHES

  const text = props.text;

  useEffect(() => {

    const regexnocompte = /(?:N° Compte: |Numéro d'appel : )([a-zA-Z0-9]+)/;
    const regexemail = /(?:Email: |Courrier électronique : )([A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,})/i;
    const regexmontant = /(?:Montant Total: |Total )([0-9]+(?:\.[0-9]+)?)/;
    const regexdate = /(?:Date Paiement : |Date de paiement : )(\d{2}\/\d{2}\/\d{4})/;

    const matchnocompte = text.match(regexnocompte);
    const matchemail = text.match(regexemail);
    const matchmontant = text.match(regexmontant);
    const matchdate = text.match(regexdate);

    if (matchnocompte) {
        setnocompte(matchnocompte[1]);
    }

    if (matchemail) {
        setemail(matchemail[1]);
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

      <label>N° Compte:</label>
      <input 
        type="text" 
        onChange={(e) => setnocompte(e.target.value)} 
        value={nocompte}
        className={emptyFields.includes('nocompte') ? 'error' : ''}
      />

     <label>Email:</label>
      <input 
        type="text" 
        onChange={(e) => setemail(e.target.value)} 
        value={email}
        className={emptyFields.includes('email') ? 'error' : ''}
      />


      <label>Montant (en DH):</label>
      <input 
        type="number" 
        onChange={(e) => setmontant(e.target.value)} 
        value={montant}
        className={emptyFields.includes('montant') ? 'error' : ''}
      />


      <label>Date de Paiement:</label>
      <input 
        type="date" 
        onChange={(e) => setdate(e.target.value)} 
        value={date}
        className={emptyFields.includes('date') ? 'error' : ''}
      />

      <button>Ajouter</button>
      {/* <h3>{text}</h3> */}
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default FactureForm