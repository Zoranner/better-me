export type ThemeMode = 'light' | 'dark' | 'system'
export type Language = 'zh-CN' | 'en-US'

export interface GeneralSettings {
  language: Language;
  theme: ThemeMode;
}

export interface UserSettings {
  name: string;
  avatar: string;
  gender: 'male' | 'female' | 'other';
  birthDate: string;
}

export interface ModelSettings {
  language: {
    provider: string;
    model: string;
    apiKey: string;
    apiEndpoint: string;
  };
  embedding: {
    provider: string;
    model: string;
    apiKey: string;
    apiEndpoint: string;
  };
}

export interface DataSettings {
  vectorDb: {
    type: 'milvus' | 'qdrant' | 'pinecone';
    endpoint: string;
    apiKey?: string;
    collection: string;
  };
}

export interface Settings {
  general: GeneralSettings;
  user: UserSettings;
  model: ModelSettings;
  data: DataSettings;
} 