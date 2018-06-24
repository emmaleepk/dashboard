const User = require('./config/user');
const { GraphQLServer } = require('graphql-yoga');
// const { resolvers } = require('./graphql/resolvers');

// Config DB
require('./config/db');

const resolvers = {
 Query: {
   hello: (_, { name }) => `Hello ${name || 'World'}`,
 },
 Mutation: {
   createUser: async(_, {firstName, lastName, email, password}, {models}) => {
     const user = new User({ firstName, lastName, email, password, isDeleted: false });
     await user.save();
     return user;
   }
 }
};

const server = new GraphQLServer({
  typeDefs: `${__dirname}/graphql/schema.graphql`,
              resolvers });

server.start(() => console.log('Server is running on localhost:4000'));
