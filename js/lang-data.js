'use strict';

// ============================================================
// SHARED LANGUAGE DATA
// Word lists, fill-in-blank sentences, and synonym/antonym
// pairs used by all five language worksheet generators.
// ============================================================

const GRADE_LABELS = {
  easy:   'Easy',
  medium: 'Medium',
  hard:   'Hard'
};

const LANG_GRADES = ['easy', 'medium', 'hard'];

// ── Word lists (missing letters & unscramble) ──────────────────────────────
const LANG_WORDS = {
  easy: [
    // kindergarten words
    'cat','dog','sun','hat','run','big','red','cup','sit','hop',
    'bed','bug','nap','wet','hot','top','map','log','jam','box',
    'fox','fit','den','van','mud','dig','pat','yam','bin','lip',
    // grade1 words
    'black','white','plant','smile','clean','fresh','brown','stone','cloud','snack',
    'trick','blend','shelf','chest','crisp','flash','grant','stomp','sweet','class',
    'dress','press','greet','feast','trail','wheel','chant','float','brave','spell'
  ],
  medium: [
    // grade2 words
    'garden','basket','winter','summer','pretty','bright','simple','follow','better','hurry',
    'quiet','strong','laugh','watch','learn','carry','whole','alarm','catch','magic',
    'storm','until','vivid','lucky','patch','orbit','nerve','ghost','drift','early',
    // grade3 words
    'because','careful','million','whether','hundred','problem','perhaps','moment','certain','strange',
    'travel','believe','hungry','puzzle','ribbon','silver','tender','unless','valley','wander',
    'frozen','pillow','gather','circle','bottle','famous','gentle','insect','jungle','mirror'
  ],
  hard: [
    // grade4 words
    'ancient','journey','measure','respect','protect','surface','opinion','courage','explore','pattern',
    'freedom','reflect','climate','curious','harvest','inspire','mystery','network','outcome','patient',
    'balance','chapter','current','distant','express','grammar','history','imagine','lantern','perfect',
    // grade5 words
    'absolute','argument','cautious','dedicate','emphasis','flexible','generous','hesitate','judgment','knowledge',
    'language','moderate','negative','obstacle','patience','quantity','relevant','strategy','tolerant','universe',
    'brilliant','classical','decisive','enormous','faithful','grateful','horrible','innocent','jealousy','merchant',
    // grade6 words
    'accomplish','beneficial','comprehend','demonstrate','elaborate','fundamental','illuminate','magnificent','negligence','persevere',
    'punctuate','recognize','significant','thoroughly','understand','vocabulary','wilderness','admirable','civilized','competence',
    'appreciate','correspond','dependable','frequently','government','historical','incredible','legitimate','memorable','objective'
  ]
};

// ── Fill-in-the-blank sentences ────────────────────────────────────────────
// Each entry: { text: 'sentence with ___ for blank', answer: 'word' }
const LANG_SENTENCES = {
  easy: [
    // kindergarten sentences
    { text: 'The ___ makes it warm outside.',          answer: 'sun' },
    { text: 'My ___ likes to fetch the ball.',         answer: 'dog' },
    { text: 'I wear a ___ on my head.',                answer: 'hat' },
    { text: 'The ___ sat on the rug.',                 answer: 'cat' },
    { text: 'I love to ___ at the park.',              answer: 'run' },
    { text: 'The apple is ___.',                       answer: 'red' },
    { text: 'I drink milk from a ___.',                answer: 'cup' },
    { text: 'Please ___ down in your chair.',          answer: 'sit' },
    { text: 'The bunny can ___ over the log.',         answer: 'hop' },
    { text: 'I sleep in my ___ at night.',             answer: 'bed' },
    { text: 'I saw a little ___ on the leaf.',         answer: 'bug' },
    { text: 'The baby takes a ___ after lunch.',       answer: 'nap' },
    { text: 'My shoes got ___ in the rain.',           answer: 'wet' },
    { text: 'Be careful, the soup is very ___.',       answer: 'hot' },
    { text: 'The elephant is a very ___ animal.',      answer: 'big' },
    { text: 'The bird sat on the ___ of the tree.',    answer: 'top' },
    { text: 'We used a ___ to find the park.',         answer: 'map' },
    { text: 'A frog sat on a ___ in the pond.',        answer: 'log' },
    { text: 'I put ___ on my toast for breakfast.',    answer: 'jam' },
    { text: 'The toy came in a big ___.',              answer: 'box' },
    { text: 'The red ___ ran into the forest.',        answer: 'fox' },
    { text: 'The fox hid in its cozy ___.',            answer: 'den' },
    { text: 'We rode in a ___ to school.',             answer: 'van' },
    { text: 'The puppy played in the ___.',            answer: 'mud' },
    { text: 'I love to ___ holes in the sandbox.',     answer: 'dig' },
    { text: 'I love to ___ my dog on the head.',       answer: 'pat' },
    { text: 'We eat ___ at Thanksgiving.',             answer: 'yam' },
    { text: 'Put the cans in the recycling ___.',      answer: 'bin' },
    { text: 'My new shoes ___ my feet perfectly.',     answer: 'fit' },
    { text: 'She put balm on her dry ___.',            answer: 'lip' },
    // grade1 sentences
    { text: 'I water my ___ every morning.',                      answer: 'plant' },
    { text: 'She had a big ___ on her face.',                     answer: 'smile' },
    { text: 'Please keep your room neat and ___.',                answer: 'clean' },
    { text: 'The air smelled ___ after the rain.',                answer: 'fresh' },
    { text: 'The bear has thick ___ fur.',                        answer: 'brown' },
    { text: 'We skipped a ___ across the pond.',                  answer: 'stone' },
    { text: 'A fluffy white ___ floated across the sky.',         answer: 'cloud' },
    { text: 'An apple makes a great after-school ___.',           answer: 'snack' },
    { text: 'The dog learned an amazing new ___.',                answer: 'trick' },
    { text: 'The toy boat will ___ on the water.',                answer: 'float' },
    { text: 'We went to ___ our new neighbors with a gift.',      answer: 'greet' },
    { text: 'The strawberry tasted very ___.',                    answer: 'sweet' },
    { text: 'Can you ___ your last name for me?',                 answer: 'spell' },
    { text: 'The firefighter was very ___.',                      answer: 'brave' },
    { text: 'Stars ___ brightly in the night sky.',               answer: 'shine' },
    { text: 'The dog likes to ___ its paw.',                      answer: 'shake' },
    { text: 'Flowers ___ in the spring.',                         answer: 'bloom' },
    { text: 'I felt ___ when I won the race.',                    answer: 'proud' },
    { text: 'Please be ___ when holding the baby rabbit.',        answer: 'gentle' },
    { text: 'We all made new friends in our ___.',                answer: 'class' },
    { text: 'She wore a beautiful ___ to the party.',             answer: 'dress' },
    { text: 'The wizard wore a long ___ robe.',                   answer: 'black' },
    { text: 'The snow turned the hillside bright ___.',           answer: 'white' },
    { text: 'We had a big ___ on Thanksgiving Day.',              answer: 'feast' },
    { text: 'We walked along the forest ___ all afternoon.',      answer: 'trail' },
    { text: 'The hamster ran on its ___ all night.',              answer: 'wheel' },
    { text: 'The fans began to ___ the team\'s name.',           answer: 'chant' },
    { text: 'I heard a bright ___ of lightning outside.',         answer: 'flash' },
    { text: 'Put the book back on the ___ when you finish.',      answer: 'shelf' },
    { text: 'The autumn air was cool and ___.',                   answer: 'crisp' }
  ],
  medium: [
    // grade2 sentences
    { text: 'Mom grows tomatoes in our ___ out back.',            answer: 'garden' },
    { text: 'She carried a ___ full of fresh fruit.',             answer: 'basket' },
    { text: 'We love to build snowmen in the ___.',               answer: 'winter' },
    { text: 'We splash in the pool every ___.',                   answer: 'summer' },
    { text: 'The butterfly had very ___ wings.',                  answer: 'pretty' },
    { text: 'The stars were very ___ last night.',                answer: 'bright' },
    { text: 'The puzzle was ___ to put together.',                answer: 'simple' },
    { text: 'Please ___ the path to the playground.',             answer: 'follow' },
    { text: 'I feel much ___ after a good night\'s sleep.',       answer: 'better' },
    { text: 'We must ___ or we will miss the bus.',               answer: 'hurry' },
    { text: 'Please be ___ in the library.',                      answer: 'quiet' },
    { text: 'You need to be ___ to lift that heavy box.',         answer: 'strong' },
    { text: 'The funny joke made everyone ___.',                   answer: 'laugh' },
    { text: 'I like to ___ the stars at night.',                  answer: 'watch' },
    { text: 'I want to ___ how to play the piano.',               answer: 'learn' },
    { text: 'Can you ___ this heavy box for me?',                 answer: 'carry' },
    { text: 'I ate the ___ slice of pizza.',                      answer: 'whole' },
    { text: 'The fire ___ rang loudly in the hall.',              answer: 'alarm' },
    { text: 'Try to ___ the ball with both hands.',               answer: 'catch' },
    { text: 'The magician did an amazing ___ trick.',             answer: 'magic' },
    { text: 'The big ___ knocked down some trees.',               answer: 'storm' },
    { text: 'Wait here ___ I come back for you.',                 answer: 'until' },
    { text: 'She had a very ___ dream about flying.',             answer: 'vivid' },
    { text: 'I found a ___ penny on the ground.',                 answer: 'lucky' },
    { text: 'He had a colorful ___ on his jacket.',               answer: 'patch' },
    { text: 'The moon is in ___ around the Earth.',               answer: 'orbit' },
    { text: 'She had the ___ to go on stage alone.',              answer: 'nerve' },
    { text: 'He dressed as a ___ for Halloween.',                 answer: 'ghost' },
    { text: 'I watched the clouds ___ across the sky.',           answer: 'drift' },
    { text: 'She likes to wake up ___ every morning.',            answer: 'early' },
    // grade3 sentences
    { text: 'I stayed inside ___ it was raining.',               answer: 'because' },
    { text: 'Be ___ when you cross the busy street.',            answer: 'careful' },
    { text: 'There are ___ cents in a dollar.',                  answer: 'hundred' },
    { text: 'I wasn\'t sure ___ to bring an umbrella.',         answer: 'whether' },
    { text: 'We worked together to solve the math ___.',         answer: 'problem' },
    { text: '___, we will visit the museum this weekend.',       answer: 'perhaps' },
    { text: 'Please wait just a ___, I\'ll be right back.',     answer: 'moment' },
    { text: 'A very ___ noise came from the attic.',            answer: 'strange' },
    { text: 'We plan to ___ to three countries this year.',     answer: 'travel' },
    { text: 'Do you ___ in magic and wonder?',                  answer: 'believe' },
    { text: 'I am always ___ by lunchtime.',                    answer: 'hungry' },
    { text: 'It took me over an hour to finish the ___.',       answer: 'puzzle' },
    { text: 'She tied a pink ___ around the gift.',             answer: 'ribbon' },
    { text: 'The knight wore shiny ___ armor.',                 answer: 'silver' },
    { text: 'You can\'t go out to play ___ you finish homework.',answer: 'unless' },
    { text: 'The river flowed gently through the green ___.',   answer: 'valley' },
    { text: 'It\'s easy to ___ off the hiking trail.',         answer: 'wander' },
    { text: 'The pond was completely ___ in January.',          answer: 'frozen' },
    { text: 'I fluffed my ___ before falling asleep.',         answer: 'pillow' },
    { text: 'Let\'s ___ all the leaves into a big pile.',      answer: 'gather' },
    { text: 'We all stood in a ___ and held hands.',           answer: 'circle' },
    { text: 'Please put the cap back on the water ___.',       answer: 'bottle' },
    { text: 'The ___ singer waved to her fans.',               answer: 'famous' },
    { text: 'Please be ___ when holding the baby chick.',      answer: 'gentle' },
    { text: 'A butterfly is a type of ___.',                   answer: 'insect' },
    { text: 'Tigers live deep inside the ___.',                answer: 'jungle' },
    { text: 'She looked at her reflection in the ___.',        answer: 'mirror' },
    { text: 'Are you ___ that you have all your things?',      answer: 'certain' },
    { text: 'There are ___ of reasons to be kind.',           answer: 'million' },
    { text: 'The ___ chick stayed close to its mother.',       answer: 'tender' }
  ],
  hard: [
    // grade4 sentences
    { text: 'Egypt is home to many ___ pyramids.',                    answer: 'ancient' },
    { text: 'The explorers began their long ___ at dawn.',            answer: 'journey' },
    { text: 'Use a ruler to ___ the length of the paper.',            answer: 'measure' },
    { text: 'We should treat everyone with kindness and ___.',        answer: 'respect' },
    { text: 'A helmet helps ___ your head while cycling.',            answer: 'protect' },
    { text: 'Please wipe the ___ of the table clean.',                answer: 'surface' },
    { text: 'In my ___, dogs make excellent pets.',                   answer: 'opinion' },
    { text: 'It takes ___ to try something brand new.',               answer: 'courage' },
    { text: 'Astronauts ___ the rocky surface of the moon.',          answer: 'explore' },
    { text: 'The fabric had a beautiful flower ___.',                 answer: 'pattern' },
    { text: 'Everyone deserves ___ and equal rights.',                answer: 'freedom' },
    { text: 'After the loss, the team had time to ___.',              answer: 'reflect' },
    { text: 'The ___ near the equator is very warm.',                 answer: 'climate' },
    { text: 'The ___ kitten kept peering into the box.',              answer: 'curious' },
    { text: 'Farmers ___ their crops in the fall.',                   answer: 'harvest' },
    { text: 'Great books can ___ you to dream big.',                  answer: 'inspire' },
    { text: 'The detective solved the ___ of the missing ring.',      answer: 'mystery' },
    { text: 'She built a strong ___ of friends at school.',           answer: 'network' },
    { text: 'The team was pleased with the ___ of the game.',         answer: 'outcome' },
    { text: 'You must be ___ when waiting in a long line.',           answer: 'patient' },
    { text: 'Gymnasts need excellent ___ on the balance beam.',       answer: 'balance' },
    { text: 'I read the first ___ of my new book last night.',        answer: 'chapter' },
    { text: 'We could see a ___ mountain through the fog.',           answer: 'distant' },
    { text: 'Art is a wonderful way to ___ your feelings.',           answer: 'express' },
    { text: 'Good ___ helps you write clearly and correctly.',        answer: 'grammar' },
    { text: 'We study ___ to learn from the past.',                   answer: 'history' },
    { text: 'Close your eyes and ___ you are on a beach.',            answer: 'imagine' },
    { text: 'We hung a glowing ___ outside the tent.',                answer: 'lantern' },
    { text: 'She practiced until her routine was ___.',               answer: 'perfect' },
    { text: 'The swimmer fought against the strong ocean ___.',       answer: 'current' },
    // grade5 sentences
    { text: 'The judge had ___ authority in the courtroom.',          answer: 'absolute' },
    { text: 'They had an ___ about whose turn it was.',               answer: 'argument' },
    { text: 'Be ___ when walking near the edge of the cliff.',        answer: 'cautious' },
    { text: 'She chose to ___ her book to her grandmother.',          answer: 'dedicate' },
    { text: 'The coach put great ___ on teamwork.',                   answer: 'emphasis' },
    { text: 'A gymnast must be incredibly ___.',                      answer: 'flexible' },
    { text: 'It was very ___ of him to donate all his savings.',      answer: 'generous' },
    { text: 'Don\'t ___ to ask for help when you need it.',          answer: 'hesitate' },
    { text: 'Good ___ is needed to make wise decisions.',             answer: 'judgment' },
    { text: 'Reading expands your ___ of the world.',                 answer: 'knowledge' },
    { text: 'She studied French and mastered a new ___.',             answer: 'language' },
    { text: 'Try to eat a ___ amount of sugar each day.',             answer: 'moderate' },
    { text: 'Try not to focus on ___ thoughts.',                      answer: 'negative' },
    { text: 'Determination helps you overcome every ___.',            answer: 'obstacle' },
    { text: '___ is needed when learning a difficult skill.',         answer: 'patience' },
    { text: 'We need a large ___ of flour for the bakery.',           answer: 'quantity' },
    { text: 'Make sure all your evidence is ___ to the topic.',       answer: 'relevant' },
    { text: 'The chess player had a clever ___ to win.',              answer: 'strategy' },
    { text: 'We should be ___ of people who think differently.',      answer: 'tolerant' },
    { text: 'Scientists are still exploring the mysteries of the ___.',answer: 'universe' },
    { text: 'The scientist had a ___ idea that changed everything.',  answer: 'brilliant' },
    { text: 'She played a ___ piece on the violin at the recital.',   answer: 'classical' },
    { text: 'A strong leader must be quick and ___.',                 answer: 'decisive' },
    { text: 'The blue whale is an ___ creature of the deep sea.',     answer: 'enormous' },
    { text: 'A ___ friend stands by you through everything.',         answer: 'faithful' },
    { text: 'I am ___ for the kindness shown by my neighbors.',       answer: 'grateful' },
    { text: 'The weather was ___ during the hurricane.',              answer: 'horrible' },
    { text: 'The jury decided that the defendant was ___.',           answer: 'innocent' },
    { text: 'She tried not to let ___ ruin her friendship.',          answer: 'jealousy' },
    { text: 'The ___ sold spices and silks from across the land.',    answer: 'merchant' },
    // grade6 sentences
    { text: 'With hard work, you can ___ anything you set your mind to.',   answer: 'accomplish' },
    { text: 'Exercise is ___ to both the body and the mind.',               answer: 'beneficial' },
    { text: 'Read the passage again until you fully ___ the meaning.',      answer: 'comprehend' },
    { text: 'Please ___ how to solve the equation on the board.',           answer: 'demonstrate' },
    { text: 'The architect created an ___ design for the cathedral.',       answer: 'elaborate' },
    { text: 'Reading is a ___ skill used throughout your entire life.',     answer: 'fundamental' },
    { text: 'The lanterns ___ the entire courtyard at the festival.',       answer: 'illuminate' },
    { text: 'The view from the mountain top was absolutely ___.',           answer: 'magnificent' },
    { text: 'The accident occurred due to ___ on the construction site.',   answer: 'negligence' },
    { text: 'Champions ___ through hardship and never give up.',            answer: 'persevere' },
    { text: 'Remember to ___ your sentences with the correct marks.',       answer: 'punctuate' },
    { text: 'Did you ___ anyone at the school reunion last week?',          answer: 'recognize' },
    { text: 'Winning the championship was a truly ___ achievement.',        answer: 'significant' },
    { text: 'She ___ researched her topic before writing the essay.',       answer: 'thoroughly' },
    { text: 'I need more time to fully ___ this new concept.',              answer: 'understand' },
    { text: 'Reading widely will expand your ___ and language skills.',     answer: 'vocabulary' },
    { text: 'The hikers camped deep in the ___ for a full week.',           answer: 'wilderness' },
    { text: 'Her dedication to helping others is truly ___.',               answer: 'admirable' },
    { text: 'A ___ society treats all of its members with dignity.',        answer: 'civilized' },
    { text: 'Years of practice built her ___ as a skilled surgeon.',        answer: 'competence' },
    { text: 'Take a moment each day to ___ the beauty around you.',         answer: 'appreciate' },
    { text: 'The pen pals continue to ___ by letter every month.',         answer: 'correspond' },
    { text: 'She proved herself to be a truly ___ team member.',           answer: 'dependable' },
    { text: 'He ___ visited the library to research his project.',         answer: 'frequently' },
    { text: 'The ___ passed new laws to protect the environment.',         answer: 'government' },
    { text: 'We visited a ___ site where a famous battle was fought.',     answer: 'historical' },
    { text: 'The acrobat\'s performance was nothing short of ___.',       answer: 'incredible' },
    { text: 'She had a ___ reason for missing class that day.',           answer: 'legitimate' },
    { text: 'The graduation ceremony was a truly ___ occasion.',          answer: 'memorable' },
    { text: 'Try to remain ___ when judging others\' work.',              answer: 'objective' }
  ]
};

// ── Synonym and antonym pairs ──────────────────────────────────────────────
// Each entry: [word, partner] — always lowercase
const LANG_PAIRS = {
  easy: {
    antonyms: [
      // kindergarten
      ['big','small'],   ['hot','cold'],   ['fast','slow'],  ['happy','sad'],
      ['up','down'],     ['in','out'],     ['wet','dry'],    ['old','new'],
      ['hard','soft'],   ['day','night'],  ['on','off'],     ['yes','no'],
      ['stop','go'],     ['top','bottom'], ['front','back'],
      // grade1
      ['loud','quiet'],  ['open','close'],  ['light','dark'],  ['clean','dirty'],
      ['near','far'],    ['brave','scared'],['full','empty'],  ['smile','frown'],
      ['smooth','rough'],['high','low'],    ['early','late'],  ['first','last'],
      ['strong','weak'], ['true','false'],  ['right','wrong']
    ],
    synonyms: [
      // kindergarten
      ['big','large'],    ['small','tiny'],   ['fast','quick'],  ['happy','glad'],
      ['cold','chilly'],  ['shout','yell'],   ['pretty','nice'], ['jump','leap'],
      ['begin','start'],  ['friend','pal'],   ['look','see'],    ['sick','ill'],
      ['scared','afraid'],['funny','silly'],  ['smart','clever'],
      // grade1
      ['angry','mad'],   ['tired','sleepy'], ['smart','clever'],['funny','silly'],
      ['cold','freezing'],['sick','ill'],    ['talk','speak'],  ['road','street'],
      ['stone','rock'],  ['happy','joyful'], ['fast','rapid'],  ['sad','upset'],
      ['brave','bold'],  ['clean','neat'],   ['big','huge']
    ]
  },
  medium: {
    antonyms: [
      // grade2
      ['found','lost'],     ['correct','wrong'],   ['always','never'],   ['remember','forget'],
      ['appear','vanish'],  ['strong','weak'],     ['question','answer'],['arrive','depart'],
      ['accept','refuse'],  ['reward','punish'],   ['brave','cowardly'], ['kind','cruel'],
      ['begin','finish'],   ['ancient','modern'],  ['bright','dull'],
      // grade3
      ['victory','defeat'],    ['ancient','modern'],   ['noisy','peaceful'],  ['ordinary','special'],
      ['hostile','friendly'],  ['certain','uncertain'],['generous','selfish'],['bright','dim'],
      ['positive','negative'], ['expand','shrink'],    ['valuable','worthless'],['true','false'],
      ['success','failure'],   ['careful','careless'], ['hungry','full']
    ],
    synonyms: [
      // grade2
      ['brave','courageous'], ['begin','start'],     ['tired','exhausted'],  ['happy','joyful'],
      ['kind','gentle'],      ['strange','unusual'], ['large','enormous'],   ['fast','speedy'],
      ['scared','terrified'], ['cold','frigid'],     ['smart','intelligent'],['pretty','beautiful'],
      ['angry','furious'],    ['quiet','silent'],    ['sad','sorrowful'],
      // grade3
      ['brave','courageous'],  ['calm','peaceful'],   ['strange','peculiar'],  ['clever','intelligent'],
      ['ancient','old'],       ['happy','delighted'], ['sad','miserable'],     ['tired','exhausted'],
      ['angry','furious'],     ['cold','frigid'],     ['kind','generous'],     ['big','enormous'],
      ['fast','rapid'],        ['begin','commence'],  ['small','miniature']
    ]
  },
  hard: {
    antonyms: [
      // grade4
      ['permanent','temporary'],['reveal','conceal'], ['generous','selfish'],  ['flexible','rigid'],
      ['loyal','disloyal'],     ['natural','artificial'],['expand','contract'],['courage','cowardice'],
      ['ascend','descend'],     ['innocent','guilty'], ['knowledge','ignorance'],['ancient','modern'],
      ['triumph','defeat'],     ['protect','endanger'],['inspire','discourage'],
      // grade5
      ['abundant','scarce'],     ['diligent','lazy'],        ['optimistic','pessimistic'], ['flexible','rigid'],
      ['humble','arrogant'],     ['generous','stingy'],      ['courage','cowardice'],      ['ancient','contemporary'],
      ['beneficial','harmful'],  ['strengthen','weaken'],    ['wisdom','foolishness'],     ['tolerant','intolerant'],
      ['cautious','reckless'],   ['success','failure'],      ['transparent','opaque'],
      // grade6
      ['benevolent','malevolent'], ['significant','trivial'],  ['transparent','opaque'],
      ['authentic','counterfeit'], ['abundant','scarce'],      ['optimistic','pessimistic'],
      ['elaborate','simplistic'],  ['prominent','obscure'],    ['diligent','negligent'],
      ['rational','irrational'],   ['coherent','incoherent'],  ['superior','inferior'],
      ['persistent','inconsistent'],['beneficial','detrimental'],['admirable','contemptible']
    ],
    synonyms: [
      // grade4
      ['brave','valiant'],    ['happy','elated'],    ['sad','melancholy'],  ['angry','furious'],
      ['smart','ingenious'],  ['tired','fatigued'],  ['begin','initiate'],  ['end','conclude'],
      ['big','colossal'],     ['small','minute'],    ['fast','swift'],      ['slow','sluggish'],
      ['kind','benevolent'],  ['strange','peculiar'],['honest','truthful'],
      // grade5
      ['brave','valiant'],    ['clever','astute'],   ['happy','ecstatic'],   ['angry','indignant'],
      ['begin','initiate'],   ['strange','peculiar'],['honest','candid'],    ['tired','weary'],
      ['kind','benevolent'],  ['stop','cease'],      ['famous','renowned'],  ['difficult','arduous'],
      ['small','minuscule'],  ['generous','magnanimous'],['patient','steadfast'],
      // grade6
      ['admirable','commendable'],  ['comprehend','understand'], ['fundamental','essential'],
      ['magnificent','splendid'],   ['persevere','persist'],     ['significant','substantial'],
      ['beneficial','advantageous'],['accomplish','achieve'],    ['elaborate','intricate'],
      ['illuminate','enlighten'],   ['recognize','acknowledge'], ['appreciate','value'],
      ['competent','proficient'],   ['civilized','cultured'],    ['demonstrate','illustrate']
    ]
  }
};
