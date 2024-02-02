import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent {
  @Output() searchUser = new EventEmitter<string>();

  onSearch(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchUser.emit(target.value);
  }
}
