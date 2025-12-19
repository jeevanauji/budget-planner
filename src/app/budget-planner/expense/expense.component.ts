import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-expense',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './expense.component.html',
  styleUrl: './expense.component.scss'
})
export class ExpenseComponent {

  expenseForm: any;
  selectedMonth: any;
  januaryExpense: any[] = [
    { source: 'Salary', amount: 5000 },
    { source: 'Freelance', amount: 1500 },
  ];
  februaryExpense: any[] = [
    { source: 'Salary', amount: 5200 },
    { source: 'Freelance', amount: 1300},
  ];
  marchExpense: any[] = [
    { source: 'Salary', amount: 5100 },
    { source: 'Freelance', amount: 1400 },
    { source: 'Rental', amount: 2500 },
  ];

  monthSelected:boolean=false;

  constructor(public fb: FormBuilder, private router: Router) { }
  ngOnInit(): void {
    this.expenseForm = this.fb.group({
      month: ['', Validators.required],
      amount: ['', Validators.required],
      source: ['', Validators.required],
    })
  }
  onChange(event: any) {
    this.selectedMonth = event.target.value;
    this.monthSelected = true;
    this.getFilteredExpense();
  }

  calculateTotalExpense(month: string): number {
    let totalExpense = 0;
    for (const expense of this.getExpenseByMonth(month)) {
      totalExpense += expense.amount;
    }
    return totalExpense;
  }

  getExpenseByMonth(month: string): any[] {
    switch (month) {
      case 'January': return this.januaryExpense;
      case 'February': return this.februaryExpense;
      case 'March': return this.marchExpense;
      default: return [];
    }
  }

  getFilteredExpense() {
    let filteredExpense: any[] = [];
    switch (this.selectedMonth) {
      case 'January':
        filteredExpense = [...this.januaryExpense];
        break;
      case 'February':
        filteredExpense = [...this.februaryExpense];
        break;
      case 'March':
        filteredExpense = [...this.marchExpense];
        break;
      default:
        break
    }
    return filteredExpense;
  }
  onSubmit() {
    if (this.expenseForm.valid) {
      const newExpense = this.expenseForm.value;
      switch (this.selectedMonth) {
        case 'January':
          this.januaryExpense.push(newExpense);
          break;
        case 'February':
          this.februaryExpense.push(newExpense);
          break;
        case 'March':
          this.marchExpense.push(newExpense);
          break;
        default:
          break;
      }
      this.expenseForm.reset();
      this.expenseForm.patchValue({ month: '', source: '', amount: '' });
    }
  }
  saveForm() {
    console.log("Form Saved");
  }

  onBack() {
    this.router.navigate(['/budget-planner/dashboard']);
  }
}
