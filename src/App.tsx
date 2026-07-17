import type { Component } from 'solid-js';

import { Route, Router } from '@solidjs/router';
import Home from './components/Home';
import Game from './components/Game';

const App: Component = () => {
  return (
    <Router>
      <Route path="/" component={Home} />
      <Route path="/game/:code" component={Game} />
    </Router>
  );
};

export default App;
