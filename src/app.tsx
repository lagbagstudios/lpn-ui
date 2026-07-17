import { Route, Router } from "@solidjs/router";
import "./app.css";
import { Suspense } from "solid-js";
import { MetaProvider, Meta } from "@solidjs/meta";
import Home from "./components/home";
import Game from "./components/game";

export default function App() {
  return (
    <MetaProvider>
      <Meta name="viewport" content=" initial-scale=1.0, user-scalable=no" />
      <Router root={(props) => <Suspense>{props.children}</Suspense>}>
        <Route path="/" component={Home} />
        <Route path="/game" component={Game} />
      </Router>
    </MetaProvider>
  );
}
