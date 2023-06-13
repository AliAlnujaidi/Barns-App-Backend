import { Injectable } from '@nestjs/common';

@Injectable()
export class EvaluationsService {
  private evaluations = [
    { id: 1, review: 'good' },
    { id: 2, review: 'bad' },
  ];
  getEvaluations(id) {
    if (id) {
      return this.evaluations.filter((evaluation) => evaluation.id == id);
    }
    return this.evaluations;
  }
}
