import { gql } from "graphql-tag";

export const typeDefs = gql`
  type Item {
    id: ID!
    title: String!
  }

  type Query {
    items: [Item!]!
  }

  type Mutation {
    addItem(title: String!): Item
    deleteItem(id: ID!): Boolean
  }
`;