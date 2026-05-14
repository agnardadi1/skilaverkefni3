interface AnswerOption {
  answerText: string;
  isCorrect: boolean;
}

interface Question {
  questionText: string;
  answerOptions: AnswerOption[];
}

export const questions: Question[] = [
  {
    questionText: "Hvaða lið á flesta NBA titla sögunnar (ásamt Celtics)?",
    answerOptions: [
      { answerText: "Golden State Warriors", isCorrect: false },
      { answerText: "Miami Heat", isCorrect: false },
      { answerText: "Los Angeles Lakers", isCorrect: true },
      { answerText: "Chicago Bulls", isCorrect: false },
    ],
  },
  {
    questionText: "Hver er besti leikmaður allra tíma (GOAT) að mati flestra?",
    answerOptions: [
      { answerText: "Michael Jordan", isCorrect: false },
      { answerText: "LeBron James", isCorrect: true },
      { answerText: "Kobe Bryant", isCorrect: false },
      { answerText: "Maggi Mix", isCorrect: false },
    ],
  },
  {
    questionText: "Hvaða leikmaður á flest triple-double í sögu NBA?",
    answerOptions: [
      { answerText: "Oscar Robertson", isCorrect: false },
      { answerText: "Nikola Jokic", isCorrect: false },
      { answerText: "Russell Westbrook", isCorrect: true },
      { answerText: "Magic Johnson", isCorrect: false },
    ],
  },
  {
    questionText:
      "Hvaða leikmaður hefur unnið flesta NBA titla sem leikmaður (11 talsins)?",
    answerOptions: [
      { answerText: "Bill Russell", isCorrect: true },
      { answerText: "Sam Jones", isCorrect: false },
      { answerText: "Robert Horry", isCorrect: false },
      { answerText: "Kareem Abdul-Jabbar", isCorrect: false },
    ],
  },
  {
    questionText:
      "Hvaða leikmaður hefur spilað flest tímabil í NBA sögunni (22 tímabil)?",
    answerOptions: [
      { answerText: "LeBron James", isCorrect: true },
      { answerText: "Vince Carter", isCorrect: false },
      { answerText: "Kevin Garnett", isCorrect: false },
      { answerText: "Dirk Nowitzki", isCorrect: false },
    ],
  },
  {
    questionText:
      "Hver er stærsti (hæsti) leikmaður sem hefur spilað í deildinni (7'7\")?",
    answerOptions: [
      { answerText: "Yao Ming", isCorrect: false },
      { answerText: "Shaquille O'Neal", isCorrect: false },
      { answerText: "Manute Bol", isCorrect: true },
      { answerText: "Victor Wembanyama", isCorrect: false },
    ],
  },
  {
    questionText:
      "Hvaða lið á metið yfir besta árangur á einu tímabili (73-9)?",
    answerOptions: [
      { answerText: "Chicago Bulls (1995-96)", isCorrect: false },
      { answerText: "Golden State Warriors (2015-16)", isCorrect: true },
      { answerText: "Los Angeles Lakers (1971-72)", isCorrect: false },
      { answerText: "Boston Celtics (1985-86)", isCorrect: false },
    ],
  },
  {
    questionText:
      "Hvað er oft kallað versta trade (skipti) sem hefur farið fram í NBA?",
    answerOptions: [
      { answerText: "Lakers fær Pau Gasol", isCorrect: false },
      { answerText: "Nets fær Garnett og Pierce frá Celtics", isCorrect: true },
      { answerText: "Bucks skiptir Dirk Nowitzki", isCorrect: false },
      { answerText: "Harden fer til Rockets", isCorrect: false },
    ],
  },
  {
    questionText:
      "Hvaða tvíeyki (duo) er talið það sigursælasta í sögu NBA með 6 meistaratitla á 8 árum?",
    answerOptions: [
      { answerText: "Shaquille O'Neal og Kobe Bryant", isCorrect: false },
      { answerText: "Michael Jordan og Scottie Pippen", isCorrect: true },
      { answerText: "Magic Johnson og Kareem Abdul-Jabbar", isCorrect: false },
      { answerText: "Larry Bird og Kevin McHale", isCorrect: false },
    ],
  },
  {
    questionText: "Er þetta gott quiz?",
    answerOptions: [
      { answerText: "Heldur betur!", isCorrect: true },
      { answerText: "Alls ekki félagi!", isCorrect: false },
    ],
  },
];
