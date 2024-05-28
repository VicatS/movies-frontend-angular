import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ClassificationService {
  private classifications: string[] = [
    'G(General Audience)',
    'PG(Parental Guidance Suggested)',
    'PG-13(Parents Strongly Cautioned)',
    'R(Restricted)',
    'NC-17(Adults Only)',
  ];

  constructor() {}

  getClassifications(): string[] {
    return this.classifications;
  }
}
