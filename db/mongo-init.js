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
          text: "Tabs",
          isCorrect: false,
        },
        {
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
          text: "That's a ridiculous question",
          isCorrect: false,
        },
        {
          text: "Black bear",
          isCorrect: true,
        },
        {
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
          url: "https://static.wikia.nocookie.net/stormlightarchive/images/c/c3/B4_decal_navy_73162.1392137430.900.900.jpg/revision/latest/scale-to-width-down/250?cb=20140506011016",
        },
      },
      answers: [
        {
          text: "Egyptian Hieroglyph",
          isCorrect: false,
        },
        {
          text: "Bridge 4",
          isCorrect: true,
        },
        {
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
