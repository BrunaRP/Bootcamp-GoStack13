import React, { useEffect, useState } from "react";
import api from './services/api';
import "./styles.css";

function App(){

const [repositories, setRepositories] = useState([]);

useEffect(() => {
  api.get('repositories').then((response) => {
     setRepositories(response.data);
  });
 }, []);

async function handleAddRepository() {
  const response = await api.post('repositories', {
     title: `Repositório: ${Date.now()}`,
     url: "http://github.com/BrunaRP",
     techs: ["Node.js", "ReactJS"]
  });

  setRepositories([ ...repositories, response.data ]);

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/%{id}`);

    setRepositories(repositories.filter(
      repository => repository.id !==  id
    ))
  }

  /* poderia ser também   
    const filteredRepository = repositories.filter(repository => repository.id !== id);
   setRepositories(filteredRepository);
   imutabilidade. não altero a info original eu crio uma nova   */

  

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository =>(
          <li key={repository.id}>
            {repository.title}

          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>
      ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

}

export default App;
