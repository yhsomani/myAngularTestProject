import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../Services/api-service';
import { Technology } from '../../Modules/Technology';
import { TechnologyTopic, Question } from '../../Modules/TechnologyTopic';
import { Observable, BehaviorSubject, combineLatest, map } from 'rxjs';

@Component({
  selector: 'app-tech-quiz',
  standalone: false,
  templateUrl: './tech-quiz.html',
  styleUrls: ['./tech-quiz.css']
})
export class TechQuiz implements OnInit {

  // Observable for the list of technology names (for the buttons)
  public technologies$: Observable<Technology[]>;

  // --- State for the selected quiz ---
  // Subject to hold the *full topic* (name + questions)
  private topic$ = new BehaviorSubject<TechnologyTopic | null>(null);
  // Subject to hold the index of the current question
  private currentIndex$ = new BehaviorSubject<number>(0);

  // --- Observables for the template ---
  public currentQuestion$: Observable<Question | undefined>;
  public currentIndexObservable$: Observable<number> = this.currentIndex$.asObservable();
  public totalCount$: Observable<number>;
  public selectedTopicName$: Observable<string | null>;
  public showAnswer = false;

  constructor(private apiService: ApiService) {
    // 1. Get the list of all technologies for the nav buttons
    this.technologies$ = this.apiService.getTechnologies();

    // 2. Observable for the currently selected topic name
    this.selectedTopicName$ = this.topic$.pipe(
      map(topic => topic?.name ?? null)
    );

    // 3. Observable for the total question count in the current topic
    this.totalCount$ = this.topic$.pipe(
      map(topic => topic?.questions.length ?? 0)
    );

    // 4. Combine topic and index to get the single current question
    this.currentQuestion$ = combineLatest([
      this.topic$,
      this.currentIndex$
    ]).pipe(
      map(([topic, index]) => {
        return topic?.questions[index];
      })
    );
  }

  ngOnInit() { }

  // Called when a technology button is clicked
  selectTechnology(techName: string) {
    // Fetch the new topic from the API
    this.apiService.getQuestionsFor(techName).subscribe(topic => {
      // Set the new topic and reset the quiz
      this.topic$.next(topic);
      this.currentIndex$.next(0);
      this.showAnswer = false;
    });
  }

  // --- Navigation methods (from quiz-display) ---

  next() {
    const currentIndex = this.currentIndex$.value;
    const total = this.topic$.value?.questions.length ?? 0;

    if (currentIndex < total - 1) {
      this.currentIndex$.next(currentIndex + 1);
      this.showAnswer = false; // Hide answer on question change
    }
  }

  previous() {
    const currentIndex = this.currentIndex$.value;
    if (currentIndex > 0) {
      this.currentIndex$.next(currentIndex - 1);
      this.showAnswer = false; // Hide answer on question change
    }
  }

  toggleAnswer() {
    this.showAnswer = !this.showAnswer;
  }
}
