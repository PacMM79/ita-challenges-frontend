import { Component } from '@angular/core'
import { LoginModalComponent } from '../login-modal/login-modal.component'
import { RegisterModalComponent } from '../register-modal/register-modal.component'
import { type NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { type Router } from '@angular/router'

@Component({
  selector: 'app-restricted-modal',
  templateUrl: './restricted-modal.component.html',
  styleUrls: ['./restricted-modal.component.scss']
})
export class RestrictedModalComponent {
  constructor (private readonly modalService: NgbModal, private readonly router: Router) {}

  closeModal (): void {
    this.modalService.dismissAll()
    // this.router.navigateByUrl('/');)
  }

  openLoginModal (): void {
    this.closeModal()
    this.modalService.open(LoginModalComponent, { centered: true, size: 'lg' })
  }

  openRegisterModal (): void {
    this.closeModal()
    this.modalService.open(RegisterModalComponent, { centered: true, size: 'lg' })
  }
}
