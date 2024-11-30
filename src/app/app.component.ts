import { Component, inject } from '@angular/core';
import { ApikeyCreateComponent } from './components/apikey-create/apikey-create.component';
import { ApikeyListComponent } from './components/apikey-list/apikey-list.component';
import { ApikeyAuthComponent } from './components/apikey-auth/apikey-auth.component';
import { ApiKeyService } from './services/apikey.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ApikeyCreateComponent, ApikeyListComponent, ApikeyAuthComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'apikey-ui';
  apiKeyService = inject(ApiKeyService);
  userId!: string;
  constructor() {
  }

  onUserIdChange(userId: string){
    this.userId = userId;
  }
}
