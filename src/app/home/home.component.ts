import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as jwt_decode from "jwt-decode";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  addForm: FormGroup;
  todos = [];
  userId = '';
  toUpdate = -1;
 
  constructor(private router: Router, private apiService: ApiService) {
    const token = localStorage.getItem('token');
    this.userId = jwt_decode(token).data._id;
  }

  ngOnInit() {
    console.log(this.userId);
    this.addForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.maxLength(20), Validators.minLength(3)]),

    });
    this.apiService.getTodos(this.userId).subscribe(res => {
      console.log(res.json());
      this.todos = res.json();
    })
  }

  onAddClick() {
    if (this.addForm.valid) {
      this.apiService.postTodos(this.userId, this.addForm.value).subscribe(res => {
        this.ngOnInit();
      });
    }
  }
  deleteTodoBtn(i) {
    this.apiService.deleteTodo(this.userId, i).subscribe(res => {
      this.ngOnInit();
    })
  }
  doneChecked(i) {
    const todo = this.todos[i];
    todo.Done = !todo.Done;
    this.apiService.editTodo(this.userId, i, todo).subscribe(res => {
      this.ngOnInit();
    })
  }

  updateTitle(i, title) {
    const todo = this.todos[i];
    todo.title = title;
    this.apiService.editTodo(this.userId, i, todo).subscribe(res => {
      this.ngOnInit();
    })
  }

}



