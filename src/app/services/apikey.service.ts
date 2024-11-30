import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { ApiKeyResponse, CreateApiKeyRequest } from '../models/apikey.model';
import { Permission } from '../models/permission.enum';

@Injectable({
  providedIn: 'root'
})
export class ApiKeyService {
  private apiUrl = 'http://localhost:5000/api/apikey';
  
 
  constructor(private http: HttpClient) {}

 

  createApiKey(userId: string, permissions: Permission[]): Observable<ApiKeyResponse> {
    const request: CreateApiKeyRequest = { userId, permissions };
    return this.http.post<ApiKeyResponse>(this.apiUrl, request);
  }

  authenticateWithApiKey(apiKey: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/authenticate`, JSON.stringify(apiKey), {
      headers: { 'Content-Type': 'application/json' }
    }
    );
  }

  revokeApiKey(apiKeyId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${apiKeyId}`);
  }

  getUserTokens(userId: string): Observable<ApiKeyResponse[]> {
    return this.http.get<ApiKeyResponse[]>(`${this.apiUrl}/${userId}`);
  }
} 