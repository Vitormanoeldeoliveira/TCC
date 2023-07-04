import Login from "./components/screens/Login";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:3090/graphql', // Substitua pela URL da sua API GraphQL
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <>
      <ApolloProvider client={client}>
        <Login />
      </ApolloProvider>
    </>
  );
}

export default App;
