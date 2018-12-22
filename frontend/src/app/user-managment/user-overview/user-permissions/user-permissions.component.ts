import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatAutocomplete, MatChipInputEvent, MatAutocompleteSelectedEvent } from '@angular/material';
import { startWith, map } from 'rxjs/operators';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { User } from 'src/app/auth/auth.service';
import { PERMISSIONS } from 'src/app/auth/permission/authorization.types';


@Component({
  selector: 'app-user-permissions',
  templateUrl: './user-permissions.component.html',
  styleUrls: ['./user-permissions.component.css']
})
export class UserPermissionsComponent implements OnInit {

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  permCtrl = new FormControl();
  filteredPerms: Observable<string[]>;
  perms: string[] = ['EDIT'];
  allPerms: string[] = Object.keys(PERMISSIONS);

  @Input() permissions: string[];
  @Output() permsUpdated = new EventEmitter();

  @ViewChild('permInput') permInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor() {
    this.filteredPerms = this.permCtrl.valueChanges.pipe(
        startWith(null),
        map((perm: string | null) => perm ? this._filter(perm) : this.allPerms.slice()));
  }

  ngOnInit() {

  }

  add(event: MatChipInputEvent): void {
    // Add permission only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      // Add permission
      if ((value || '').trim() && !this.permissions.includes(value) && this.allPerms.includes(value)) {
        this.permissions.push(value.trim());
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }

      this.permCtrl.setValue(null);

      this.permsUpdated.emit(this.permissions);
    }
  }

  remove(fruit: string): void {
    const index = this.permissions.indexOf(fruit);

    if (index >= 0) {
      this.permissions.splice(index, 1);
      this.permsUpdated.emit(this.permissions);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const value = event.option.viewValue;

    if (!this.permissions.includes(value)) {
      this.permissions.push(value);
      this.permsUpdated.emit(this.permissions);
    }

    this.permInput.nativeElement.value = '';
    this.permCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allPerms.filter(perm => {
      return perm.toLowerCase().indexOf(filterValue) === 0
    });
  }

}
