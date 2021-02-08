const { ApolloServer, gql } = require('apollo-server');
const { flights } = require('./data');

const typeDefs = gql`
  type Query {
    flights: [Flight]!
    rockets: [Rocket]!
  }

  type Flight {
    date: String!
    rocket: String!
  }

  type Rocket {
    rocket: String!
  }
`;

const resolvers = {
  Query: {
    flights: () => flights,
    rockets: () =>
      flights.map((flight) => {
        return {
          rocket: flight.rocket,
        };
      }),
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen(4000, console.log.bind(null, 'listening...'));
