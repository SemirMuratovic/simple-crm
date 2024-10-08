import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogModule,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { RouterLink } from '@angular/router';
import { collection, Firestore, doc, deleteDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-dialog-delete-user',
  standalone: true,
  imports: [
    MatDialogModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatButtonModule,
    RouterLink,
  ],
  templateUrl: './dialog-delete-user.component.html',
  styleUrl: './dialog-delete-user.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogDeleteUserComponent {
  firestore: Firestore = inject(Firestore);
  public userId: any = '';

  constructor(public dialogRef: MatDialogRef<DialogDeleteUserComponent>) {}

  onNoClick() {
    this.dialogRef.close();
  }

  deleteUser() {
    deleteDoc(this.singleUserRef('users', this.userId));
    this.dialogRef.close();
  }

  singleUserRef(colId: string, docId: string) {
    return doc(collection(this.firestore, colId), docId);
  }
}
