import {createNetworkInterface, ApolloClient} from "react-apollo";

export default function createApolloClient() {

  return {
    getClient: (uri, ssrMode) => {
      const networkInterface = createNetworkInterface({
        uri
      });

      const client = new ApolloClient({
        ssrMode,
        networkInterface
      });

      return client;
    }
  }
}
