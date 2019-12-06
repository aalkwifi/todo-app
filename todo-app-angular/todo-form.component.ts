import { Component, OnInit } from '@angular/core';
import {Todo} from '../interfaces/todo';
import {isBoolean} from 'util';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit {
  textCheckbox1: string = '';
  textCheckbox2: string = '';
  selectLevel: string = '';
  todoTitleText: string;
  todos: Todo[];
  idTodo: number;
  isActive: boolean;
  constructor() { }

  ngOnInit() {
    this.idTodo = 4;
    this.todoTitleText = '';
    this.todos = [
      {
        'id': 1,
        'title': 'FOOD',
        'completed': false,
        'editing': false,
        'level': 3
      },
      {
        'id': 2,
        'title': 'TV & TREVAL',
        'completed': false,
        'editing': false,
        'level': 1
      },
      {
        'id': 3,
        'title': 'DAY & NIGHT',
        'completed': false,
        'editing': false,
        'level': 2
      },
    ]
  }
  addToDo() {
    if (this.todoTitleText.trim().length === 0) {
      return ;
    }
    this.todos.push({
      'id': this.idTodo,
      'title': this.todoTitleText.toLocaleUpperCase(),
      'completed': isBoolean(),
      'editing': false,
      'level': this.selectLevel
    })
    this.todoTitleText = '';
    this.idTodo++;
  }

  deleteToDo(id: number) {
    this.todos = this.todos.filter(todo => todo.id !== id)
  }

  todoRadioButtonsLevelsHandler(event: any) {
     this.selectLevel = event.target.value;
     console.log(this.selectLevel);
  }

  handlerCheckBox(event) {
    this.isActive = event.target.checked;

    if (this.isActive === true) {
      console.log('HIHIHIHIH');
      this.textCheckbox1 = 'IS checked'
    } else {
      console.log('BYEBYEYHYOL');
      this.textCheckbox2 = 'Not checked'
    }
  }
}


