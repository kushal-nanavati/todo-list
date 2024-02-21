import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../shared/services/task.service';
import { Subscription, concatMap, debounceTime, distinctUntilChanged, share, startWith, switchMap } from 'rxjs';
import { ToDoTask } from '../shared/models/task.model';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from '../shared/services/users.service';
import { LoggedInUsers } from '../shared/models/users.model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit, OnDestroy {
  open: boolean = false;
  openPopup: boolean = false;
  optionsDropdown: boolean = false;
  selectedTaskId: number;
  createTitle: string = 'Create New Task';
  deleteTitle: string = 'Delete Task';
  modalForm: FormGroup = this.formBuilder.group({
    taskName: [
      '',
      [Validators.required, Validators.minLength(5), Validators.maxLength(30)],
    ],
    priority: [''],
    taskDescription: ['', Validators.required],
  });
  isDropdownOpen: boolean = false;
  selectedValue: string = '';
  priorityLevels: string[] = ['HIGH', 'MEDIUM', 'LOW'];
  searchForm: FormGroup;
  tasksList: ToDoTask[];
  loggedInUser: LoggedInUsers;
  subscription: Subscription = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private taskService: TaskService,
    private toastrService: ToastrService,
    private usersService: UsersService
  ) {}

  public ngOnInit(): void {
    this.initializeForm();
    this.subscription.add(
      this.usersService.authenticatedUser$.subscribe((authenticatedUser: LoggedInUsers) => {
        this.loggedInUser = authenticatedUser;
      })
    );
    this.subscription.add(
      this.usersService.isAuthenticated$.asObservable().subscribe((isAuthenticated: boolean) => {
        if(isAuthenticated) {
          this.subscription.add(
            this.searchForm.get('searchTerm').valueChanges.pipe(
              debounceTime(20),
              distinctUntilChanged(),
              startWith(''),
              switchMap((searchValue: string) =>
                this.taskService.getAllTasks(searchValue).pipe(share())
              )).subscribe((data: ToDoTask[]) => {                    
                this.tasksList = data;
              })
          );
        }
      })
    );        
  }

  public initializeForm(): void {
    this.searchForm = this.formBuilder.group({
      searchTerm: new FormControl(''),
    });
  }

  onSubmitTaskForm(): void {
    this.open = false;
    let lastId: number;
    if (!this.tasksList.length) {
      lastId = 0;
    } else {
      lastId = this.tasksList?.reduce((accumulator, currentValue) => {
        return accumulator.id > currentValue.id ? accumulator : currentValue;
      }).id;
    }
    this.subscription.add(
    this.taskService
      .setTaskDetails({ id: lastId + 1, ...this.modalForm.value })
      .pipe(concatMap((rowsAffected: number[]) => {
        if(rowsAffected.at(0) === 1) {
          this.toastrService.success('Task saved successfully...');          
        }
        return this.taskService.getAllTasks();
      })).subscribe((data: ToDoTask[]) => {
        this.tasksList = data;
      }));

    this.selectedValue = this.modalForm.get('priority')?.value;
    this.modalForm.reset();
  }

  onPriorityChange(selectedValue: any) {
    this.selectedValue = selectedValue;
  }

  deleteModalPopup(id: number): void {
    this.openPopup = true;
    this.selectedTaskId = id;
  }

  deleteTask(id: number) {
    if (this.openPopup) {
      this.subscription.add(
      this.taskService.deleteTask(id).pipe(concatMap((rowsAffected: number[]) => {
        if(rowsAffected.at(0) === 1) {
          this.toastrService.success('Task deleted successfully...');
          this.openPopup = false;
        }
        return this.taskService.getAllTasks();
      })).subscribe((data: ToDoTask[]) => {
        this.tasksList = data;
      }));
    }
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
