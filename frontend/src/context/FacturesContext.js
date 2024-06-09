import { createContext, useReducer } from 'react'

export const FacturesContext = createContext()

export const facturesReducer = (state, action) => {
  switch (action.type) {
    case 'SET_FACTURES':
      return { 
        factures: action.payload 
      }
    case 'CREATE_FACTURE':
      return { 
        factures: [action.payload, ...state.factures] 
      }
    case 'DELETE_FACTURE':
      return { 
        factures: state.factures.filter(w => w._id !== action.payload._id) 
      }
    default:
      return state
  }
}

export const FacturesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(facturesReducer, { 
    factures: null
  })
  
  return (
    <FacturesContext.Provider value={{ ...state, dispatch }}>
      { children }
    </FacturesContext.Provider>
  )
}