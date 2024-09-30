import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from './dialog-add-user/dialog-add-user.component';
import { MatCardModule } from '@angular/material/card';
import {
  Firestore,
  collection,
  addDoc,
  onSnapshot,
  doc,
  getDocs,
  collectionData,
} from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatDialogModule,
    MatCardModule,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent {
  readonly dialog = inject(MatDialog);
  firestore: Firestore = inject(Firestore);
  unsub;
  allUserData: any[] = [];

  constructor() {
    this.unsub = this.readUserData();
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }

  ngOnDestroy(): void {
    this.unsub();
  }

  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }

  readUserData() {
    return onSnapshot(collection(this.firestore, 'users'), (list) => {
      this.allUserData = [];
      list.forEach((element) => {
        this.allUserData.push(this.setUserObject(element.data(), element.id));
      });
    });
  }

  setUserObject(obj: any, id: string) {
    return {
      id: id,
      firstName: obj.firstName || '',
      lastName: obj.lastName || '',
      eMail: obj.eMail || '',
      birthDate: obj.birthDate || '',
      street: obj.street || '',
      zipCode: obj.zipCode || '',
      city: obj.city || '',
    };
  }
}
