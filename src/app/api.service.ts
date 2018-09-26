import { Injectable } from '@angular/core';
import { Http } from '@angular/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: Http) { }

  loginApi(form) {
    return this.http.post('http://localhost:3000/auth/login', form);
  }
   
  registerApi(form) {
    return this.http.post('http://localhost:3000/auth/register', form);
  }

  getTodos(id) {
    return this.http.get('http://localhost:3000/todo/' + id);
  }
  postTodos(id, form) {
    return this.http.post('http://localhost:3000/todo/' + id, form);
  }

  deleteTodo(id, i) {
    return this.http.delete('http://localhost:3000/todo/' + id + '/' + i);
  }
  editTodo(id, i, todo) {
    return this.http.put(`http://localhost:3000/todo/${id}/${i}`, todo)
  }
}
