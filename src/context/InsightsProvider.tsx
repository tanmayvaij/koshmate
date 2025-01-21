import { createContext, useContext } from "react"

const Context = createContext({
    
})

const InsightsProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Context.Provider value={{}}>{children}</Context.Provider>
  )
}

export const useInsights = () => useContext(Context)

export default InsightsProvider