import { Injectable } from '@angular/core';
import { ToDoTask } from '../models/task.model';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiConstants } from '../constants/api.constants';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  public taskList: ToDoTask[] = [];
  constructor(private http: HttpClient) { }

  setTaskDetails(formData: ToDoTask): Observable<number[]> { 
    return this.http.post<number[]>(ApiConstants.postTask(), formData, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

  getAllTasks(searchValue?: string): Observable<ToDoTask[]> {
    if (searchValue && searchValue.trim()) {            
      return this.http.get<ToDoTask[]>(ApiConstants.getAllTasks())
      .pipe(map((tasks: ToDoTask[]) => tasks.filter((task: ToDoTask) =>     
      task.taskName.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      task.priority.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      task.taskDescription.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())          
    )));      
    }
    return this.http.get<ToDoTask[]>(ApiConstants.getAllTasks());
  }

  deleteTask(id: number): Observable<number[]> {      
    return this.http.delete<number[]>(`${ApiConstants.deleteTask()}/${id}`);
  }
}
