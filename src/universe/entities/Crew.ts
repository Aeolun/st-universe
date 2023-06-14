export class Crew {
  required: number

  constructor(data: {
    required: number
  }) {
    this.required = data.required
  }
}