import { Component, inject } from '@angular/core';
import {
  collection,
  Firestore,
  getDoc,
  onSnapshot,
  doc,
  deleteDoc,
} from '@angular/fire/firestore';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { User } from '../../../models/user.class';
import { MatButtonModule } from '@angular/material/button';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
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
  userData: User = new User();

  constructor(private route: ActivatedRoute) {
    this.unsub = this.readUserdata();
  }

  ngOnDestroy(): void {
    this.unsub();
  }

  readUserdata() {
    this.userId = this.route.snapshot.paramMap.get('id');
    return onSnapshot(this.singleUserRef('users', this.userId), (element) => {
      this.userData = new User(element.data());
    });
  }

  singleUserRef(colId: string, docId: string) {
    return doc(collection(this.firestore, colId), docId);
  }

  openDeleteUserDialog() {
    const deleteUserDialog = this.dialog.open(DialogDeleteUserComponent);
    deleteUserDialog.componentInstance.userId = this.userId;
  }

  openEditUserDialog() {
    const editUserDiealog = this.dialog.open(DialogEditUserComponent);
    editUserDiealog.componentInstance.user = new User(this.userData.toJson());
    editUserDiealog.componentInstance.userId = this.userId;
  }
}
