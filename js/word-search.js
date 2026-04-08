'use strict';

// ============================================================
// WORD LISTS
// 45 topics × 25 words each. Words are uppercase, no spaces.
// Shorter words work for Easy; all words work for Hard.
// ============================================================
const WORD_LISTS = {

  boy: {
    'Dinosaurs': [
      'TREX','RAPTOR','FOSSIL','CLAW','SCALES','STOMP','ROAR','BONES',
      'SPIKE','HORN','ARMOR','NEST','EGGS','FANG','TAIL','HERD','PREY',
      'DINO','TEETH','JUNGLE','SWAMP','HUNT','SWIFT','BEAST','CRATER'
    ],
    'Space': [
      'ROCKET','PLANET','GALAXY','METEOR','NEBULA','SATURN','COMET',
      'ORBIT','STAR','MOON','MARS','PROBE','LAUNCH','SUIT','GRAVITY',
      'ASTEROID','OXYGEN','MODULE','CAPSULE','THRUST','CRATER','SOLAR',
      'LUNAR','COSMOS','SHUTTLE'
    ],
    'Sports': [
      'FOOTBALL','BASEBALL','SOCCER','HOCKEY','TENNIS','SWIMMING',
      'TROPHY','ATHLETE','CHAMPION','VICTORY','REFEREE','PENALTY',
      'TACKLE','SPRINT','SCORE','TEAM','COACH','GOAL','MEDAL','REBOUND',
      'PITCHER','GOALIE','ASSIST','SERVE','VOLLEY'
    ],
    'Superheroes': [
      'HERO','VILLAIN','CAPE','MASK','SHIELD','LASER','POWER','STRENGTH',
      'FLIGHT','DEFEND','RESCUE','SIDEKICK','GADGET','ARMOR','JUSTICE',
      'LEAP','PUNCH','KICK','SWIFT','FORCE','STEALTH','THUNDER','BLAZE',
      'COSMIC','INVINCIBLE'
    ],
    'Vehicles': [
      'RACECAR','MONSTER','DRAGSTER','FORMULA','ENGINE','TURBO','WHEELS',
      'DRIVER','NITRO','SPEEDWAY','THROTTLE','CHASSIS','PISTON','BURNOUT',
      'GEARBOX','TRUCK','MUSCLE','RALLY','DRIFT','CLUTCH','BRAKE','FUEL',
      'BOOST','TORQUE','EXHAUST'
    ],
    'Pirates': [
      'TREASURE','CAPTAIN','SWORD','CANNON','ANCHOR','PLANK','SKULL',
      'GALLEON','COMPASS','DOUBLOON','PARROT','BUCCANEER','CUTLASS',
      'SCALLYWAG','BOOTY','JOLLY','COAST','ISLAND','BURIED','CREW',
      'MAST','FLAG','COVE','LOOT','ROGER'
    ],
    'Robots': [
      'ANDROID','CIRCUIT','LASER','SENSOR','MOTOR','BATTERY','PROGRAM',
      'DIGITAL','METAL','CYBORG','VOLTAGE','ANTENNA','TITANIUM','SCANNER',
      'SYSTEM','GEAR','BOLT','STEEL','WIRE','SERVO','POWER','LOGIC',
      'BINARY','CHIP','REACTOR'
    ],
    'Gaming': [
      'PLAYER','QUEST','LEVEL','DUNGEON','SWORD','SHIELD','ARMOR',
      'POTION','CASTLE','WIZARD','GOBLIN','RESPAWN','CONSOLE','JOYSTICK',
      'MISSION','AVATAR','VICTORY','DRAGON','HEALTH','MAGIC','BOSS',
      'SPAWN','LOOT','SCORE','CHEAT'
    ],
    'Wild Animals': [
      'LION','TIGER','ELEPHANT','GORILLA','CHEETAH','RHINO','HIPPO',
      'CROCODILE','PANTHER','LEOPARD','JAGUAR','PYTHON','COBRA','VULTURE',
      'BUFFALO','HYENA','BABOON','WARTHOG','MONGOOSE','MAMBA','GIRAFFE',
      'ZEBRA','LYNX','PUMA','WOLF'
    ],
    'Ninjas': [
      'NINJA','SAMURAI','KATANA','SHURIKEN','SENSEI','DOJO','STEALTH',
      'SHADOW','WARRIOR','DRAGON','BLADE','SCROLL','HONOR','COMBAT',
      'STRIKE','SWIFT','SILENT','DISGUISE','JUMP','KICK','THROW','HIDE',
      'SNEAK','DODGE','FLIP'
    ],
    'Sharks': [
      'SHARK','HAMMERHEAD','MAKO','WHALE','DOLPHIN','OCTOPUS','LOBSTER',
      'CORAL','JELLYFISH','STARFISH','SEAWEED','TSUNAMI','SUBMARINE',
      'MANATEE','NARWHAL','BARRACUDA','TUNA','CRAB','REEF','ORCA',
      'SQUID','CURRENT','ANEMONE','SWORDFISH','ANCHOR'
    ],
    'Science': [
      'EXPERIMENT','CHEMICAL','MOLECULE','ELEMENT','HYDROGEN','OXYGEN',
      'PROTON','ELECTRON','ATOM','BEAKER','MICROSCOPE','GRAVITY',
      'VELOCITY','FRICTION','ENERGY','VOLTAGE','FORMULA','MAGNET',
      'LASER','PRISM','FLASK','CRYSTAL','REACT','CHARGE','FORCE'
    ],
    'Construction': [
      'CRANE','CEMENT','HAMMER','WRENCH','SCAFFOLD','FOUNDATION',
      'BLUEPRINT','HARDHAT','FORKLIFT','DRILL','GIRDER','RIVET',
      'WELDING','LUMBER','MORTAR','CONCRETE','BOLT','BEAM','LOADER',
      'BUCKET','CHISEL','LEVEL','SHOVEL','NAIL','PLANK'
    ],
    'Bugs': [
      'BUTTERFLY','DRAGONFLY','LADYBUG','GRASSHOPPER','FIREFLY','CRICKET',
      'MANTIS','BEETLE','CATERPILLAR','CENTIPEDE','CICADA','BUMBLEBEE',
      'HORNET','TERMITE','APHID','EARWIG','MOTH','FLEA','GNAT','WASP',
      'ANT','FLY','TICK','MITE','GRUB'
    ],
    'Weather': [
      'THUNDER','LIGHTNING','TORNADO','BLIZZARD','HURRICANE','DRIZZLE',
      'FOGGY','CLOUDY','WINDY','RAINBOW','SUNSHINE','BAROMETER',
      'HUMIDITY','CELSIUS','CLIMATE','FORECAST','SNOWFLAKE','CYCLONE',
      'SLEET','FROST','BREEZE','STORM','GALE','HAIL','MIST'
    ]
  },

  girl: {
    'Unicorns': [
      'UNICORN','RAINBOW','SPARKLE','MAGIC','GLITTER','CRYSTAL',
      'STARDUST','FAIRY','ENCHANT','SHIMMER','MOONBEAM','AURORA',
      'FANTASY','WISHES','MANE','HORN','WINGS','PRISM','GOLDEN',
      'RADIANT','STARLIGHT','DREAM','MEADOW','SPARK','MYSTICAL'
    ],
    'Fairy Tales': [
      'PRINCESS','DRAGON','CASTLE','KNIGHT','WITCH','FAIRY','MAGIC',
      'SPELL','POTION','ENCHANT','FOREST','TOWER','KINGDOM','PRINCE',
      'FROG','APPLE','MIRROR','GLASS','WAND','CROWN','GOWN','CHARMING',
      'CURSE','WISH','BEAST'
    ],
    'Fashion': [
      'DRESS','SHOES','HANDBAG','NECKLACE','BRACELET','EARRINGS',
      'RIBBON','GLITTER','RUNWAY','FABRIC','PATTERN','VINTAGE',
      'BOUTIQUE','COUTURE','STYLISH','TRENDY','BLOUSE','SKIRT','SCARF',
      'BOOTS','VELVET','LACE','SILK','SATIN','SEQUIN'
    ],
    'Butterflies': [
      'BUTTERFLY','MONARCH','CHRYSALIS','PETAL','BLOSSOM','NECTAR',
      'LAVENDER','DAISY','VIOLET','TULIP','ORCHID','JASMINE','HONEYBEE',
      'CLOVER','SUNFLOWER','ROSEBUD','POPPY','LILY','DAHLIA','IRIS',
      'FLUTTER','BLOOM','FRAGRANT','MEADOW','GARDEN'
    ],
    'Mermaids': [
      'MERMAID','OCEAN','CORAL','PEARL','SHELL','SEAHORSE','DOLPHIN',
      'STARFISH','TREASURE','TRIDENT','CURRENT','LAGOON','SIREN',
      'SCALES','FINS','BUBBLES','KELP','AQUA','TIDE','WAVE','GROTTO',
      'REEF','FOAM','CREST','SWIM'
    ],
    'Ballet': [
      'BALLET','DANCER','POINTE','PIROUETTE','ARABESQUE','TUTU','BARRE',
      'RECITAL','STAGE','PERFORM','GRACEFUL','ELEGANT','RHYTHM',
      'REHEARSE','SPOTLIGHT','CURTAIN','APPLAUSE','COSTUME','LEAP',
      'TURN','POSE','MUSIC','GRACE','PLIE','TENDU'
    ],
    'Horses': [
      'HORSE','SADDLE','BRIDLE','GALLOP','CANTER','TROT','MANE','HOOF',
      'STABLE','PASTURE','DRESSAGE','JUMPING','RIBBON','CHAMPION',
      'TRAINER','BRUSHING','GROOMING','MUSTANG','STALLION','MARE',
      'FOAL','PONY','COLT','FILLY','REINS'
    ],
    'Art and Crafts': [
      'PAINTING','DRAWING','SKETCHING','SCULPTURE','POTTERY','ORIGAMI',
      'COLLAGE','MOSAIC','WEAVING','KNITTING','SEWING','GLITTER',
      'STENCIL','PALETTE','CANVAS','BRUSHES','CREATE','DESIGN','CRAFT',
      'CLAY','BEADS','STAMP','PRINT','YARN','FABRIC'
    ],
    'Baking': [
      'CUPCAKE','FROSTING','SPRINKLES','COOKIES','BROWNIE','MUFFIN',
      'PASTRY','BATTER','MIXING','VANILLA','CHOCOLATE','CINNAMON',
      'GINGER','RECIPE','MEASURE','DECORATE','SUGAR','CREAM','BUTTER',
      'FLOUR','ICING','FONDANT','GANACHE','GLAZE','SWIRL'
    ],
    'Princesses': [
      'AURORA','CINDERELLA','RAPUNZEL','ARIEL','BELLE','JASMINE',
      'TIANA','MULAN','MOANA','MERIDA','TIARA','GOWN','CASTLE',
      'BALLROOM','WALTZ','CROWN','SCEPTER','ROYAL','GRACE','CHARMING',
      'FAIRY','MAGIC','WAND','BALL','GLASS'
    ],
    'Garden': [
      'SUNFLOWER','ROSEBUSH','DAISY','TULIP','LAVENDER','PLANTING',
      'WATERING','PRUNING','HARVEST','COMPOST','SEEDLING','TRELLIS',
      'BLOSSOM','PETAL','BUTTERFLY','LADYBUG','DRAGONFLY','HONEYBEE',
      'FERN','MULCH','SPADE','RAKE','HOSE','SOIL','BLOOM'
    ],
    'Music': [
      'SINGING','DANCING','GUITAR','PIANO','VIOLIN','MELODY','HARMONY',
      'RHYTHM','CHORUS','LYRICS','CONCERT','PERFORM','MICROPHONE',
      'PLAYLIST','COMPOSE','NOTES','TEMPO','BEAT','SONG','STAGE',
      'AUDIENCE','SPOTLIGHT','ENCORE','SOLO','DUET'
    ],
    'Cats': [
      'WHISKERS','PURRING','KITTEN','TABBY','SIAMESE','PERSIAN',
      'CALICO','FLUFFY','MEOWING','PAWING','STRETCHING','NAPPING',
      'PLAYFUL','CLIMBING','SCRATCHING','GROOMING','CURIOUS','ADORABLE',
      'YARN','POUNCE','HISS','PURR','FUR','PAW','LEAP'
    ],
    'Gemstones': [
      'DIAMOND','RUBY','EMERALD','SAPPHIRE','PEARL','AMETHYST','TOPAZ',
      'OPAL','GARNET','CRYSTAL','NECKLACE','BRACELET','EARRINGS',
      'PENDANT','CHARM','LOCKET','TIARA','GEMSTONE','JEWEL','SPARKLE',
      'FACET','CARAT','GOLD','SILVER','PLATINUM'
    ],
    'Rainbows': [
      'RED','ORANGE','YELLOW','GREEN','BLUE','PURPLE','PINK','TURQUOISE',
      'CRIMSON','VIOLET','INDIGO','MAGENTA','SCARLET','LAVENDER','TEAL',
      'MAROON','GOLDEN','RAINBOW','PRISM','SPECTRUM','VIBRANT','PASTEL',
      'BRIGHT','VIVID','RADIANT'
    ]
  },

  general: {
    'Animals': [
      'ELEPHANT','GIRAFFE','PENGUIN','DOLPHIN','CHEETAH','KANGAROO',
      'PANDA','GORILLA','FLAMINGO','PARROT','OCTOPUS','CROCODILE',
      'HEDGEHOG','ARMADILLO','PLATYPUS','WOLVERINE','CHAMELEON',
      'NARWHAL','WALRUS','CAPYBARA','SLOTH','KOALA','JAGUAR','LEMUR',
      'TAPIR'
    ],
    'Food': [
      'PIZZA','BURGER','SPAGHETTI','SUSHI','TACOS','PANCAKES','WAFFLES',
      'SANDWICH','HOTDOG','POPCORN','LASAGNA','BURRITO','NOODLES',
      'PRETZEL','MEATBALL','CROISSANT','DUMPLING','KEBAB','NACHOS',
      'SMOOTHIE','FALAFEL','STRUDEL','QUICHE','FONDUE','CREPE'
    ],
    'Fruits and Vegetables': [
      'APPLE','BANANA','STRAWBERRY','WATERMELON','PINEAPPLE','MANGO',
      'BLUEBERRY','PEACH','CHERRY','KIWI','LEMON','COCONUT','BROCCOLI',
      'CARROT','SPINACH','TOMATO','AVOCADO','CUCUMBER','PUMPKIN',
      'ZUCCHINI','RADISH','TURNIP','ASPARAGUS','CELERY','PAPAYA'
    ],
    'Weather': [
      'SUNSHINE','RAINBOW','THUNDER','LIGHTNING','TORNADO','BLIZZARD',
      'HURRICANE','DRIZZLE','FOGGY','CLOUDY','WINDY','HAILSTORM',
      'FORECAST','BAROMETER','HUMIDITY','CELSIUS','CLIMATE','SNOWFLAKE',
      'CYCLONE','BREEZE','FROST','SLEET','GALE','STORM','MIST'
    ],
    'School': [
      'PENCIL','NOTEBOOK','BACKPACK','TEACHER','HOMEWORK','LIBRARY',
      'SCIENCE','HISTORY','READING','WRITING','SPELLING','CAFETERIA',
      'PLAYGROUND','PRINCIPAL','CLASSROOM','STUDENT','LESSON','PROJECT',
      'DIPLOMA','RECESS','SCHEDULE','LOCKER','HALLWAY','LUNCHBOX','CHALK'
    ],
    'Ocean Life': [
      'DOLPHIN','WHALE','OCTOPUS','LOBSTER','SEAHORSE','JELLYFISH',
      'STARFISH','SEAWEED','TSUNAMI','SUBMARINE','CORAL','ANEMONE',
      'MANATEE','NARWHAL','SWORDFISH','BARRACUDA','TUNA','CRAB','ORCA',
      'SQUID','PUFFERFISH','CLOWNFISH','ANCHOVY','HALIBUT','GROUPER'
    ],
    'Farm': [
      'TRACTOR','CHICKEN','ROOSTER','PIGLET','SHEEPDOG','DONKEY',
      'HAYSTACK','BARNYARD','HARVEST','SCARECROW','COMBINE','LIVESTOCK',
      'PASTURE','MEADOW','ORCHARD','CROPS','SILO','FARMHOUSE','GOAT',
      'TURKEY','RABBIT','BEEHIVE','CORNFIELD','FENCE','COOP'
    ],
    'Holidays': [
      'CHRISTMAS','HALLOWEEN','THANKSGIVING','EASTER','BIRTHDAY',
      'VALENTINE','HANUKKAH','DIWALI','FIREWORKS','CELEBRATE','PRESENT',
      'COSTUME','PUMPKIN','TURKEY','CANDLES','PARADE','FESTIVAL',
      'DECORATE','FAMILY','GATHER','TRADITION','RIBBON','WRAPPING',
      'ORNAMENT','STOCKING'
    ],
    'Countries': [
      'FRANCE','BRAZIL','JAPAN','AUSTRALIA','CANADA','MEXICO','GERMANY',
      'ITALY','CHINA','RUSSIA','SPAIN','EGYPT','INDIA','KENYA','NORWAY',
      'SWEDEN','GREECE','TURKEY','ARGENTINA','THAILAND','PERU','CHILE',
      'POLAND','UKRAINE','VIETNAM'
    ],
    'Instruments': [
      'GUITAR','PIANO','VIOLIN','TRUMPET','DRUMS','FLUTE','SAXOPHONE',
      'CELLO','KEYBOARD','HARP','ACCORDION','CLARINET','TROMBONE',
      'BASSOON','UKULELE','BANJO','HARMONICA','OBOE','CYMBAL',
      'XYLOPHONE','MANDOLIN','SITAR','BONGO','ZITHER','DULCIMER'
    ],
    'Space and Planets': [
      'MERCURY','VENUS','EARTH','MARS','JUPITER','SATURN','URANUS',
      'NEPTUNE','PLUTO','MOON','ASTEROID','COMET','GALAXY','NEBULA',
      'PULSAR','SUPERNOVA','COSMOS','UNIVERSE','ROCKET','ASTRONAUT',
      'ORBIT','GRAVITY','TELESCOPE','CRATER','SHUTTLE'
    ],
    'Nature': [
      'MOUNTAIN','VOLCANO','WATERFALL','CANYON','GLACIER','FOREST',
      'MEADOW','DESERT','SWAMP','TUNDRA','SAVANNA','JUNGLE','RAINFOREST',
      'PRAIRIE','PLATEAU','LAGOON','ESTUARY','DELTA','PENINSULA',
      'ARCHIPELAGO','CLIFF','VALLEY','RIDGE','GORGE','CAVERN'
    ],
    'Sports': [
      'FOOTBALL','BASEBALL','SOCCER','HOCKEY','TENNIS','SWIMMING',
      'TROPHY','ATHLETE','CHAMPION','VICTORY','REFEREE','PENALTY',
      'TACKLE','SPRINT','SCORE','TEAM','COACH','GOAL','MEDAL','REBOUND',
      'PITCHER','GOALIE','ASSIST','SERVE','VOLLEY'
    ],
    'Birds': [
      'EAGLE','PENGUIN','FLAMINGO','PARROT','TOUCAN','PEACOCK','HAWK',
      'FALCON','SPARROW','ROBIN','CARDINAL','BLUEBIRD','HUMMINGBIRD',
      'WOODPECKER','OWL','PELICAN','STORK','CRANE','HERON','ALBATROSS',
      'OSPREY','PUFFIN','KINGFISHER','SWALLOW','MARTIN'
    ],
    'Family': [
      'FAMILY','MOTHER','FATHER','SISTER','BROTHER','GRANDMA','GRANDPA',
      'COUSIN','KITCHEN','BEDROOM','BATHROOM','GARDEN','GARAGE',
      'BASEMENT','BACKYARD','FIREPLACE','CHIMNEY','MAILBOX','DRIVEWAY',
      'HALLWAY','WINDOW','CURTAIN','BOOKSHELF','PANTRY','PORCH'
    ]
  }

};

// ============================================================
// DIFFICULTY CONFIG
// ============================================================
const DIFFICULTY = {
  easy:   { size: 10, wordCount: 10 },
  medium: { size: 15, wordCount: 15 },
  hard:   { size: 20, wordCount: 20 }
};

// ============================================================
// WORD SEARCH ALGORITHM
// ============================================================
const DIRECTIONS = [
  [ 0,  1], // right
  [ 0, -1], // left
  [ 1,  0], // down
  [-1,  0], // up
  [ 1,  1], // down-right
  [ 1, -1], // down-left
  [-1,  1], // up-right
  [-1, -1]  // up-left
];

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function canPlace(grid, word, row, col, dr, dc) {
  const size = grid.length;
  for (let i = 0; i < word.length; i++) {
    const r = row + i * dr;
    const c = col + i * dc;
    if (r < 0 || r >= size || c < 0 || c >= size) return false;
    if (grid[r][c] && grid[r][c] !== word[i]) return false;
  }
  return true;
}

function placeWord(grid, word, row, col, dr, dc) {
  for (let i = 0; i < word.length; i++) {
    grid[row + i * dr][col + i * dc] = word[i];
  }
}

function generateGrid(size, words) {
  const grid = Array.from({ length: size }, () => Array(size).fill(''));
  const placed = [];

  for (const word of words) {
    // Build all possible (row, col, direction) placements and shuffle
    const tries = [];
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        for (const [dr, dc] of DIRECTIONS) {
          tries.push([r, c, dr, dc]);
        }
      }
    }
    const shuffled = shuffle(tries);

    for (const [r, c, dr, dc] of shuffled) {
      if (canPlace(grid, word, r, c, dr, dc)) {
        placeWord(grid, word, r, c, dr, dc);
        placed.push(word);
        break;
      }
    }
  }

  // Fill empty cells with random letters
  const alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (!grid[r][c]) {
        grid[r][c] = alpha[Math.floor(Math.random() * 26)];
      }
    }
  }

  return { grid, placed };
}

// ============================================================
// DOM HELPERS
// ============================================================
function populateTopics(gender) {
  const topicEl = document.getElementById('topic');
  const topics = Object.keys(WORD_LISTS[gender]);
  topicEl.innerHTML = topics.map(t =>
    `<option value="${t}">${t}</option>`
  ).join('');
}

function renderGrid(grid, size) {
  const el = document.getElementById('ws-grid');
  el.style.gridTemplateColumns = `repeat(${size}, 32px)`;
  el.style.setProperty('--cols', size);
  el.setAttribute('data-size', size);
  el.innerHTML = '';

  for (const row of grid) {
    for (const letter of row) {
      const cell = document.createElement('div');
      cell.className = 'ws-cell';
      cell.textContent = letter;
      el.appendChild(cell);
    }
  }
}

function renderWordList(words) {
  const el = document.getElementById('word-list-items');
  el.innerHTML = words.map(w =>
    `<span class="word-item">${w}</span>`
  ).join('');
}

// ============================================================
// GENERATE
// ============================================================
function generate() {
  const diffKey  = document.getElementById('difficulty').value;
  const gender   = document.getElementById('gender').value;
  const topic    = document.getElementById('topic').value;

  const { size, wordCount } = DIFFICULTY[diffKey];
  const pool = WORD_LISTS[gender][topic];

  // Filter to words that fit in the grid, then randomly pick wordCount of them
  const eligible = pool.filter(w => w.length <= size);
  const selected = shuffle(eligible).slice(0, wordCount);

  const { grid, placed } = generateGrid(size, selected);

  // Titles
  document.getElementById('puzzle-title').textContent = `${topic} Word Search`;
  document.getElementById('puzzle-subtitle').textContent =
    `Find all ${placed.length} hidden words!`;

  renderGrid(grid, size);
  renderWordList(placed.slice().sort());

  const output = document.getElementById('output');
  output.classList.remove('hidden');
  output.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ============================================================
// INIT
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  const genderEl   = document.getElementById('gender');
  const generateEl = document.getElementById('generate-btn');
  const regenEl    = document.getElementById('regen-btn');
  const printEl    = document.getElementById('print-btn');

  populateTopics(genderEl.value);

  genderEl.addEventListener('change', () => populateTopics(genderEl.value));
  generateEl.addEventListener('click', generate);
  regenEl.addEventListener('click', generate);
  printEl.addEventListener('click', () => window.print());
});
