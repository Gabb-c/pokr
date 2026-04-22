import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-room',
  templateUrl: './room.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomComponent {
  readonly id = input.required<string>();
}
