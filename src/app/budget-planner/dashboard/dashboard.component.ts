import { Component } from '@angular/core';
import { MatIconModule } from "@angular/material/icon";
import { SideNavComponent } from '../side-nav/side-nav.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [MatIconModule, SideNavComponent, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  constructor(public router: Router) { }

  lastMontsIncome = ['January: $1000', 'February: $1200', 'March: $1100'];
  currentMontsIncome = '$2000';
  totalcurrentMontsIncome = '$2000';
  onIncome() {
    this.router.navigate(['/budget-planner/income']);
  }

  lastMontsExpense = ['January: $1000', 'February: $1200', 'March: $1100'];
  currentMontsExpense = '$500';
  totalCurrentMontsExpense = '$500';

  onExpense() {
    this.router.navigate(['/budget-planner/expense']);
  }
  todoTransactions = [
    { description: 'Pay electricity bill', amount: '$100', date: '2024-04-10' },
    { description: 'Grocery shopping', amount: '$150', date: '2024-04-12' },
    { description: 'Car maintenance', amount: '$200', date: '2024-04-15' }
  ];

  onTodo() {
    this.router.navigate(['/budget-planner/transactions']);
  }

  get currentMonthSaving() : number{
    return this.parseAmount(this.totalcurrentMontsIncome) - this.parseAmount(this.currentMontsExpense);
  }

  private parseAmount(amount: string): number {
    return parseFloat(amount.replace('$', '').replace(',', ''));
  }
}
