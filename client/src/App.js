import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import {ToastContainer} from 'react-toastify'
import 'react-toastify/ReactToastify.css'

function App() {
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          {/* Outlet component renders the matched child route */}
            <Outlet/>
        </Container>
      </main>
      <Footer />
      <ToastContainer/>
    </>

  );
}

export default App;
