import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoanResponse } from '../loan-response.model';
import { LoanEligibilityService } from '../loan-eligibility.service';
import { CustomerPayload } from '../loan.model';

@Component({
  selector: 'app-loan-eligibility',
  standalone: true,
  imports: [ 
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './loan-eligibility.component.html',
  styleUrls: ['./loan-eligibility.component.css']
})
export class LoanEligibilityComponent {

  loanForm!: FormGroup;
  loanResponse: any;  // Define loanResponse property
  errorMessage: string | null = null; // Holds error messages

  employmentStatuses = ['Employed', 'Unemployed', 'Self-Employed', 'Retired'];

  constructor(private fb: FormBuilder, private loanService: LoanEligibilityService) {}

  ngOnInit() {
    this.loanForm = this.fb.group({
      customerId: ['', Validators.required],
      creditScore: ['', [Validators.required, Validators.min(300), Validators.max(850)]],
      totalDebt: ['', [Validators.required, Validators.min(0)]],
      employmentStatus: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loanForm.invalid) {
      this.errorMessage = 'Please correct the errors in the form.';
      return;
    }
  
    this.loanService.checkLoanEligibility(this.loanForm.value).subscribe({
      next: (response) => {
        // Check if the loan application was approved or rejected
        if (response.isApproved === 'Rejected') {
          this.loanResponse = response; // Still display the rejection response
          this.errorMessage = ''; // No general error message
        } else {
          this.loanResponse = response; // Set approved response
          this.errorMessage = ''; // Clear any errors
        }
      },
      error: (error) => {
        // Handle only true API errors, such as network or server errors
        this.loanResponse = null; // Clear any previous response
        this.errorMessage = 'Oops, something went wrong. Please try again.';
        console.error('API Error:', error);
      },
    });
  }
  
}