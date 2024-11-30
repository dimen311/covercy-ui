import { Permission } from "./permission.enum";

export interface ApiKeyResponse {
    id: string;
    key: string;
    permissions: Permission[];
    createdAt: Date;
    lastUsedAt?: Date;
    isRevoked: boolean;
  }

  export interface CreateApiKeyRequest {
    userId: string;
    permissions: Permission[];
  }

 export interface ApiKeyModel extends ApiKeyResponse {
  userId: string;
 }