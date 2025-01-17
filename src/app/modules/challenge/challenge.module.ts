import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SharedComponentsModule } from '../../shared/components/shared-components.module'
import { ChallengeHeaderComponent } from './components/challenge-header/challenge-header.component'
import { ChallengeInfoComponent } from './components/challenge-info/challenge-info.component'
import { ChallengeComponent } from './components/challenge/challenge.component'
import { ChallengeRoutingModule } from './challenge-routing.module'
import { CoreModule } from 'src/app/core/core.module'
import { RouterModule } from '@angular/router'
import { ModalsModule } from '../modals/modals.module'
import { TranslateModule } from '@ngx-translate/core'
import { FormsModule } from '@angular/forms'
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap'
import { AuthService } from 'src/app/services/auth.service'
import { DynamicTranslatePipe } from '../../pipes/dynamic-translate.pipe'

@NgModule({
  declarations: [
    ChallengeHeaderComponent,
    ChallengeInfoComponent,
    ChallengeComponent
  ],
  providers: [AuthService],
  imports: [
    CommonModule,
    SharedComponentsModule,
    CoreModule,
    ChallengeRoutingModule,
    RouterModule,
    ModalsModule,
    TranslateModule,
    FormsModule,
    NgbNavModule,
    DynamicTranslatePipe
  ]
})
export class ChallengeModule {}
