import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";


function App() {
  return (
    <>
      <Header />
      <main className="text-center py-3">
        <Container>
          {/* Outlet component renders the matched child route */}
            <Outlet/>
        </Container>
      </main>
      <Footer />
    </>

  );
}

export default App;
