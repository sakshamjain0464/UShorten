import Navbar from "./components/Navbar";
import Main from "./components/MainContent";
import Footer from "./components/Footer";
import {Toaster} from 'react-hot-toast';

function App() {
  return (
    <>
      <div className="flex flex-col h-fit w-screen overflow-x-hidden">
      <Navbar />
      <Main/>
      <Footer/>
    </div>
    <Toaster />
    </>
  );
}

export default App;
