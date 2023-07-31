import { Route, Routes } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import Login from "./components/screens/Login";
import Plantations from "./components/screens/Plantations";
import { useState } from "react";
import { autoDecodeToken } from "./components/screens/Login/token/decodeToken";
import { BadRequest } from "./components/screens/errorRequest";

const client = new ApolloClient({
  uri: 'http://localhost:3090/graphql', // Substitua pela URL da sua API GraphQL
  cache: new InMemoryCache(),
});

const App = () => {
  const decodedToken = autoDecodeToken();

  return (
    <>
      <ApolloProvider client={client}>
        <Routes>
          <Route 
            path="/" 
            element={
              !decodedToken?.id ? 
              <Login /> : <Plantations />
            }
          />
          <Route 
            path="/plantations" 
            element={
              decodedToken?.id ? 
              <Plantations /> : <BadRequest />
            } 
          />
        </Routes>
      </ApolloProvider>
    </>
  );
}

export default App;
