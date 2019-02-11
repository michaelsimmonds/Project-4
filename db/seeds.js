require('dotenv').config()

const mongoose = require('mongoose')
const config = require('../config/environment')
// const Promise = require('bluebird')

mongoose.Promise = Promise

const Place = require('../models/place')
const User = require('../models/user')

let seedPlaces = []
let seedUser = []
mongoose.connect(config.dbURI, (err, db) => {
  db.dropDatabase()
    .then(()=> Place.create({
      name: 'Machu Picchu',
      country: 'Peru',
      image: 'https://www.sungatetours.com/wp-content/uploads/2014/03/Panoramic-View-of-Machu-Pichu-Citadel.jpg',
      descriptLong: 'Machu Picchu is a 15th-century Inca citadel located in the Cusco Region, Peru, above the Sacred Valley. Most archaeologists believe that Machu Picchu was built as an estate for the Inca emperor Pachacuti (1438–1472). Often mistakenly referred to as the “Lost City of the Incas” (a title more accurately applied to Vilcabamba), it is the most familiar icon of Inca civilization. The Incas built the estate around 1450 but abandoned it a century later at the time of the Spanish Conquest. Although known locally, it was not known to the Spanish during the colonial period and remained unknown to the outside world until American historian Hiram Bingham brought it to international attention in 1911.',
      descriptShort: 'Machu Picchu is a 15th-century Inca citadel located in the Cusco Region, Peru, above the Sacred Valley',
      geog: [13.1631, 72.5450]
    },{
      name: 'Niagra Falls',
      country: 'Canada/USA',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/3Falls_Niagara.jpg/330px-3Falls_Niagara.jpg',
      descriptLong: 'Niagara Falls is to waterfalls as the Great Wall of China is to walls, which is to say, it\'s not your average waterfall. Niagara Falls is really the collective name for three falls that straddle the United States/Canada border, as well as the names of the New York and Ontario cities that share the border. More than 3,000 tons of water thunder over the falls every second, and thousands of tourists are usually there to see it. Whether you plan to view Niagara Falls from the U.S. side or the Canadian side, it\'s possible to enjoy the sights without getting wet. But it\'s not as much fun.',
      descriptShort: 'Niagra Falls is the collective name of the three waterfalls which straddle the international border beween Canada and the Untied States',
      geog: [43.0799, 79.0747]
    },{
      name: 'Chichen Itza',
      country: 'Mexico',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Chichen_Itza_3.jpg/540px-Chichen_Itza_3.jpg',
      descriptLong: 'Chichen Itza was a major focal point in the Northern Maya Lowlands from the Late Classic (c. AD 600–900) through the Terminal Classic (c. AD 800–900) and into the early portion of the Postclassic period (c. AD 900–1200). The site exhibits a multitude of architectural styles, reminiscent of styles seen in central Mexico and of the Puuc and Chenes styles of the Northern Maya lowlands. The presence of central Mexican styles was once thought to have been representative of direct migration or even conquest from central Mexico, but most contemporary interpretations view the presence of these non-Maya styles more as the result of cultural diffusion.',
      descriptShort: 'Chichen Itza was a large pre-Columbian city built by the Maya people of the Terminal Classic period. It is located in the Yucatan Peninsula of Mexico',
      geog: [20.4059, 88.3470]
    },{
      name: 'Uluru',
      country: 'Australia',
      image: 'https://cdn2.veltra.com/ptr/20161216103725_1899709985_13206_0.jpg?imwidth=550&impolicy=custom',
      descriptLong: 'Uluru is sacred to the Pitjantjatjara Anangu, the Aboriginal people of the area. The area around the formation is home to an abundance of springs, waterholes, rock caves and ancient paintings. Uluru is listed as a UNESCO World Heritage Site. Uluru and Kata Tjuta, also known as the Olgas, are the two major features of the Uluṟu-Kata Tjuṯa National Park.',
      descriptShort: 'Uluru, one of Australia\'s most recognisable natural landmarks is a large snadstone rock formation in the Northern Territory in central Austrilia',
      geog: [25.2042, 131.0210]
    },{
      name: 'Taj Mahal',
      country: 'India',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Taj_Mahal_%28Edited%29.jpeg/375px-Taj_Mahal_%28Edited%29.jpeg',
      descriptLong: 'The Taj Mahal was commissioned in 1632 by the Mughal emperor, Shah Jahan (reigned from 1628 to 1658), to house the tomb of his favourite wife, Mumtaz Mahal. The tomb is the centerpiece of a 17-hectare (42-acre) complex, which includes a mosque and a guest house, and is set in formal gardens bounded on three sides by a crenellated wall. Construction of the mausoleum was essentially completed in 1643 but work continued on other phases of the project for another 10 years. The Taj Mahal complex is believed to have been completed in its entirety in 1653 at a cost estimated at the time to be around 32 million rupees, which in 2015 would be approximately 52.8 billion rupees (U.S. $827 million). The construction project employed some 20,000 artisans under the guidance of a board of architects led by the court architect to the emperor, Ustad Ahmad Lahauri.',
      descriptShort: 'The Taj Mahal (meaning "Crown of the Palaces") is an ivory-white marble mausoleum on the south bank of the Yamuna river in the Indian city of Agra',
      geog: [27.1030, 78.0231]
    },{
      name: 'Petra',
      country: 'Jordan',
      image: 'https://cdn.getyourguide.com/img/tour_img-835917-146.jpg',
      descriptLong: 'Inhabited since prehistoric times, this Nabataean caravan-city, situated between the Red Sea and the Dead Sea, was an important crossroads between Arabia, Egypt and Syria-Phoenicia. Petra is half-built, half-carved into the rock, and is surrounded by mountains riddled with passages and gorges. It is one of the world\'s most famous archaeological sites, where ancient Eastern traditions blend with Hellenistic architecture. It has been a UNESCO World Heritage Site since 1985 and was described as "one of the most precious cultural properties of man\'s cultural heritage"',
      descriptShort: 'Petra, originally known to its inhabitants as Raqmu, is a historical and archaeological city in southern Jordan',
      geog: [30.1943, 35.2631]
    },{
      name: 'The Colosseum',
      country: 'Italy',
      image: 'https://www.natgeokids.com/wp-content/uploads/2017/02/20141020082417578960802.jpg',
      descriptLong: 'The Colosseum began construction under the emperor Vespasian in AD 72,[2] and was completed in AD 80 under his successor and heir Titus. It could hold, it is estimated, between 50,000 and 80,000 spectators, having an average audience of some 65,000; it was used for gladiatorial contests and public spectacles such as mock sea battles (for only a short time as the hypogeum was soon filled in with mechanisms to support the other activities), animal hunts, executions, re-enactments of famous battles, and dramas based on Classical mythology. The building ceased to be used for entertainment in the early medieval era. It was later reused for such purposes as housing, workshops, quarters for a religious order, a fortress, a quarry, and a Christian shrine. It is an iconic symbol of ancient Rome',
      descriptShort: 'The Colosseum is an oval amphitheatre in the centre of the city of Rome, Italy.',
      geog: [41.5325, 12.2932]
    },{
      name: 'Red Square',
      country: 'Russia',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Moscow_July_2011-16.jpg/330px-Moscow_July_2011-16.jpg',
      descriptLong: 'Red Square is often considered to be the central square of Moscow since the city\'s major streets, which connect to Russia\'s major highways, originate in the square.The rich history of Red Square is reflected in many paintings by Vasily Surikov, Konstantin Yuon and others. The square was meant to serve as Moscow\'s main marketplace. It was also the site of various public ceremonies and proclamations, and occasionally a coronation for Russia\'s Tsars would take place. The square has been gradually built up since that point and has been used for official ceremonies by all Russian governments since it was established.',
      descriptShort: 'Red Square is a square in Moscow, Russia, which separates the Kremlin from a historic merchant quarter known as Kitai-gorod.',
      geog: [50.4515, 37.3712]
    },{
      name: 'Buckingham Palace',
      country: 'England',
      image: 'https://cdn.getyourguide.com/img/tour_img-1166658-146.jpg',
      descriptLong: 'Originally known as Buckingham House, the building at the core of today\'s palace was a large townhouse built for the Duke of Buckingham in 1703 on a site that had been in private ownership for at least 150 years. It was acquired by King George III in 1761[4] as a private residence for Queen Charlotte and became known as The Queen\'s House. During the 19th century it was enlarged, principally by architects John Nash and Edward Blore, who constructed three wings around a central courtyard. Buckingham Palace became the London residence of the British monarch on the accession of Queen Victoria in 1837. The last major structural additions were made in the late 19th and early 20th centuries, including the East Front, which contains the well-known balcony on which the royal family traditionally congregates to greet crowds. The palace chapel was destroyed by a German bomb during World War II; the Queen\'s Gallery was built on the site and opened to the public in 1962 to exhibit works of art from the Royal Collection.',
      descriptShort: 'Buckingham Palace is the London residence and administrative headquarters of the monarch of the United Kingdom',
      geog: [51.3030, 0.0831]
    },{
      name: 'Hagia Sophia',
      country: 'Turkey',
      image: 'https://www.turkeyhomes.com/uploads/blogs/hagia-sophia.jpg',
      descriptLong: 'Built in 537 AD at the beginning of the Middle Ages, it was famous in particular for its massive dome. It was the world\'s largest building and an engineering marvel of its time. It is considered the epitome of Byzantine architecture and is said to have "changed the history of architecture". In 1934 Turkish President Kemal Atatürk secularized the building, and in 1935 it was made into a museum. Art historians consider the building’s beautiful mosaics to be the main source of knowledge about the state of mosaic art in the time shortly after the end of the Iconoclastic Controversy in the 8th and 9th centuries.The Hagia Sophia is a component of a UNESCO World Heritage site called the Historic Areas of Istanbul (designated 1985), which includes that city’s other major historic buildings and locations.',
      descriptShort: 'Hagia Sophia is a former Greek Orthodox Christian patriarchal cathedral, later an Ottoman imperial mosque and now a museum in Istanbul, Turkey',
      geog: [41.0031, 28.5848]
    },{
      name: 'The Grand Canyon',
      country: 'United States of America',
      image: 'https://www.canyontours.com/wp-content/uploads/2015/01/grand-canyon-south-rim-tour-bright-angel-point.jpg',
      descriptLong: 'The canyon and adjacent rim are contained within Grand Canyon National Park, the Kaibab National Forest, Grand Canyon-Parashant National Monument, the Hualapai Indian Reservation, the Havasupai Indian Reservation and the Navajo Nation. President Theodore Roosevelt was a major proponent of preservation of the Grand Canyon area, and visited it on numerous occasions to hunt and enjoy the scenery. For thousands of years, the area has been continuously inhabited by Native Americans, who built settlements within the canyon and its many caves. The Pueblo people considered the Grand Canyon a holy site, and made pilgrimages to it',
      descriptShort: 'The Grand Canyon is a steep-sided canyon carved by the Colorado River in Arizona, United States. The Grand Canyon is 277 miles long, up to 18 miles wide and attains a depth of over a mile.',
      geog: [38.18, 112.36]
    },{
      name: 'The Great Wall of China',
      country: 'China',
      image: 'https://images.immediate.co.uk/volatile/sites/7/2016/07/GettyImages-481614053-484c86d.jpg?quality=45&resize=620,413',
      descriptLong: 'It was constructed to protect the Chinese states and empires against the raids and invasions of the various nomadic groups of the Eurasian Steppe with an eye to expansion. Several walls were being built from as early as the 7th century BC; these were later joined together and made bigger by Qin Shi Huang (220–206 BC), the first Emperor of China. Little of that wall remains. Later on, many successive dynasties have repaired, maintained, and newly built multiple stretches of border walls. The most well-known of the walls were built during the Ming Dynasty (1368–1644).Today, the Great Wall is generally recognized as one of the most impressive architectural feats in history.',
      descriptShort: 'The Great Wall of China is a series of fortifications made of stone, brick, tamped earth, wood, and other materials, generally built along an east-to-west line across the historical northern borders of China',
      geog: [40.68, 117.23]
    }))
    .then((places) => seedPlaces = places)
    .then(() => {
      return User.create({
        username: 'admin',
        email: 'admin',
        password: 'admin',
        passwordConfirmation: 'admin',
        places: [seedPlaces[0], seedPlaces[1], seedPlaces[2]],
        location: []
      })
    })
    .then((user) => seedUser = user)
    .then(() => console.log(seedPlaces))
    .then(() => console.log(seedUser))
    .then(() => console.log('Database successfully seeded'))
    .catch(err => console.log(err))
    .finally(() => mongoose.connection.close())
})
