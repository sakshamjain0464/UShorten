import Navbar from "./components/Navbar";
import Main from "./components/MainContent";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="flex flex-col h-fit w-screen overflow-x-hidden">
      <Navbar />
      <Main/>
      <Footer/>
    </div>
  );
}

export default App;
