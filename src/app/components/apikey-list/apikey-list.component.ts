import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiKeyModel, ApiKeyResponse } from '../../models/apikey.model';
import { ApiKeyService } from '../../services/apikey.service';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-apikey-list',
  templateUrl: './apikey-list.component.html',
  styleUrls: ['./apikey-list.component.css'],
  imports: [CommonModule],
  standalone: true
})
export class ApikeyListComponent implements OnInit {

  apiKeys: ApiKeyResponse[] = [];
  apiKeyModelArray = this.storeService.getApiKey();

  constructor(private apiKeyService: ApiKeyService,
    private storeService: StoreService
  ) { 
  }

  ngOnInit() {
    this.loadApiKeys();
  }


  loadApiKeys() {
    const apikey = this.storeService.apiKeyModel$.getValue()[0];
    const userId = apikey.userId;
    this.apiKeyService.getUserTokens(userId).subscribe({
      next: (keys) => {
        const resp = keys.map(k => ({ ...k, userId } as ApiKeyModel));
        this.storeService.setApiKeys(resp);
      },      
      error: (err) => console.error('Failed to load API keys', err)
    });
  }

  revokeApiKey(apiKeyId: string) {
    this.apiKeyService.revokeApiKey(apiKeyId).subscribe({
      next: () => this.loadApiKeys(),
      error: (err) => console.error('Failed to revoke API key', err)
    });
  }

}
