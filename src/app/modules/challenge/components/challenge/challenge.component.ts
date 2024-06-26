import { Component, type OnDestroy, type OnInit, inject } from '@angular/core'
import { ActivatedRoute, Router, type ParamMap } from '@angular/router'
import { type Subscription } from 'rxjs'
import { Challenge } from '../../../../models/challenge.model'
import { ChallengeService } from '../../../../services/challenge.service'
import { type ChallengeDetails } from 'src/app/models/challenge-details.model'
import { type SolutionResults } from 'src/app/models/solution-results.model'
import { type Resource } from 'src/app/models/resource.model'
import { type Example } from 'src/app/models/challenge-example.model'
import { type Language } from 'src/app/models/language.model'

@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.scss']
})
export class ChallengeComponent implements OnInit, OnDestroy {
  idChallenge: string = ''
  params$!: Subscription
  challenge!: Challenge
  challengeSubs$!: Subscription
  dataChallenge!: Challenge
  title: string = ''
  creation_date!: Date
  level = ''
  detail!: ChallengeDetails
  related: string[] = []
  resources: Resource[] = []
  solutions: SolutionResults[] = []
  description: string = ''
  examples: Example[] = []
  notes: string = ''
  popularity!: number
  languages: Language[] = []
  activeId: number = 1

  private readonly route = inject(ActivatedRoute)
  private readonly router = inject(Router)
  private readonly challengeService = inject(ChallengeService)

  ngOnInit (): void {
    console.log('ngOnInit ChallengeComponent')

    this.params$ = this.route.paramMap.subscribe((params: ParamMap) => {
      this.idChallenge = params.get('idChallenge') ?? ''
      this.loadMasterData(this.idChallenge)
      this.activeId = 1
      console.log(this.activeId)
    })
  }

  ngOnDestroy (): void {
    console.log('ngOnDestroy ChallengeComponent')

    if (this.params$ !== undefined) this.params$.unsubscribe()
    if (this.challengeSubs$ !== undefined) this.challengeSubs$.unsubscribe()
  }

  onActiveIdChange (newActiveId: number): void {
    this.activeId = newActiveId
  }

  loadMasterData (id: string): void {
    this.challengeSubs$ = this.challengeService.getChallengeById(id).subscribe((challenge) => {
      this.challenge = new Challenge(challenge)
      this.title = this.challenge.challenge_title
      this.creation_date = this.challenge.creation_date
      this.level = this.challenge.level
      this.detail = this.challenge.detail
      this.description = this.challenge.detail.description
      this.examples = this.challenge.detail.examples
      this.notes = this.challenge.detail.notes
      this.popularity = this.challenge.popularity
      this.languages = this.challenge.languages
    })
  }
}
