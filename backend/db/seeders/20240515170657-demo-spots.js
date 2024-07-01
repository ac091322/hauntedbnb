'use strict';

const { Spot } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = "Spots";
    await Spot.bulkCreate([
      {
        ownerId: 1,
        address: "13 Rue Toulouse",
        city: "New Orleans",
        state: "LA",
        country: "USA",
        lat: 29.9330,
        lng: -90.0756,
        name: "Unveiling Whispers: The Blackwood Manor",
        description: "Dare to step into the captivating, yet eerily silent, Blackwood Manor. Nestled in the heart of New Orleans' historic Garden District, this meticulously restored Victorian mansion holds secrets beneath its ornate facade. Soaring ceilings and intricate moldings cast long shadows, while rich hardwood floors creak with whispers of the past. Four spacious guest rooms await, each elegantly appointed with period furniture and plush bedding. But will sleep find you? Or will you be kept awake by the unseen residents who linger within these walls? Unwind by a crackling fireplace in the grand parlor, if you dare.  Indulge in a cup of tea in the sunroom overlooking the lush courtyard, but keep an eye out for fleeting shadows that flit across the glass. Explore the hidden nooks and crannies of this captivating residence, but remember, you may not be alone. Blackwood Manor offers a unique experience, perfect for those seeking a taste of history... and perhaps a brush with the unknown.",
        price: 260
      },
      {
        ownerId: 1,
        address: "91 Gallows Hill Road",
        city: "Hancock",
        state: "ME",
        country: "USA",
        lat: 44.7872,
        lng: -68.0128,
        name: "Hollow Creek Asylum",
        description: "Eerie silence hangs heavy in the air, broken only by the creak of floorboards underfoot and the unsettling sigh of the wind whistling through shattered windows. As you explore the deserted corridors of the abandoned Hollow Creek Asylum, a shiver crawls down your spine. The peeling wallpaper whispers forgotten stories, and the shadows seem to writhe with unseen movement. Here, in this crumbling monument to a bygone era of medicine, you'll swear you can feel the weight of countless anguished souls who once walked these very paths. Dare you spend a night in this paranormal playground? Just be prepared for the whispers in the dark...",
        price: 660
      },
      {
        ownerId: 1,
        address: "66 Grim Pike Lane",
        city: "Thurmond",
        state: "WV",
        country: "USA",
        lat: 37.8000,
        lng: -81.2333,
        name: "Crimson Hook Slaughter",
        description: "Nestled in the forgotten shadows of Shanksville, West Virginia, the Crimson Hook Slaughter stands as a chilling monument to a bygone era.  Erected in the late 18th century, the slaughterhouse processed countless souls before its closure in the early 1900s.  Legends of mistreated cattle and whispers of unexplained accidents linger in the decaying timber.  The locals avoid the area, their fear a palpable presence that chills you to the bone.  Now, the slaughterhouse awaits...could it be your next eerie escape? But be warned, the rumors of restless spirits and lingering moans may not be mere whispers.  The Crimson Hook Slaughter promises a hauntingly unforgettable stay,  but only for the brave souls who dare to unlock its dark secrets.",
        price: 75
      },
      {
        ownerId: 1,
        address: "2 Elm Street",
        city: "Northampton",
        state: "MA",
        country: "USA",
        lat: 42.3576,
        lng: -72.6367,
        name: "Miss Willowbrook's Academy",
        description: "A decaying jewel amidst the rolling hills of Northampton, Massachusetts, lies Miss Willowbrook's Academy. Its once pristine Georgian brick facade is marred by chipped paint and shattered windows. The air hangs heavy with an unsettling quiet, a stark contrast to the vibrant laughter that once filled its halls. Rumors swirl about a tragic accident that claimed the life of the beloved founder, Miss Willowbrook, and the whispers suggest her spirit may forever linger within the school walls, a silent guardian or a sorrowful reminder of the past.",
        price: 910
      },
      {
        ownerId: 1,
        address: "404 Masque Alley",
        city: "San Francisco",
        state: "CA",
        country: "USA",
        lat: 37.7697,
        lng: -122.4376,
        name: "The Phantom Playhouse",
        description: "Shrouded in the vibrant bustle of San Francisco's Castro district, a chilling secret awaits within the opulent walls of the abandoned Orpheum Theatre.  This once-grand playhouse, a mirror image of the historic Castro Theatre, now stands as a haunting monument to forgotten applause.  Legends whisper of a devastating earthquake on opening night, forever trapping the souls of performers within its ornate facade.  Eerie music and phantasmagoric shadows flicker beneath the dusty chandeliers, beckoning the curious and the courageous.  Dare you step inside The Orpheum's Echoes and witness the chilling remnants of a theatrical tragedy? But a word of warning: The silence within The Orpheum Theatre can be suffocating, broken only by the mournful sigh of the tattered velvet curtains and the unsettling applause that erupts from unseen sources.  An unseen chill hangs heavy in the air, and fleeting glimpses of spectral figures bow in the spotlight.  Will you become the next guest to unravel the mysteries of The Orpheum's Echoes, or will you be swept away by the chilling applause of its restless audience?",
        price: 1200
      },
      {
        ownerId: 2,
        address: "679 Blackwood Lane",
        city: "Sleepy Hollow",
        state: "NY",
        country: "USA",
        lat: 41.1345,
        lng: -73.8917,
        name: "Sleepy Hollow's Secret: The Crypt Awaits",
        description: "Descend into a bygone era at the Whispering Crypt, a hauntingly beautiful bed and breafast nestled beneath a forgotten chapel. This captivating crypt offers a unique accommodation experience, steeped in history and a touch of the otherworldly. Explore the labyrinthine corridors, adorned with weathered stone and cryptic symbols, and lose yourself in the captivating atmosphere.",
        price: 350
      },
      {
        ownerId: 2,
        address: "400 S State St",
        city: "Chicago",
        state: "IL",
        country: "USA",
        lat: 41.8878,
        lng: -87.6321,
        name: "The Chicago Public Library",
        description: "The Chicago Public Library, once a beacon of knowledge, now loomed as a monument to forgotten lore. Dusk painted the sky an unsettling bruise purple, mirroring the discolored veins of marble that ran through the building's facade. Cobwebs, thick and dusty, clung to the ornate carvings like spectral shrouds. Inside, an unnatural silence reigned, broken only by the occasional creak of the ancient oak doors or the skittering of unseen things across the polished marble floors. Towering bookshelves, once bursting with stories, stood half-empty, their remaining volumes shrouded in an unnatural gloom that seemed to swallow the meager light filtering through grime-coated windows. An unsettling chill hung heavy in the air, a tangible reminder of the secrets this grand library held captive.",
        price: 0
      },
      {
        ownerId: 2,
        address: "City Hall Park",
        city: "New York City",
        state: "NY",
        country: "USA",
        lat: 40.7126,
        lng: -74.0040,
        name: "City Hall Station",
        description: "City Hall Station, which opened in 1904 and was closed in 1945, is renowned not only for its stunning architecture but also for reports of paranormal activity. Visitors and workers have reported hearing unexplained voices, footsteps, and even seeing apparitions, contributing to its reputation as a haunted location.",
        price: 20
      },
      {
        ownerId: 2,
        address: "999 Ravenwood Lane",
        city: "Estes Park",
        state: "CO",
        country: "USA",
        lat: 40.3772,
        lng: -105.5217,
        name: "Grimhaven Castle",
        description: "High atop a craggy peak overlooking Estes Park, shrouded in perpetual mist, stands Grimhaven Castle. Its once-proud ramparts are now a jagged silhouette against the stormy Colorado sky.  Legends whisper of a powerful sorcerer who once resided within, his dark magic leaving a permanent stain on the land.  Now, the castle stands as a chilling monument to his misdeeds.  Ominous silence hangs heavy in the air, broken only by the mournful cry of ravens circling the crumbling towers.  Foolish souls who dare venture near Grimhaven speak of flickering lights in the dead of night, disembodied voices echoing through the halls, and a sense of unseen eyes watching their every move.  Will you become the next victim of Grimhaven's curse, or can you unravel the secrets that bind this forsaken castle to its sinister past?",
        price: 800
      },
      {
        ownerId: 2,
        address: "1919 Eerie Avenue",
        city: "Savannah",
        state: "GA",
        country: "USA",
        lat: 32.0817,
        lng: -81.0800,
        name: "Dreadland Amusement Park",
        description: "Step into the whimsical and mysterious world of Dreadland, nestled in the heart of historic Savannah, Georgia. This enchanting park blends the thrill of rides with the allure of the supernatural. Wander through the Ghostly Grove, where ancient oak trees cast eerie shadows and whispers of ghostly laughter echo through the air. Brave the Haunted House of Mirrors, where reflections twist and turn, revealing phantoms lurking just beyond the glass. The Phantom Coaster races through the misty marshes, its tracks disappearing into the fog, rumored to be haunted by the spirits of past riders. At dusk, the Carousel of Whispers spins softly, playing haunting melodies that seem to beckon lost souls to dance. Dreadland Amusement Park offers an unforgettable blend of eerie charm and thrilling adventure, where every corner holds a ghostly surprise.",
        price: 166
      },
      {
        ownerId: 3,
        address: "130 Coffin Gate Avenue",
        city: "St. Augustine",
        state: "Florida",
        country: "USA",
        lat: 29.89,
        lng: 81.31,
        name: "The Wysteria",
        description: "Step into a bygone era at The Wysteria, a meticulously restored Victorian gem nestled amidst a bustling modern city. Its crimson brick facade, adorned with delicate white trim and overflowing wisteria vines, whispers of a bygone elegance. But beneath the surface, a darker history lingers. The Wysteria Manor isn't for the faint of heart. It's a place where the veil between worlds seems thin, where shadows dance with a life of their own, and the air is thick with the scent of forgotten memories. Are you brave enough to become part of its chilling legacy?",
        price: 1500
      },
      {
        ownerId: 3,
        address: "66 Carnival Lane",
        city: "San Antonio",
        state: "TX",
        country: "USA",
        lat: 29.4241,
        lng: -98.4936,
        name: "Le Freakatorium",
        description: "Welcome to Le Freakatorium, a place where shadows writhe and nightmares take center stage.  This ramshackle circus, shrouded in perpetual twilight, is no place for the faint of heart.  Peer behind tattered curtains to find creatures of legend and oddities that defy explanation.  Listen closely, for the moans of the monstrosities might be your only warning.",
        price: 66
      },
      {
        ownerId: 3,
        address: "6613 Unholy Lane",
        city: "Vicksburg",
        state: "MS",
        country: "USA",
        lat: 32.3526,
        lng: -90.8779,
        name: "The Devil's Vestry: Chronicles St. Lucian's",
        description: "Welcome to 6613 Unholy Lane, a hauntingly beautiful B&B nestled in the heart of historic Vicksburg, Mississippi. Once a somber chapel known as The Devil's Vestry, this establishment exudes an eerie charm that captivates and unsettles in equal measure. Guests who dare to stay here often find themselves enveloped in an atmosphere thick with paranormal energy. Shadowy figures are glimpsed fleetingly in the corners of rooms, and disembodied whispers echo through the halls during the quiet hours of night. The air grows cold, and inexplicable drafts stir the curtains, leaving an undeniable sense of a presence just beyond the veil of reality. Despite its tranquil facade, the B&B's stained glass windows cast unsettling patterns across the antique furniture, as if hinting at stories untold and mysteries yet uncovered. For those with a penchant for the supernatural, 6613 Unholy Lane offers an unforgettable stay—a journey into the unknown where every creak of the floorboards and flicker of candlelight holds the promise of encountering the lingering spirits of its haunted past.",
        price: 313
      },
      {
        ownerId: 3,
        address: "Ghost Town Boulevard",
        city: "Jerome",
        state: "AZ",
        country: "USA",
        lat: 34.7498,
        lng: -112.1138,
        name: "Prospector's Hollow",
        description: "Welcome to Prospector's Hollow, a once-thriving mining town nestled in the rugged hills of Arizona, now frozen in time amidst whispers of its haunting past. This ghostly enclave offers a unique retreat for those seeking an otherworldly experience. The town's abandoned streets are lined with weathered buildings, remnants of a bygone era where prospectors once sought fortune in the depths of the earth. As night falls, the air thickens with tales of spectral sightings—miners wandering in search of lost treasure, and the ghostly echoes of pickaxes striking rock. The BNB itself, a former miner's lodge, stands as a sentinel to the town's history, its creaking floorboards and flickering lanterns adding to the eerie ambiance. Guests brave enough to stay may encounter cold spots, mysterious footsteps, or the fleeting glimpse of a shadowy figure. Yet amidst the chill of the ghostly presence, there's an undeniable allure, inviting adventurers to unravel the secrets buried within Prospector's Hollow.",
        price: 560
      },
      {
        ownerId: 3,
        address: "613 Wraith Lane",
        city: "Oakwood Falls",
        state: "OR",
        country: "USA",
        lat: 44.6214,
        lng: -123.0686,
        name: "Lost Souls Penitentiary",
        description: "ost Souls Penitentiary, situated on the outskirts of Oakwood Falls, Oregon, has stood as a somber sentinel since its construction in the late 19th century. Originally built to incarcerate the region's most hardened criminals, the prison quickly garnered a macabre reputation that lingers to this day. Within its formidable walls, stories abound of spectral figures wandering the dimly lit corridors, their presence felt but never seen by the living. Visitors and staff alike report inexplicable cold spots, disembodied voices whispering from empty cells, and the unsettling feeling of being watched by unseen eyes. Despite attempts at renovation and repurposing, the ghostly echoes of its dark past persist, drawing thrill-seekers and paranormal enthusiasts to Oakwood Falls in search of encounters with the lost souls that still call the penitentiary home.",
        price: 770
      },
      {
        ownerId: 4,
        address: "Point Reyes National Seashore",
        city: "Bodega Bay",
        state: "CA",
        country: "USA",
        lat: 38.3332,
        lng: -123.0481,
        name: "The Harbinger of Despair",
        description: "Experience the chilling allure of The Harbinger of Despair, a once-luxurious cruise liner forever moored off the coast of Bodega Bay, California. Its opulent halls are now silent tombs, whispers of tragedy clinging to the decaying grandeur. Legends of a doomed voyage and restless spirits linger in the salty air. Dare to embark on a paranormal adventure unlike any other.",
        price: 845
      },
      {
        ownerId: 4,
        address: "Miner's Canyon Rd",
        city: "Goldfield",
        state: "NV",
        country: "USA",
        lat: 37.8058,
        lng: -117.0028,
        name: "The Blighted Acre",
        description: "Deep within the desolate expanse of the Great Basin Desert in Nevada lies The Blighted Acre.  This forgotten patch of earth, ravaged by scorching sun and relentless winds, is a stark cemetery where weathered headstones jut from the cracked earth.  Ghostly sagebrush rolls like waves across the barren landscape, the only movement in this desolate place.  The air hangs heavy with an oppressive silence, broken only by the mournful cry of ravens circling overhead.  Legends whisper of a mining disaster that claimed countless lives, leaving the restless spirits forever trapped within The Blighted Acre, searching for solace in the unforgiving desert night.",
        price: 99
      },
      {
        ownerId: 4,
        address: "27 Blackwood Manor Drive",
        city: "Salem",
        state: "MA",
        country: "USA",
        lat: 42.5136,
        lng: -70.8833,
        name: "Draculesti Manor",
        description: "Atop the windswept cliffs overlooking the churning North Atlantic stands Draculesti Manor, a monument to a bygone age and a chilling testament to a timeless evil.  Carved from the dark, volcanic rock of the cliffs themselves, the manor appears as a natural extension of the ominous landscape.  Jagged gargoyle statues leer out from the crumbling facade, their vacant eyes seemingly tracking the movements of the gulls that wheel overhead.  An iron portcullis, adorned with the twisted visage of a raven, guards the single, narrow entrance. Inside, the air hangs heavy with the scent of aged parchment and woodsmoke.  Dim torches, flickering in iron sconces, cast an flickering, orange glow upon the cavernous halls.  Cobwebs, spun thick and dusty, drape from the vaulted ceilings, and suits of rusted armor stand sentinel in shadowed corners.  A long, ornately carved table, its surface etched with arcane symbols, dominates the central chamber.  Behind it, a massive stone fireplace, its maw perpetually black, seems to pulse with an unseen heat.  Draculesti Manor is a place of brooding presence and chilling power, a true Transylvanian haven for a creature of the night.",
        price: 410
      },
      {
        ownerId: 4,
        address: "1 Wicked Way",
        city: "Chapel Hill",
        state: "NC",
        country: "USA",
        lat: 35.9132,
        lng: -79.0558,
        name: "The Candy Castle's Grim Grin",
        description: "Description: Step inside the Candy Castle, a haven bathed in sugary hues and adorned with the most adorable dolls you've ever seen. But don't be fooled by their button eyes and rosy cheeks. A sinister secret lurks beneath the frosting-trimmed windows. Pastel walls conceal cryptic symbols, and the dolls, though undeniably cute, hold unsettling smiles. Cobwebs cling to the rocking chair in the corner, and a single candle casts dancing shadows that hint at a darkness far deeper than pretend tea parties. The Candy Castle promises sweetness, but delivers a chilling truth: sometimes, the cutest things hide the most wicked intentions.",
        price: 550
      },
      {
        ownerId: 4,
        address: "Dead End Road ",
        city: "New Shoreham",
        state: "RI",
        country: "USA",
        lat: 41.1697,
        lng: -71.5508,
        name: "Adventure: Zombie Island",
        description: "Welcome to Zombie Island, a once-tranquil paradise ravaged by a mysterious plague. Lush vegetation creeps over decaying buildings, a haunting reminder of the island's tragic past. The air hangs heavy with the moans of the restless dead, shuffling hordes that roam the island under the cloak of night.  Nature and undeath are locked in a perpetual struggle on this isolated landmass.",
        price: 6390
      }
      // {
      //   ownerId: 5,
      //   address: "123 Seeder Blvd",
      //   city: "Union City",
      //   state: "CA",
      //   country: "USA",
      //   lat: 34.0094,
      //   lng: -118.4965,
      //   name: "A seeder spot where I live",
      //   description: "This is a fake spot that you should book.",
      //   price: 100
      // },
      // {
      //   ownerId: 5,
      //   address: "699 Fake Ave",
      //   city: "Millbrae",
      //   state: "CA",
      //   country: "USA",
      //   lat: 34.0094,
      //   lng: -118.4965,
      //   name: "The city where I used to work.",
      //   description: "I used to work in this over-priced city across the Bay.",
      //   price: 980
      // },
      // {
      //   ownerId: 5,
      //   address: "911 Police St",
      //   city: "Oakland",
      //   state: "CA",
      //   country: "USA",
      //   lat: 34.0094,
      //   lng: -118.4965,
      //   name: "Nice quiet spot in Oakland.",
      //   description: "No shootings nearby, it's safe to book.",
      //   price: 10
      // },
      // {
      //   ownerId: 5,
      //   address: "000 Nonexistent Ln",
      //   city: "Fremont",
      //   state: "CA",
      //   country: "USA",
      //   lat: 34.0094,
      //   lng: -118.4965,
      //   name: "Fake address.",
      //   description: "I don't think this address even exists.",
      //   price: 10
      // },
      // {
      //   ownerId: 5,
      //   address: "999 Last Seeder Ct",
      //   city: "Santa Cruz",
      //   state: "CA",
      //   country: "USA",
      //   lat: 34.0094,
      //   lng: -118.4965,
      //   name: "Fake house by the sea.",
      //   description: "Overlooking the bay, this fake spot is incredible.",
      //   price: 610
      // }
    ], { validate: true });
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Spots";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      ownerId: { [Op.in]: [1, 2, 3, 4, 5, 6] }
    }, {});
  }
};
