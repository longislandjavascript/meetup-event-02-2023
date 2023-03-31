export type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export async function fetchAllTodos(): Promise<Todo[]> {
  // https://jsonplaceholder.typicode.com/todos
  const response = await fetch("https://jsonplaceholder.typicode.com/todos");
  const data = await response.json();
  return data;
}

export async function fetchTodosByIDList(IDList: string[]) {
  // address all vs allSettled
  // https://jsonplaceholder.typicode.com/todos/1
  const fetchers = IDList.map((id) => {
    return fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
  });
  const responses = await Promise.all(fetchers);
  const data = await Promise.all(responses.map((response) => response.json()));
  return data;
}

export async function fetchFirstTodoFromIDList(IDList: string[]) {
  // https://jsonplaceholder.typicode.com/todos/1
  const fetchers = IDList.map((id) => {
    return fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
  });
  const responses = await Promise.race(fetchers);
  const data = await responses.json();
  return data;
}
