const { GraphQLServer } = require('graphql-yoga');
var mongoose = require('mongoose');


mongoose.connect('mongodb://emmaleepk:EPK123@ds237770.mlab.com:37770/gymdb');
var db = mongoose.connection;

// User Model
const User = mongoose.model('User', {
  firstName: {
    type: String,
    default: ''
  },
  lastName: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    default: '',
    lowercase: true
  },
  password: {
    type: String,
    default:''
  },
  isDeleted: {
    type: Boolean,
  },
  classTaken: {
    type: Array,
    items:{
      type: Object,
      properties: {
        classType: {
          type: String,
          default: ''
        },
        instructor:{
            type: String,
            default: ''
        },
        date:{
            type: Date,
            default: Date.now
        }
      }
    }
  }
});

const typeDefs = `
  type Query {
    hello(name: String): String!
  }
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    isDeleted: Boolean!,
    classTaken: [Classtaken]
  }
  type ClassTaken {
    classType: String!
    instructor: String!
    date: Date!
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
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  server.start(() => console.log('Server is running on localhost:4000'));
});
