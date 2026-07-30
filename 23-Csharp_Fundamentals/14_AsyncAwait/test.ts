async function fetchData(url: string): Promise<object> {
  const response = await fetch(url);
  return response.json();
}

const result = await fetchData('https://jsonplaceholder.typicode.com/todos');
console.log(result);

export {};
