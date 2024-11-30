import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiKeyModel, ApiKeyResponse } from '../../models/apikey.model';
import { Permission } from '../../models/permission.enum';
import { ApiKeyService } from '../../services/apikey.service';
import { StoreService } from '../../services/store.service';
 


@Component({
  selector: 'app-apikey-create',
  templateUrl: './apikey-create.component.html',
  styleUrls: ['./apikey-create.component.css'],
  imports:[ReactiveFormsModule],  
  standalone: true
})
export class ApikeyCreateComponent {

 
  apiKeyForm: FormGroup;
  permissionOptions = Object.values(Permission);
  selectedPermissions: Permission[] = [];
  createdApiKey: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private apiKeyService: ApiKeyService,
    private storeService: StoreService
  ) {
    this.apiKeyForm = this.fb.group({
      userId: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  onPermissionChange(event: any) {
    const permission = event.target.value as Permission;
    if (event.target.checked) {
      this.selectedPermissions.push(permission);
    } else {
      this.selectedPermissions = this.selectedPermissions.filter(p => p !== permission);
    }
  }

  onSubmit() {
    if (this.apiKeyForm.valid && this.selectedPermissions.length > 0) {
      const userId = this.apiKeyForm.get('userId')?.value;      
      if (userId) {
       

        this.apiKeyService.createApiKey(userId, this.selectedPermissions)
          .subscribe({
            next: (response: ApiKeyResponse) => {
              this.createdApiKey = response.key;
              this.errorMessage = null;
              const apikeymodel: ApiKeyModel = {
                ...response, userId
              }
              this.storeService.setApiKey(apikeymodel);
            },
            error: (err) => {
              this.errorMessage = err.error?.message || 'Failed to create API key';
              this.createdApiKey = null;
            }
          });
      }
    }
  }

}
