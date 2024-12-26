import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomerPayload } from './loan.model';
import { LoanResponse } from './loan-response.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoanEligibilityService {

  private apiUrl = 'http://localhost:8080/v1/users/eligibility';

  constructor(private http: HttpClient) {}

  checkLoanEligibility(customerData: any): Observable<LoanResponse > {
    return   this.http.post<LoanResponse>(this.apiUrl, customerData);
  }
}