export class FilterChallenge {
  languages: string[]
  levels: string[]
  progress: number[]

  constructor (element: any) {
    this.languages = element.id_language
    this.levels = element.id_language
    this.progress = element.id_language
  }
}
