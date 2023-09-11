import { Route, Routes } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import Login from "./components/screens/Login";
import Plantations from "./components/screens/Plantations";
import { useState } from "react";
import { autoDecodeToken } from "./components/screens/Login/token/decodeToken";
import { BadRequest } from "./components/screens/errorRequest";
import { UserConfig } from "./components/screens/UserConfig";
import { AboutUs } from "./components/screens/AboutUs";
import { Documentation } from "./components/screens/Documentation";
import { SystemConfig } from "./components/screens/SystemConfig";
import { UserConfigWithBg } from "./components/screens/UserConfig/bgColor";
import { Harvest } from "./components/screens/harvest";

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
          <Route 
            path="/userConfig" 
            element={ 
              decodedToken?.id ? 
              <UserConfigWithBg /> : <BadRequest />
            } 
          />
          <Route 
            path="/aboutUs" 
            element={
              decodedToken?.id ? 
              <AboutUs /> : <BadRequest />
            } 
          />
          <Route 
            path="/documentation" 
            element={
              decodedToken?.id ?
              <Documentation /> : <BadRequest />
            } 
          />
          <Route 
            path="/systemConfig" 
            element={ 
              decodedToken?.id ? 
              <SystemConfig /> : <BadRequest />
            } 
          />
          <Route
            path="/harvest"
            element={
              decodedToken?.id ?
              <Harvest /> : <BadRequest />
            }
          />
        </Routes>
      </ApolloProvider>
    </>
  );
}

export default App;
