import { Component, OnInit } from '@angular/core'
import { type Observable } from 'rxjs'
import { type Breadcrumb } from 'src/app/models/breadcrumb'
import { type BreadcrumbService } from '../../../services/breadcrumb.service'

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent {
  breadcrumbs$: Observable<Breadcrumb[]>

  constructor (private readonly breadcrumbService: BreadcrumbService) {
    breadcrumbService.createBreadcrumbs()
    this.breadcrumbs$ = breadcrumbService.breadcrumbs$
  }
}
