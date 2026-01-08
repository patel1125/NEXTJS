"use client";

import { gql } from "@apollo/client";
import { useQuery, useMutation } from "@apollo/client/react";
import { useState } from "react";

const GET_ITEMS = gql`
  query {
    items {
      id
      title
    }
  }
`;

const ADD_ITEM = gql`
  mutation ($title: String!) {
    addItem(title: $title) {
      id
      title
    }
  }
`;

const DELETE_ITEM = gql`
  mutation ($id: ID!) {
    deleteItem(id: $id)
  }
`;

export default function Home() {
  const { data, loading, error } = useQuery(GET_ITEMS);
  const [addItem] = useMutation(ADD_ITEM, {
    refetchQueries: [{ query: GET_ITEMS }],
  });
  const [deleteItem] = useMutation(DELETE_ITEM, {
    refetchQueries: [{ query: GET_ITEMS }],
  });

  const [title, setTitle] = useState("");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <main style={{ padding: 20 }}>
      <h1>Items from Firebase</h1>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New item"
      />

      <button
        onClick={() => {
          if (!title) return;
          addItem({ variables: { title } });
          setTitle("");
        }}
      >
        Add
      </button>

      <ul>
        {data.items.map((item) => (
          <li key={item.id}>
            {item.title}
            <button
              style={{ marginLeft: 10 }}
              onClick={() => deleteItem({ variables: { id: item.id } })}
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}