const { models } = require('./config/db');
const { GraphQLServer } = require('graphql-yoga');

// Config DB
const db = require('./config/db');


const typeDefs = `
  type Query {
    hello(name: String): String!
  }
  type Date{
    created: Date
  }
  type ClassTaken {
    classType: String!
    instructor: String!
    date: Date!
  }
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    isDeleted: Boolean!,
    classTaken: [ClassTaken]
  }
  type Mutation {
    createUser(firstName: String!,
               lastName: String!,
               email: String!,
               password: String!): User
  }
`

const resolvers = {
  Query: {
    hello: (_, { name }) => `Hello ${name || 'World'}`,
  },
  Mutation: {
    createUser: async(_, {firstName, lastName, email, password}) => {
      const user = new User({ firstName, lastName, email, password, isDeleted: false });
      await user.save();
      return user;
    }
  }
};

const server = new GraphQLServer({ typeDefs, resolvers })

server.start(() => console.log('Server is running on localhost:4000'));
