import React from 'react'
import { Link } from 'react-router-dom'


function App({ children }: any) {
  return (
      <div className="App">

        <main id="main">
          <ul>
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/noticia">Notícias</Link>
            </li>
          </ul>
        
          {children}
          </main>
      </div>
  )
}
export default App