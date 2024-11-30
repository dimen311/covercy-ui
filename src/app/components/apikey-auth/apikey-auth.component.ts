import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiKeyService } from '../../services/apikey.service';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-apikey-auth',
  templateUrl: './apikey-auth.component.html',
  styleUrls: ['./apikey-auth.component.css'],
  imports: [ReactiveFormsModule, CommonModule],
  standalone: true
})
export class ApikeyAuthComponent {

  errorMessage: string | null = null;
  apiKeyForm: FormGroup;
  authResponse: any;
  apiKeyModel = this.storeService.getApiKey();
  constructor(private fb: FormBuilder, private apiKeyService: ApiKeyService,
    private storeService: StoreService
  ) {
    this.apiKeyForm = this.fb.group({
      authApiKey: ['', [Validators.required, Validators.minLength(10)]]
    });


  }


  onSubmit() {
    if (this.apiKeyForm.valid) {
      const key = this.apiKeyForm.get('authApiKey')?.value;
      if (key) {
        this.apiKeyService
          .authenticateWithApiKey(key)
          .subscribe({
            next: (res) => {
              this.authResponse = res?.token;
              this.storeService.setApiKey(res.apiKey);
            }
            ,
            error: (err) => {
              this.errorMessage = err.error?.message || 'Failed to create API key';

            }
          }
          );
      }
    }
  }
}
