import { Component, inject } from '@angular/core';
import {
  collection,
  Firestore,
  onSnapshot,
  doc,
} from '@angular/fire/firestore';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { User } from '../../../models/user.class';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { DialogDeleteUserComponent } from '../dialog-delete-user/dialog-delete-user.component';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    RouterLink,
  ],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss',
})
export class UserDetailComponent {
  readonly dialog = inject(MatDialog);
  public userId: any = '';
  firestore: Firestore = inject(Firestore);
  unsub;
  unsubAll;
  userData: User = new User();

  constructor(private route: ActivatedRoute) {
    this.unsub = this.readUserdata();
    this.unsubAll = this.readAllUsers();
  }

  ngOnDestroy(): void {
    this.unsub();
    this.unsubAll();
  }

  readUserdata() {
    this.userId = this.route.snapshot.paramMap.get('id');
    return onSnapshot(this.singleUserRef('users', this.userId), (element) => {
      this.userData = new User(element.data());
    });
  }

  readAllUsers() {
    return onSnapshot(this.allUserRef(), (list) => {
      list.forEach((element) => {
        console.log(element);
      });
    });
  }

  singleUserRef(colId: string, docId: string) {
    return doc(collection(this.firestore, colId), docId);
  }

  allUserRef() {
    return collection(this.firestore, 'users');
  }

  openDeleteUserDialog() {
    const deleteUserDialog = this.dialog.open(DialogDeleteUserComponent);
    deleteUserDialog.componentInstance.userId = this.userId;
  }

  openEditUserDialog() {
    const editUserDialog = this.dialog.open(DialogEditUserComponent);
    editUserDialog.componentInstance.user = new User(this.userData.toJson());
    editUserDialog.componentInstance.userId = this.userId;
  }
}
