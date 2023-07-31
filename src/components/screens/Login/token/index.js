import { ApolloClient, InMemoryCache, ApolloLink, HttpLink } from '@apollo/client';

// Criar um Apollo Link para incluir o token no header das requisições
const authLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem('token');
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : '', // Incluindo o token no header "Authorization"
    },
  });
  return forward(operation);
});

const httpLink = new HttpLink({ uri: 'http://localhost:3090/graphql' });

// Criar a instância do Apollo Client com o Apollo Link criado acima
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});