import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  @Output() cancelRegister = new EventEmitter<boolean>();
  model: any = {};

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
  }

  register() {
    console.log(this.model);
    this.accountService.register(this.model).subscribe({
      next: () => this.cancel(),
      error: error => console.log(error)
    })
  }

  cancel() {
    console.log('cancelled');
    this.cancelRegister.emit(false);
  }
}
