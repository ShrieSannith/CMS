import './App.css';
import AppAppBar from './components/navbar';
import Hero from './components/hero';
import Footer from './components/footer';

function App() {
  return (
    <div className="App">
      <AppAppBar/>
      <Hero />
      {/* <Footer /> */}
    </div>
  );
}

export default App;
