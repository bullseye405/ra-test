import React, { useState, useEffect } from "react";

// admin imports
import { Admin, Resource } from "react-admin";
import buildHasuraProvider from "ra-data-hasura";

// client import
import { ApolloClient, InMemoryCache } from "@apollo/client";

// components
import { Dashboard } from "./Components/Dashboard";
// pages
import LoginPage from "./Pages/LoginForm";
// import { ProductList, ProductCreate } from "./pages/products";

// utils
import authProvider from "./utils/authProvider";
import { auth0 } from "./utils/authProvider";

// browser history
import { createBrowserHistory as createHistory } from "history";
import { ProductCreate, ProductList } from "./Pages/Products";
const history = createHistory();

const createApolloClient = async (token) => {
  return new ApolloClient({
    uri: "https://react-admin.hasura.app/v1/graphql",
    cache: new InMemoryCache(),
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const App = () => {
  const [dataProvider, setDataProvider] = useState({});

  useEffect(() => {
    const buildDataProvider = async () => {
      const isAuthenticated = await auth0.isAuthenticated();
      if (!isAuthenticated) {
        return;
      }
      const token = await auth0.getIdTokenClaims();
      const idToken = token.__raw;
      console.log({ idToken });

      const apolloClient = await createApolloClient(idToken);
      console.log({ apolloClient });

      const dataProvider = await buildHasuraProvider({
        client: apolloClient,
      });
      setDataProvider(() => dataProvider);
    };
    buildDataProvider();
  }, []);

  return (
    <Admin
      dataProvider={dataProvider}
      authProvider={authProvider}
      title="Hasura Dashboard"
      dashboard={Dashboard}
      history={history}
      loginPage={LoginPage}
    >
      <Resource name="products" list={ProductList} create={ProductCreate}></Resource>
    </Admin>
  );
};
export default App;
