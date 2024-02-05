import { Injectable } from '@angular/core';
import { ToDoTask } from '../models/task.model';
import { BehaviorSubject, Observable, filter, of, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiConstants } from '../constants/api.constants';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  public taskSubject: BehaviorSubject<ToDoTask[]> = new BehaviorSubject<ToDoTask[]>([]);
  public taskList: ToDoTask[] = [];
  constructor(private http: HttpClient) { }

  setTaskDetails(formData: ToDoTask): Observable<number[]> { 
    return this.http.post<number[]>(ApiConstants.postTask(), formData, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

  getAllTasks(searchValue?: string): Observable<ToDoTask[]> {
    if (searchValue && searchValue.trim()) {            
      return this.http.get<ToDoTask[]>(ApiConstants.getAllTasks()+`?searchTerm=${searchValue}`)
      .pipe(tap((tasks: ToDoTask[]) => tasks.filter((task: ToDoTask) =>     
      task.taskName.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())     
    )));      
    }
    return this.http.get<ToDoTask[]>(ApiConstants.getAllTasks());
  }
}
