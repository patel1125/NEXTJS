import { getItems, addItem, deleteItem } from "@/lib/firebase";

export const resolvers = {
  Query: {
    items: async () => await getItems(),
  },

  Mutation: {
    addItem: async (_, { title }) => {
      return await addItem(title);
    },

    deleteItem: async (_, { id }) => {
      return await deleteItem(id);
    },
  },
};