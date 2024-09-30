import { Component, inject } from '@angular/core';
import {
  collection,
  Firestore,
  getDoc,
  onSnapshot,
  doc,
} from '@angular/fire/firestore';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [MatCardModule, MatIconModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss',
})
export class UserDetailComponent {
  public userId: any = '';
  firestore: Firestore = inject(Firestore);
  unsub;
  userData: any = {};

  constructor(private route: ActivatedRoute) {
    this.unsub = this.readUserdata();
  }

  ngOnDestroy(): void {
    this.unsub();
  }

  readUserdata() {
    this.userId = this.route.snapshot.paramMap.get('id');
    return onSnapshot(this.singleUserRef('users', this.userId), (element) => {
      console.log(element.data());
    });
  }

  singleUserRef(colId: string, docId: string) {
    return doc(collection(this.firestore, colId), docId);
  }
}
