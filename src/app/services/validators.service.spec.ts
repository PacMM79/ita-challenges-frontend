import { TestBed } from '@angular/core/testing'

import { ValidatorsService } from './validators.service'
import { TranslateModule } from '@ngx-translate/core'

describe('ValidatorsService', () => {
  let service: ValidatorsService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()]
    }).compileComponents()
    service = TestBed.inject(ValidatorsService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should have correct email pattern', () => {
    expect(service.emailPattern).toEqual('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$')
  })
})
