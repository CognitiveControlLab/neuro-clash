import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client';
import { createAuthLink } from 'aws-appsync-auth-link';
import { createHttpLink } from 'apollo-link-http';
import settings from '../../settings';

const link = ApolloLink.from([
  // @ts-ignore Required until incompatibility between aws-appsync and apollo-client is resolved
  createAuthLink(settings.graphql),
  // @ts-ignore Required until incompatibility between aws-appsync and apollo-client is resolved
  createHttpLink({ uri: settings.graphql.url }),
]);
const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

export default apolloClient;
