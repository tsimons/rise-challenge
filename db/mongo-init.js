/* @type */
var seed = {
  user: {
    name: "Sisyphus",
  },
  questions: [
    {
      question: {
        text: "Tabs or spaces?",
        media: {
          type: "image",
          url: "https://miro.medium.com/max/960/0*rWvhTR1T46HOPSzO.gif",
        },
      },
      answers: [
        {
          _id: new ObjectId(),
          text: "Tabs",
          isCorrect: false,
        },
        {
          _id: new ObjectId(),
          text: "Spaces",
          isCorrect: true,
        },
      ],
      feedback: "Search your feelings, you know it to be true.",
    },
    {
      question: {
        text: "What kind of bear is best?",
        media: {
          type: "youtube",
          url: "https://www.youtube.com/watch?v=WaaANll8h18",
        },
      },
      answers: [
        {
          _id: new ObjectId(),
          text: "That's a ridiculous question",
          isCorrect: false,
        },
        {
          _id: new ObjectId(),
          text: "Black bear",
          isCorrect: true,
        },
        {
          _id: new ObjectId(),
          text: "Grizzly bear",
          isCorrect: false,
        },
      ],
      feedback: "Identity theft isn't a joke Jim!",
    },
    {
      question: {
        text: "What does this symbol represent?",
        media: {
          type: "image",
          url: "/bridge-4.jpg",
        },
      },
      answers: [
        {
          _id: new ObjectId(),
          text: "Egyptian Hieroglyph",
          isCorrect: false,
        },
        {
          _id: new ObjectId(),
          text: "Bridge 4",
          isCorrect: true,
        },
        {
          _id: new ObjectId(),
          text: "I give up",
          isCorrect: false,
        },
      ],
      feedback:
        'This is the symbol representing Bridge 4 from the book series, "The Stormlight Archives"',
    },
  ],
};

db["knowledge-check"].insertMany(seed.questions);
db.user.insert(seed.user);

db = new Mongo().getDB("admin");

db.createUser({
  user: "knowledgecheck",
  pwd: "pass",
  roles: [
    {
      role: "dbOwner",
      db: "knowledge-check",
    },
  ],
});
