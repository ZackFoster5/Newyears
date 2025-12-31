export interface GeneratedContent {
  headline: string;
  message: string;
  signoff: string;
}

export interface GreetingData {
  name: string;
  memories: string;
  tone: 'heartfelt' | 'poetic' | 'cheerful';
}

export enum AppState {
  INTRO = 'INTRO',
  GENERATING = 'GENERATING',
  CARD = 'CARD',
}