import React, {useState} from 'react'

const CountryContext = React.createContext({
  country: null,
  setInputCountry: () => {}
})

const CountryContextProvider = (props) => {
  const [countryPage, setCountryPage] = useState("Poland")

  const countryInputHandler = (country) => {
    setCountryPage(country)
  }
  return (
    <CountryContext.Provider value={{ setInputCountry: countryInputHandler, country: countryPage}} >
      {props.children}
    </CountryContext.Provider>
  )
}
export { CountryContext, CountryContextProvider }