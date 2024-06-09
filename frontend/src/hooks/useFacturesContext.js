import { FacturesContext } from "../context/FacturesContext"
import { useContext } from "react"

export const useFacturesContext = () => {
  const context = useContext(FacturesContext)

  if(!context) {
    throw Error('useFacturesContext must be used inside a FacturesContextProvider')
  }

  return context
}