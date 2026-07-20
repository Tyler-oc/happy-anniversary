// Each option votes +1 for a destination. Whichever destination has the most
// votes across the 3 questions wins (3 votes total → never a tie).
const questions = [
  {
    id: 1,
    prompt: "What is your favorite movie?",
    options: [
      { text: "2001: A Space Odyssey", vote: "telluride" },
      { text: "Norbit", vote: "sandiego" },
      { text: "Norbert", vote: "sandiego" },
      { text: "2001: A Space Odyssey", vote: "telluride" },
    ],
    image: null,
  },
  {
    id: 2,
    prompt: "What is your dream vacation destination?",
    options: [
      { text: "Arby's", vote: "telluride" },
      { text: "Frisco", vote: "telluride" },
      { text: "Butt, Montana", vote: "sandiego" },
      { text: "The place where the water meets the sky meets dirt", vote: "sandiego" },
    ],
    image: null,
  },
  {
    id: 3,
    prompt: "Who is your celebrity crush?",
    options: [
      { text: "Garfield", vote: "sandiego" },
      { text: "Curious George", vote: "telluride" },
      { text: "Sid the Science Kid", vote: "telluride" },
      { text: "Obama", vote: "sandiego" },
    ],
    image: null,
  },
];

export default questions;
