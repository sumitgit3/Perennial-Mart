import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { Container } from "react-bootstrap";
function App() {
  return (
    <>
    <Header/>
    <main className="text-center py-3">
      <Container>
        <p>Welcome to PerenialMart</p>
      </Container>
    </main>
    <Footer/>
    </>
    
  );
}

export default App;
