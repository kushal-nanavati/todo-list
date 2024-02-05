import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../shared/services/task.service';
import { Observable, Subscription, debounceTime, distinctUntilChanged, share, startWith, switchMap } from 'rxjs';
import { ToDoTask } from '../shared/models/task.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit, OnDestroy {
  open: boolean = false;
  title: string = 'Create New Task';
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
  subscription: Subscription = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private taskService: TaskService,
    private toastrService: ToastrService
  ) {}

  public ngOnInit(): void {
    this.initializeForm();
    this.subscription.add(
      this.searchForm.get('searchTerm').valueChanges.pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        startWith(''),
        switchMap((searchValue: string) =>
          this.taskService.getAllTasks(searchValue).pipe(share())
        )).subscribe((data: ToDoTask[]) => {
          console.log(data);          
          this.tasksList = data;
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
    this.taskService
      .setTaskDetails({ id: lastId + 1, ...this.modalForm.value })
      .subscribe((rowsAffected: number[]) => {
        if (rowsAffected.at(0) === 1) {
          this.toastrService.success('Data saved successfully...');
        }
      });

    this.selectedValue = this.modalForm.get('priority')?.value;
    this.modalForm.reset();
  }

  onPriorityChange(selectedValue: any) {
    this.selectedValue = selectedValue;
  }

  // onSearch(searchValue: KeyboardEvent) {
  //   const searchTerm = (searchValue.target as HTMLInputElement).value;
  //   console.log(this.searchForm.get('searchTerm').value);
  // }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
