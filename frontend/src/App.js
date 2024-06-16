import {BrowserRouter,Routes,Route} from 'react-router-dom'

//pages & components
import Upload from './pages/Upload'
import Factures from './pages/Factures'
import Navbar from './components/Navbar'


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
      <div className="pages">
        <Routes>
          <Route
            path="/Upload"
            element={<Upload />}
          />
          <Route
            path="/"
            element={<Factures />}
          />
        </Routes>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
