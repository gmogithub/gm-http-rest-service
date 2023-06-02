## gm http rest service

Gm http rest service is Http client.

### Exemple with builder

```` ts

const tokenTest: string|undefined = "adOpbGciOiJI.aukjkjiOiI3NTU3IiwiaWF0IjoxNjgE5Njg3.Q_gmkwevbCfwQWym4PjCo..."

const middlewaresBefore: HttpMiddleware[] = [
  (http) => {
    if (tokenTest) {
      http.headers.set('Authorization', tokenTest);
    } else {
      http.headers.set('Authorization', '');
    }
  },
]

const middlewaresAfter: HttpMiddleware[] = [
  (_, response) => {
    console.log(response, "1")
    return response;
  }
]

const middlewaresSuccess: HttpMiddleware[] = [
  (_, response) => {
    console.log(response, "success")
    return response;
  }
]

const middlewaresError: HttpMiddleware[] = [
  (_, response) => {
    console.log(response, "error")
    return response;
  }
]

function http() {
    return new HttpRestServiceBuilder()
    .withBaseUrl('https://localhost:3000')
    .withMiddlewareBefore(middlewaresBefore) // launch middlewares before send request http (1)
    .withMiddlewareSuccess(middlewaresSuccess) // launch middlewares  response http if success (2)
    .withMiddlewareError(middlewaresError) // launch middlewares  response http if error (2)
    .withMiddlewareAfter(middlewaresAfter) // launch middlewares after send request http (3)
    .build();
}


interface TodoPayload {
  userId: number|null,
  id: number,
  title: string,
  completed: boolean
}

function getTodos() {
    return http().get<TodoPayload[]>("/todos"));
}

function addTodos(todo: TodoPayload) {
    return http().post<boolean>("/todos", todo));
}

function updateTodos(id: number, todo: TodoPayload) {
    return http().put<boolean>(`/todos/${id}`, todo));
}

function deleteTodos(id: number) {
    return http().delete<boolean>(`/todos/${id}`));
}

const todos = getTodos();

```