import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-income',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './income.component.html',
  styleUrl: './income.component.scss'
})
export class IncomeComponent {

  incomeForm: any;
  selectedMonth: any;
  januaryIncome: any[] = [
    { source: 'Salary', amount: 5000, investments: '401k' },
    { source: 'Freelance', amount: 1500, investments: 'Stocks' },
  ];
  februaryIncome: any[] = [
    { source: 'Salary', amount: 5200, investments: '401k' },
    { source: 'Freelance', amount: 1300, investments: 'Bonds' },
  ];
  marchIncome: any[] = [
    { source: 'Salary', amount: 5100, investments: '401k' },
    { source: 'Freelance', amount: 1400, investments: 'Mutual Funds' },
    { source: 'Rental', amount: 2500, investments: 'Real estate' },
  ];

  monthSelected:boolean=false;

  constructor(public fb: FormBuilder, private router: Router) { }
  ngOnInit(): void {
    this.incomeForm = this.fb.group({
      month: ['', Validators.required],
      source: ['', Validators.required],
      amount: ['', Validators.required],
      investments: ['', Validators.required],
    })
  }
  onChange(event: any) {
    this.selectedMonth = event.target.value;
    this.monthSelected = true;
    this.getFilteredIncome();
  }

  calculateTotalIncome(month: string): number {
    let totalIncome = 0;
    for (const income of this.getIncomeByMonth(month)) {
      totalIncome += income.amount;
    }
    return totalIncome;
  }

  getIncomeByMonth(month: string): any[] {
    switch (month) {
      case 'January': return this.januaryIncome;
      case 'February': return this.februaryIncome;
      case 'March': return this.marchIncome;
      default: return [];
    }
  }

  getFilteredIncome() {
    let filteredIncome: any[] = [];
    switch (this.selectedMonth) {
      case 'January':
        filteredIncome = [...this.januaryIncome];
        break;
      case 'February':
        filteredIncome = [...this.februaryIncome];
        break;
      case 'March':
        filteredIncome = [...this.marchIncome];
        break;
      default:
        break
    }
    return filteredIncome;
  }
  onSubmit() {
    if (this.incomeForm.valid) {
      const newIncome = this.incomeForm.value;
      switch (this.selectedMonth) {
        case 'January':
          this.januaryIncome.push(newIncome);
          break;
        case 'February':
          this.februaryIncome.push(newIncome);
          break;
        case 'March':
          this.marchIncome.push(newIncome);
          break;
        default:
          break;
      }
      this.incomeForm.reset();
      this.incomeForm.patchValue({ month: '', source: '', amount: '', investments: '' });
    }
  }
  saveForm() {
    console.log("Form Saved");
  }

  onBack() {
    this.router.navigate(['/budget-planner/dashboard']);
  }
}
