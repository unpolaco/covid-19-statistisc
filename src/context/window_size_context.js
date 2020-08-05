import React, {useState, useEffect} from 'react'

const WindowSizeContext = React.createContext({})

const WindowSizeContextProvider = ({children}) => {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  const handleWindowResize = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  }

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return (
    <WindowSizeContext.Provider value={{width, height}}>
      {children}
    </WindowSizeContext.Provider>
  )
}

export { WindowSizeContext, WindowSizeContextProvider }