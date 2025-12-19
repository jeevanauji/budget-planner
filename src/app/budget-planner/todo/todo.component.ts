import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss'
})
export class TodoComponent {

  todoForm: any;
  selectedMonth: any;
  januaryTodo: any[] = [
    { source: 'Salary', amount: 5000 },
    { source: 'Freelance', amount: 1500 },
  ];
  februaryTodo: any[] = [
    { source: 'Salary', amount: 5200 },
    { source: 'Freelance', amount: 1300},
  ];
  marchTodo: any[] = [
    { source: 'Salary', amount: 5100 },
    { source: 'Freelance', amount: 1400 },
    { source: 'Rental', amount: 2500 },
  ];

  monthSelected:boolean=false;

  constructor(public fb: FormBuilder, private router: Router) { }
  ngOnInit(): void {
    this.todoForm = this.fb.group({
      month: ['', Validators.required],
      amount: ['', Validators.required],
      source: ['', Validators.required],
    })
  }
  onChange(event: any) {
    this.selectedMonth = event.target.value;
    this.monthSelected = true;
    this.getFilteredTodo();
  }

  calculateTotalTodo(month: string): number {
    let totalTodo = 0;
    for (const todo of this.getTodoByMonth(month)) {
      totalTodo += todo.amount;
    }
    return totalTodo;
  }

  getTodoByMonth(month: string): any[] {
    switch (month) {
      case 'January': return this.januaryTodo;
      case 'February': return this.februaryTodo;
      case 'March': return this.marchTodo;
      default: return [];
    }
  }

  getFilteredTodo() {
    let filteredTodo: any[] = [];
    switch (this.selectedMonth) {
      case 'January':
        filteredTodo = [...this.januaryTodo];
        break;
      case 'February':
        filteredTodo = [...this.februaryTodo];
        break;
      case 'March':
        filteredTodo = [...this.marchTodo];
        break;
      default:
        break
    }
    return filteredTodo;
  }
  onSubmit() {
    if (this.todoForm.valid) {
      const newTodo = this.todoForm.value;
      switch (this.selectedMonth) {
        case 'January':
          this.januaryTodo.push(newTodo);
          break;
        case 'February':
          this.februaryTodo.push(newTodo);
          break;
        case 'March':
          this.marchTodo.push(newTodo);
          break;
        default:
          break;
      }
      this.todoForm.reset();
      this.todoForm.patchValue({ month: '', source: '', amount: '' });
    }
  }
  saveForm() {
    console.log("Form Saved");
  }

  onBack() {
    this.router.navigate(['/budget-planner/dashboard']);
  }
}
