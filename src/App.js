

import { About } from './Features/About/About';
import { Contact } from './Features/Contact/Contact';
import { Home } from './Features/Home/Home';
import { Projects } from './Features/Projects/Projects';

import './App.css';
import { Navigation } from './Features/Navigation/Navigation';

function App() {
  return (
    <div className="App">
      <Navigation />
      <Home />
      <About />
      <Projects />
      <Contact />
    </div>
  );
}

export default App;
