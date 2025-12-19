import { Component } from '@angular/core';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-history',
  imports: [SideNavComponent,ReactiveFormsModule, CommonModule],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss'
})
export class HistoryComponent {

  historyForm: any;
  selectedMonth: any;
  januaryHistory: any[] = [
    { source: 'Salary', amount: 5000 },
    { source: 'Freelance', amount: 1500 },
  ];
  februaryHistory: any[] = [
    { source: 'Salary', amount: 5200 },
    { source: 'Freelance', amount: 1300},
  ];
  marchHistory: any[] = [
    { source: 'Salary', amount: 5100 },
    { source: 'Freelance', amount: 1400 },
    { source: 'Rental', amount: 2500 },
  ];

  monthSelected:boolean=false;

  constructor(public fb: FormBuilder, private router: Router) { }
  ngOnInit(): void {
    this.historyForm = this.fb.group({
      month: ['', Validators.required],
      amount: ['', Validators.required],
      source: ['', Validators.required],
    })
  }
  onChange(event: any) {
    this.selectedMonth = event.target.value;
    this.monthSelected = true;
    this.getFilteredHistory();
  }

  calculateTotalHistory(month: string): number {
    let totalHistory = 0;
    for (const history of this.getHistoryByMonth(month)) {
      totalHistory += history.amount;
    }
    return totalHistory;
  }

  getHistoryByMonth(month: string): any[] {
    switch (month) {
      case 'January': return this.januaryHistory;
      case 'February': return this.februaryHistory;
      case 'March': return this.marchHistory;
      default: return [];
    }
  }

  getFilteredHistory() {
    let filteredHistory: any[] = [];
    switch (this.selectedMonth) {
      case 'January':
        filteredHistory = [...this.januaryHistory];
        break;
      case 'February':
        filteredHistory = [...this.februaryHistory];
        break;
      case 'March':
        filteredHistory = [...this.marchHistory];
        break;
      default:
        break
    }
    return filteredHistory;
  }
  onSubmit() {
    if (this.historyForm.valid) {
      const newHistory = this.historyForm.value;
      switch (this.selectedMonth) {
        case 'January':
          this.januaryHistory.push(newHistory);
          break;
        case 'February':
          this.februaryHistory.push(newHistory);
          break;
        case 'March':
          this.marchHistory.push(newHistory);
          break;
        default:
          break;
      }
      this.historyForm.reset();
      this.historyForm.patchValue({ month: '', source: '', amount: '' });
    }
  }
  saveForm() {
    console.log("Form Saved");
  }

  onBack() {
    this.router.navigate(['/budget-planner/dashboard']);
  }
}
