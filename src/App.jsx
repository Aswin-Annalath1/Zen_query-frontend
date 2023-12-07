
import Adminzen from "./components/Adminzen";
import Loginzen from "./components/Loginzen";
import Registerzen from "./components/Registerzen";
import Mainpagezen from "./components/Mainpagezen";
import Mainpagenextzen from "./components/Mainpagenextzen";
import Staffzen from "./components/Staffzen";
import Staffnextzen from "./components/Staffnextzen";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>

    <Router>
      <Routes>

        <Route path="/" element={<Registerzen/>} />

        <Route path="/login" element={<Loginzen/>} />

        <Route path="/mainpagezen/:userid" element={<Mainpagezen/>}/>

        <Route path="/mainpagenextzen/:userid/:id" element={<Mainpagenextzen/>}/>

        <Route path="/admin" element={<Adminzen/>} />

        <Route path="/staff" element={<Staffzen/>}/>

        <Route path="/staffnextzen/:userid/:id" element={<Staffnextzen/>}/>


        {/* Any unknown route gone then this shown.. */}

        <Route path="*" element={
          <body className="bg-cover bg-center" style={{ backgroundImage: 'url("https://source.unsplash.com/1600x900/?anime")' }}>
          <div className="min-h-screen flex items-center justify-center">
            <div className="bg-white bg-opacity-80 p-8 rounded-md shadow-md text-center">
              <h1 className="text-5xl font-bold mb-4">404 - Page Not Found</h1>
              <p className="text-lg text-gray-700">Sorry, the page you are looking for might be in another dimension.</p>
              <img src="https://source.unsplash.com/400x300/?anime" alt="Anime" className="mt-8 rounded-lg shadow-md" />
              <a
                href="/"
                className="inline-block mt-8 text-blue-500 hover:text-blue-800"
              >
                Go back to Home
              </a>
            </div>
          </div>
        </body>
        }
        />

      </Routes>
    </Router>

    </>
  )
}

export default App;