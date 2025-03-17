import { Component, effect, OnInit, signal, ViewChild } from '@angular/core';
import { User, UserService } from '../../core/services/user.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { AuthService } from '../../core/services/auth.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserModule } from '@angular/platform-browser';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UserdDetailsComponent } from '../userd-details/userd-details.component';
import { HighlightDirective } from '../../common/directives/highlight.directive';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatPaginatorModule,
    MatPaginatorModule,  // <-- Add this here
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    HighlightDirective,
    MatButtonModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  displayedColumns = ['id', 'name', 'username', 'email', 'company'];
  dataSource = new MatTableDataSource<User>([]);
  // users: User[] = [];
  // selectedUser = signal<User | null>(null);
  searchText = signal<string>('');
  isLoading = signal(true);
  originalData: any[] = []
  filteredData: any[] = []
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  private searchSub = new Subject<any>();
  constructor(
    private userService: UserService,
    public authService: AuthService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadUsers();

    this.searchSub.pipe(
      debounceTime(500),
      distinctUntilChanged(),
    ).subscribe((data) => {
      this.applyFilter(data)
    })
  }

  ngAfterViewInit() {
    // Check if paginator is not null before setting it
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
      this.paginator._intl.itemsPerPageLabel = 'Users per page:';
      this.paginator.pageSize = 5;
    }
  }

  loadUsers(): void {
    this.isLoading.set(true);
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.originalData = users;  // Initially set filtered data to all users
        this.dataSource.data = this.originalData;  // Assign filtered data to the table
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error loading users', error);
        this.isLoading.set(false);
      }
    });
  }

  applyFilter(event: Event): void {
    const filterValue = this.searchText();
    const filteredusers = this.originalData.filter(user =>
      Object.values(user).some((val: any) =>
        val.toString().toLowerCase().includes(filterValue.toLowerCase())
      )
    );

    this.dataSource.data = filteredusers;  // Update the data source with filtered data

    if (this.paginator) {
      this.paginator.firstPage();  // Reset to the first page after filtering
    }
  }

  onSearchChange(event: any): void {
    this.searchSub.next(event.target.value); // Trigger the debounced search
  }

  onPageChange(event: any): void {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.filteredData = this.dataSource.data.slice(startIndex, endIndex);
  }

  selectUser(user: User): void {
    // this.selectedUser.set(user);
    this.dialog.open(UserdDetailsComponent, {
      width: 'auto',
      height: 'auto',
      data: user
    })
  }

  logout(): void {
    this.authService.logout();
  }
}
