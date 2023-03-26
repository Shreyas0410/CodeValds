import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <Auth0Provider
    domain="dev-3xpdhmkgl8j200te.us.auth0.com"
    clientId="pAqzZlsRMYJlDnphlANKXpWK3rowg1IJ"
    authorizationParams={{
    redirect_uri: window.location.origin
    }}
  >
  <BrowserRouter>
    <App />
    </BrowserRouter>
  </Auth0Provider>
);

