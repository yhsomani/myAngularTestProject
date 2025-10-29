export class Question {
  _id!: string;
  question!: string;
  answer!: string;
  showAnswer?: boolean; // <-- This line fixes the 'showAnswer' error
}

export class TechnologyTopic {
  _id!: string;
  name!: string;
  questions!: Question[];
}
