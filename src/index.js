import React from 'react';
import { render } from 'react-dom';
import ApolloClient, { gql } from "apollo-boost";
import { ApolloProvider, Query } from "react-apollo";

const client = new ApolloClient({ 
  uri: "https://swapi-graphql.netlify.app/.netlify/functions/index"
});

const CharactersQuery = () => {
  return (
    <Query
      query={gql`
        {
          allPeople {
            people {
              id
              name
            }
          }
        }
      `}
    >
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error!</p>;
        console.log(data.allPeople.people)
        return data.allPeople.people.map(people => {
          return <p key={people.id}>{people.name}</p>;
        });
      }}
    </Query>
  );
};

function App() {
  return (
    <div className="App">
      <h2>My first Apollo app</h2>
      <CharactersQuery/>
    </div>
  );
}

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
);