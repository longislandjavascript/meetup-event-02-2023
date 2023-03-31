import { useState } from "react";
import { fetchAllTodos, Todo } from "./api";

function App() {
  const [data, setData] = useState<null | Todo[]>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | Error>(null);

  async function fetchData() {
    setLoading(true);
    try {
      const data = await fetchAllTodos();
      setData(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err);
      }
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1>Promises Demo</h1>
      <button disabled={loading} onClick={fetchData}>
        {loading ? "Loading" : "Fetch"}
      </button>

      <p>{error && error.message}</p>

      {data?.map((todo) => {
        return (
          <div key={todo.id}>
            <p>{todo.title}</p>
          </div>
        );
      })}

      <div>{JSON.stringify(data)}</div>
    </div>
  );
}

export default App;
