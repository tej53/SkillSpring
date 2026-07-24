import Home from './Components/Home';
import About from './About';
import Contact from './Contact';

function App() {
  return (
    <div style={{ fontFamily: 'sans-serif', padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Student Management Portal</h1>
      <hr />
      <Home />
      <hr />
      <About />
      <hr />
      <Contact />
    </div>
  );
}

export default App;
