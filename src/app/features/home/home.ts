import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideLogIn, lucidePlus } from '@ng-icons/lucide';

@Component({
  selector: 'app-home',
  imports: [ReactiveFormsModule, NgIcon],
  providers: [provideIcons({ lucidePlus, lucideLogIn })],
  templateUrl: './home.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  private readonly router = inject(Router);
  protected readonly roomCode = new FormControl('', { nonNullable: true });

  protected createRoom(): void {
    // TODO: generate room ID and navigate
  }

  protected joinRoom(): void {
    const code = this.roomCode.value.trim();
    if (code) {
      this.router.navigate(['/room', code]);
    }
  }
}
