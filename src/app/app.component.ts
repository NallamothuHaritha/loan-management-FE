import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { LoanEligibilityComponent } from './loan-eligibility/loan-eligibility.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReactiveFormsModule ,LoanEligibilityComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'loan-eligibility';
}
