import { Router } from "@solidjs/router";
import "./app.css";
import { Suspense } from "solid-js";
import { FileRoutes } from "@solidjs/start/router";
import { MetaProvider, Meta } from "@solidjs/meta";

export default function App() {
  return (
    <MetaProvider>
      <Meta name="viewport" content=" initial-scale=1.0, user-scalable=no" />
      <Router root={(props) => <Suspense>{props.children}</Suspense>}>
        <FileRoutes />
      </Router>
    </MetaProvider>
  );
}
