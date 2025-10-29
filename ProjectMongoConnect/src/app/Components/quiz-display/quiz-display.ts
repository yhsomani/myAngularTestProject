import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../Services/api-service';
import { Quiz } from '../../Modules/Quize';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-quiz-display',
  standalone: false, // <-- ADD THIS LINE
  templateUrl: './quiz-display.html',
  styleUrls: ['./quiz-display.css']
})
export class QuizDisplay implements OnInit {
  // ... (rest of the file is the same as before) ...

  private allQuizzes$ = new BehaviorSubject<Quiz[]>([]);
  private currentIndex$ = new BehaviorSubject<number>(0);

  public currentQuiz$: Observable<Quiz | undefined>;
  public currentIndexObservable$: Observable<number> = this.currentIndex$.asObservable();
  public totalCount$: Observable<number>;

  public showAnswer = false;

  constructor(private apiService: ApiService) {
    this.totalCount$ = this.allQuizzes$.pipe(
      map(quizzes => quizzes.length),
      shareReplay(1)
    );

    this.currentQuiz$ = combineLatest([
      this.allQuizzes$,
      this.currentIndex$
    ]).pipe(
      map(([quizzes, index]) => quizzes[index]),
      shareReplay(1)
    );
  }

  ngOnInit() {
    this.apiService.getQuizes().subscribe({
      next: (quizzes: Quiz[]) => { // <-- FIX 1: Add 'Quiz[]' type
        this.allQuizzes$.next(quizzes);
        this.currentIndex$.next(0);
      },
      error: (err: any) => console.error('Error fetching quizzes:', err) // <-- FIX 2: Add ': any' type
    });
  }

  next() {
    const currentIndex = this.currentIndex$.value;
    const total = this.allQuizzes$.value.length;
    if (currentIndex < total - 1) {
      this.currentIndex$.next(currentIndex + 1);
      this.showAnswer = false;
    }
  }

  previous() {
    const currentIndex = this.currentIndex$.value;
    if (currentIndex > 0) {
      this.currentIndex$.next(currentIndex - 1);
      this.showAnswer = false;
    }
  }

  toggleAnswer() {
    this.showAnswer = !this.showAnswer;
  }
}
