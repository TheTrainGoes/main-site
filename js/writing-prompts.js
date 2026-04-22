const PROMPTS = {
  k2: {
    narrative: [
      'Write a story about a puppy who learns to swim for the very first time.',
      'Tell about the best birthday party you can imagine. Who comes? What do you eat?',
      'Write a story about a little bear who got lost in the forest. How did the bear find home?',
      'Tell about a time you learned something new. Who helped you learn it?',
      'Write a story about a magic cloud that floated into your classroom one morning.',
      'Tell a story about two friends who found a treasure chest at the park.',
      'Write about a day when everything went perfectly. What happened?'
    ],
    descriptive: [
      'Describe your bedroom. What colors are in it? What do you keep there?',
      'Write about what it looks, sounds, and smells like at the beach.',
      'Describe your favorite food. What does it taste like? What does it look like?',
      'Write about what the playground looks like at your school.',
      'Describe what it feels like to play in the snow on a cold winter day.',
      'Describe your favorite animal. What does it look like? How does it move?',
      'Write about what a rainbow looks like and how it makes you feel.'
    ],
    opinion: [
      'What is the best pet to have? Tell two reasons why you think so.',
      'What is your favorite season? Give two reasons you like it best.',
      'Should kids have longer recess at school? Tell why or why not.',
      'What is the best after-school snack? Give two reasons.',
      'Would you rather have a superpower or be a wizard? Tell why.',
      'What is the best game to play with friends? Explain your pick.',
      'Is it better to play outside or inside? Give your reasons.'
    ],
    creative: [
      'If you could fly anywhere, where would you go and what would you see?',
      'A box arrived at your door and something inside was moving. What was it?',
      'You wake up one morning and everything in your house is tiny. What happens next?',
      'You find a door in the forest that was not there before. What is behind it?',
      'If you could switch lives with any animal for a day, which would you pick? What would you do?',
      'Your shoes could talk. What would they say about all the places they have been?',
      'A friendly dragon moves into your backyard. What do you do?'
    ],
    informative: [
      'Write about your favorite animal. Where does it live? What does it eat?',
      'Teach someone how to make your favorite food, step by step.',
      'Write about what happens in each season of the year.',
      'Tell what you know about how plants grow from a seed.',
      'Write about a job you think is interesting. What does that person do every day?',
      'Explain what you do to stay healthy. Name at least three things.',
      'Write about your school. What rooms are in it? What do you do there?'
    ]
  },
  '35': {
    narrative: [
      'Write about a time you did something that took a lot of courage.',
      'Tell the story of the best summer day you ever had.',
      'Write about a time you solved a difficult problem at school or at home.',
      'Write a story about a kid who discovers they have an unusual talent.',
      'Tell about a time a friendship was tested. What happened in the end?',
      'Write about a moment when you surprised yourself by what you could do.',
      'Tell the story of the most exciting day you have had this year.'
    ],
    descriptive: [
      'Describe a place in nature that you find beautiful or interesting. Use details.',
      'Write about what your neighborhood looks, sounds, and smells like.',
      'Describe the personality of someone you admire. What makes them special?',
      'Describe what it is like to go to a fair or carnival.',
      'Write about a moment when you felt very proud. Describe every detail.',
      'Describe your favorite place to read or relax. Paint a picture with words.',
      'Write about a meal that brings back a strong memory.'
    ],
    opinion: [
      'Should students have homework every night? Support your opinion with two reasons.',
      'What is the most important school subject? Explain why you think so.',
      'Is it better to read a book or watch the movie version of a story? Why?',
      'Should junk food be sold in schools? Give your opinion and reasons.',
      'Should kids be allowed to choose their own bedtimes? Explain your thinking.',
      'Is it better to have one best friend or a large group of friends? Why?',
      'Should schools have uniforms? Argue for or against the idea.'
    ],
    creative: [
      'You receive a letter from your future self ten years from now. What does it say?',
      'You are the last person on Earth who still knows how to do magic. What do you do?',
      'Write a story where the villain turns out to be the hero.',
      'A scientist accidentally makes themselves invisible for a day. Tell what happens.',
      'You find an old map that leads to something unexpected. What is at the end?',
      'A mysterious new student arrives who seems to know things before they happen.',
      'You discover a hidden tunnel under your school. Where does it lead?'
    ],
    informative: [
      'Explain how weather forms. Include at least three types of weather in your answer.',
      'Write about an important event in history. Why does it matter today?',
      'Explain how your favorite sport is played. Include the rules.',
      'Write about how food gets from a farm to your dinner plate.',
      'Explain why sleep is important for kids your age. Use facts.',
      'Write about an animal that is endangered. What threatens it? What can help?',
      'Explain how a volcano forms and what happens when it erupts.'
    ]
  },
  '68': {
    narrative: [
      'Write about a decision you made that changed something important in your life.',
      'Tell the story of a time you stood up for what you believed in.',
      'Write about a moment when you realized someone was different from who you thought they were.',
      'Write about a challenge that helped you grow as a person.',
      'Tell the story of an unlikely friendship between two very different people.',
      'Write about a time you failed at something and what you learned from it.',
      'Describe a conversation you had that you still think about today.'
    ],
    descriptive: [
      'Describe a place that holds a strong memory for you. Use all five senses.',
      'Write about a person who has shaped who you are. Describe their influence vividly.',
      'Describe what it feels like to be nervous before a big moment.',
      'Describe a piece of music, art, or writing that moved you. What made it powerful?',
      'Write about a moment when you felt completely at peace. Describe it in detail.',
      'Describe the feeling of finishing something you worked on for a long time.',
      'Write about a city, town, or landscape that left a strong impression on you.'
    ],
    opinion: [
      'Should students be required to volunteer in their community? Argue your position.',
      'Is social media more harmful or helpful for people your age? Defend your view.',
      'Should schools eliminate standardized testing? Make a case for your opinion.',
      'Is it ever okay to break a rule? Explain your reasoning with examples.',
      'Should video games be considered a competitive sport? Write a persuasive argument.',
      'Is it more important to be honest or kind when the two conflict? Explain.',
      'Should students be allowed to use AI tools for schoolwork? Argue your position.'
    ],
    creative: [
      'The year is 2150. Write a day in the life of a teenager.',
      'Write a story told entirely from the perspective of an object in your home.',
      'A new student arrives at school who seems to know everything about the future.',
      'Write a story where two strangers discover they are connected by a shared secret.',
      'The power goes out across the entire world for exactly 24 hours. What happens?',
      'You wake up in someone else\'s life. Who are you, and what do you do?',
      'Write a story where the last sentence becomes the first sentence of a new story.'
    ],
    informative: [
      'Explain the causes and effects of climate change. What can young people do?',
      'Write about a scientific discovery that changed how humans understand the world.',
      'Explain how the internet has changed communication over the past 30 years.',
      'Write about the pros and cons of artificial intelligence in everyday life.',
      'Explain how government works in a democracy. Why does it matter to participate?',
      'Write about a social issue you care about. Explain the problem and a possible solution.',
      'Explain how vaccines work and why they are important for public health.'
    ]
  }
};

const TYPE_LABELS = {
  narrative: 'Narrative Writing',
  descriptive: 'Descriptive Writing',
  opinion: 'Opinion Writing',
  creative: 'Creative Writing',
  informative: 'Informative Writing'
};

const GRADE_LABELS = {
  k2: 'K\u20132',
  '35': '3\u20135',
  '68': '6\u20138'
};

const TYPES = ['narrative', 'descriptive', 'opinion', 'creative', 'informative'];

function generate() {
  const grade = document.getElementById('grade').value;
  const typeVal = document.getElementById('type').value;
  const lineCount = parseInt(document.getElementById('lines').value);

  const typeKey = typeVal === 'random' ? TYPES[Math.floor(Math.random() * TYPES.length)] : typeVal;
  const list = PROMPTS[grade][typeKey];
  const promptText = list[Math.floor(Math.random() * list.length)];

  document.getElementById('prompt-text').textContent = promptText;
  document.getElementById('prompt-type-label').textContent =
    TYPE_LABELS[typeKey] + ' \u2014 Grade ' + GRADE_LABELS[grade];

  const linesEl = document.getElementById('writing-lines');
  linesEl.innerHTML = '';
  for (let i = 0; i < lineCount; i++) {
    const line = document.createElement('div');
    line.className = 'wp-line-row';
    linesEl.appendChild(line);
  }

  document.getElementById('output').classList.remove('hidden');
}

document.getElementById('generate-btn').addEventListener('click', generate);
document.getElementById('regen-btn').addEventListener('click', generate);
document.getElementById('print-btn').addEventListener('click', () => window.print());
