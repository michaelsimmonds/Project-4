require('dotenv').config()

const mongoose = require('mongoose')
const config = require('../config/environment')

mongoose.Promise = Promise

const Place = require('../models/place')
const User = require('../models/user')

mongoose.connect(config.dbURI, (err, db) => {
  db.dropDatabase()
    .then(()=> Place.create({
      name: 'Machu Picchu',
      country: 'Peru',
      image: 'https://www.sungatetours.com/wp-content/uploads/2014/03/Panoramic-View-of-Machu-Pichu-Citadel.jpg',
      descriptLong: 'Machu Picchu is a 15th-century Inca citadel located in the Cusco Region, Peru, above the Sacred Valley. Most archaeologists believe that Machu Picchu was built as an estate for the Inca emperor Pachacuti (1438–1472). Often mistakenly referred to as the “Lost City of the Incas” (a title more accurately applied to Vilcabamba), it is the most familiar icon of Inca civilization. The Incas built the estate around 1450 but abandoned it a century later at the time of the Spanish Conquest. Although known locally, it was not known to the Spanish during the colonial period and remained unknown to the outside world until American historian Hiram Bingham brought it to international attention in 1911.',
      descriptShort: 'Machu Picchu is a 15th-century Inca citadel located in the Cusco Region, Peru, above the Sacred Valley',
      geog: [-13.1631, -72.5450],
      budget1: '12',
      budget2: '33',
      budget3: '105'
    },{
      name: 'Niagra Falls',
      country: 'Canada/USA',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/3Falls_Niagara.jpg/330px-3Falls_Niagara.jpg',
      descriptLong: 'Niagara Falls is to waterfalls as the Great Wall of China is to walls, which is to say, it\'s not your average waterfall. Niagara Falls is really the collective name for three falls that straddle the United States/Canada border, as well as the names of the New York and Ontario cities that share the border. More than 3,000 tons of water thunder over the falls every second, and thousands of tourists are usually there to see it. Whether you plan to view Niagara Falls from the U.S. side or the Canadian side, it\'s possible to enjoy the sights without getting wet. But it\'s not as much fun.',
      descriptShort: 'Niagra Falls is the collective name of the three waterfalls which straddle the international border beween Canada and the Untied States',
      geog: [43.0799, -79.0747]
    },{
      name: 'Chichen Itza',
      country: 'Mexico',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Chichen_Itza_3.jpg/540px-Chichen_Itza_3.jpg',
      descriptLong: 'Chichen Itza was a major focal point in the Northern Maya Lowlands from the Late Classic (c. AD 600–900) through the Terminal Classic (c. AD 800–900) and into the early portion of the Postclassic period (c. AD 900–1200). The site exhibits a multitude of architectural styles, reminiscent of styles seen in central Mexico and of the Puuc and Chenes styles of the Northern Maya lowlands. The presence of central Mexican styles was once thought to have been representative of direct migration or even conquest from central Mexico, but most contemporary interpretations view the presence of these non-Maya styles more as the result of cultural diffusion.',
      descriptShort: 'Chichen Itza was a large pre-Columbian city built by the Maya people of the Terminal Classic period. It is located in the Yucatan Peninsula of Mexico',
      geog: [20.4059, -88.3470]
    },{
      name: 'Uluru',
      country: 'Australia',
      image: 'https://cdn2.veltra.com/ptr/20161216103725_1899709985_13206_0.jpg?imwidth=550&impolicy=custom',
      descriptLong: 'Uluru is sacred to the Pitjantjatjara Anangu, the Aboriginal people of the area. The area around the formation is home to an abundance of springs, waterholes, rock caves and ancient paintings. Uluru is listed as a UNESCO World Heritage Site. Uluru and Kata Tjuta, also known as the Olgas, are the two major features of the Uluṟu-Kata Tjuṯa National Park.',
      descriptShort: 'Uluru, one of Australia\'s most recognisable natural landmarks is a large snadstone rock formation in the Northern Territory in central Austrilia',
      geog: [-25.2042, 131.0210]
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
      geog: [55.7539, 37.3712]
    },{
      name: 'Buckingham Palace',
      country: 'England',
      image: 'https://cdn.getyourguide.com/img/tour_img-1166658-146.jpg',
      descriptLong: 'Originally known as Buckingham House, the building at the core of today\'s palace was a large townhouse built for the Duke of Buckingham in 1703 on a site that had been in private ownership for at least 150 years. It was acquired by King George III in 1761[4] as a private residence for Queen Charlotte and became known as The Queen\'s House. During the 19th century it was enlarged, principally by architects John Nash and Edward Blore, who constructed three wings around a central courtyard. Buckingham Palace became the London residence of the British monarch on the accession of Queen Victoria in 1837. The last major structural additions were made in the late 19th and early 20th centuries, including the East Front, which contains the well-known balcony on which the royal family traditionally congregates to greet crowds. The palace chapel was destroyed by a German bomb during World War II; the Queen\'s Gallery was built on the site and opened to the public in 1962 to exhibit works of art from the Royal Collection.',
      descriptShort: 'Buckingham Palace is the London residence and administrative headquarters of the monarch of the United Kingdom',
      geog: [51.3030, -0.0831]
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
      geog: [38.18, -112.36]
    },{
      name: 'Mount Fuji',
      country: 'Japan',
      image: 'https://image.kkday.com/image/get/w_1080%2Cc_fit/s1.kkday.com/product_9558/20170809103130_G6CbP/jpg',
      descriptLong: 'Japan’s Mt. Fuji is an active volcano about 100 kilometers southwest of Tokyo. Commonly called “Fuji-san,” it’s the country’s tallest peak, at 3,776 meters. A pilgrimage site for centuries, it’s considered one of Japan’s 3 sacred mountains, and summit hikes remain a popular activity. Its iconic profile is the subject of numerous works of art, notably Edo Period prints by Hokusai and Hiroshige. Early July to mid September is the official climbing season when the trails and mountain facilities are open. During this period the mountain is usually free of snow, the weather is relatively mild, access by public transportation is easy, and the mountain huts are operating.',
      descriptShort: 'Of all Japan\'s iconic images, Mt Fuji (富士山; 3776m) is the real deal. Admiration for the mountain appears in Japan\'s earliest recorded literature, dating from the 8th century',
      geog: [35.358, 138.731]
    },{
      name: 'Franz Josef Glacier',
      country: 'New Zealand',
      image: 'https://www.newzealand.com/assets/Tourism-NZ/West-Coast/ecc413ad1b/img-1536963834-337-22086-p-5751457B-ACA2-F77A-CDAA6DED0BBAF3AE-2544003__CropResizeWzY1MCw0ODgsODAsImpwZyJd.jpg',
      descriptLong: 'From its origins high in the Southern Alps, the Franz Josef Glacier (Kā Roimata ō Hine Hukatere) descends into the lush native rainforest of Westland\'s National Park. This descent occurs from a height of 3,000m above sea level to 240m over a distance of 11km, making it one of the steepest glaciers in the country. It also moves faster than your average glacier at over 50cm per day, although speeds of up to four metres per day have been recorded in the main ice fall sections.This creates some truly incredible features in the glacier such as ice caves, tunnels, seracs and crevasses; all of which are constantly changing and evolving so no two days are ever the same.',
      descriptShort: 'Franz Josef Glacier is a 12 km long temperate maritime glacier located in Westland Tai Poutini National Park on the West Coast of New Zealand\'s South Island',
      geog: [-43.466, 170.191]
    },{
      name: 'Tegallalang Rice Terraces',
      country: 'Bali',
      image: 'https://www.thingstodoinbali.com/wp-content/uploads/rice-fields-bali_tegallalang-rice-terraces.jpg',
      descriptLong: 'Tegalalang rice fields is a series of rice paddies located close to Ubud, in the centre of Bali, famous for its terraced layout. This is a traditional Balinese irrigation system known as subak. Positioned in a valley the Tegalalang rice terraces offer extremely scenic lookouts over the rice fields and surrounding green landscape. It’s a very popular tourist hotspot in Bali and a must-see in many Bali itineraries.',
      descriptShort: 'Tegalalang Rice Terrace is one of the famous tourist objects in Bali situated in Tegalalang Village north of Ubud Bali featured by the amazing rice terrace set the cliff',
      geog: [-8.335, 115.088]
    },{
      name: 'Danum Valley, Sabah',
      country: 'Borneo',
      image: 'https://i0.wp.com/borneoadventure.com/v3/wp-content/uploads/2012/06/sabah-danum-orangutan-01.jpg?w=2000&quality=60&strip=all&ssl=1',
      descriptLong: 'It is estimated that there are 500 orangutan living in the Danum Valley Conservation Area. Danum’s 43,800 hectares of virgin rainforest are home to an astonishing variety of wildlife.  It offers some of the best wildlife watching and rainforest experiences in the world. You don’t just come here for the orangutans. You come here for everything. And walk away knowing that a massive tick has been added to your bucket list. There are a range of different treks at Danum. The trekking is relatively easy so you don’t need to be super fit. Plan on staying at least 3 nights if you want to see an orangutan.',
      descriptShort: 'Danum Valley is the best place to see wild orangutan in pristine, undisturbed forest. Sightings are not ‘guaranteed’ but there is a pretty good chance of seeing orangutan in its natural habitat at Danum.',
      geog: [-4.916, 117.666]
    },{
      name: 'The Whitsundays',
      country: 'Australia',
      image: 'https://www.allperfectstories.com/wp-content/uploads/2016/07/whitehaven-beach-day.jpg',
      descriptLong: 'Resorts first opened here in the 1930s and now number eight, but the majority of islands are still undeveloped national parks, with campsites on seventeen of them. Resorts aside, the few islands left in private hands are mainly uninhabited and largely the domain of local yachties. Those covered here all have regular connections to the mainland. Don’t miss the chance to whale watch if you’re here between June and September, when humpbacks arrive from their Antarctic wintering grounds to give birth and raise their calves before heading south again.',
      descriptShort: 'The 74 Whitsunday Islands lie between the northeast coast of Queensland, Australia, and the Great Barrier Reef, a massive stretch of coral teeming with marine life.',
      geog: [-20.3, 148.933]
    },{
      name: 'Salar De Uyuni',
      country: 'Bolivia',
      image: 'https://www.flightnetwork.com.au/blog/wp-content/uploads/2012/03/Header_36-1.jpg',
      descriptLong: 'Salar de Uyuni, amid the Andes in southwest Bolivia, is the world’s largest salt flat. It’s the legacy of a prehistoric lake that went dry, leaving behind a desertlike, nearly 11,000-sq.-km. landscape of bright-white salt, rock formations and cacti-studded islands. Its otherworldly expanse can be observed from central Incahuasi Island. Though wildlife is rare in this unique ecosystem, it harbors many pink flamingos.',
      descriptShort: 'This is the largest salt lake in the world, capped by a thick, hard crust of salt, easily capable of supporting the weight of a car.',
      geog: [-20.133, -67.489]
    },{
      name: 'Pyramids of Giza',
      country: 'Egypt',
      image: 'https://www.contiki.com/six-two/wp-content/uploads/2017/05/pyramids-2159286.jpg',
      descriptLong: 'As of November 2008, sources cite either 118 or 138 as the number of identified Egyptian pyramids. Most were built as tombs for the country\'s pharaohs and their consorts during the Old and Middle Kingdom periods. The Pyramids at Giza were built at the very beginning of recorded human history, and for nearly five millennia they have stood on the edge of the desert plateau in magnificent communion with the sky. The overwhelming impression is due not only to the magnitude of their age and size but also to their elemental form, their simple but compelling triangular silhouettes. Seen at prime times – dawn, sunset and after dark – they form as much a part of the natural order as the sun, the moon and the stars.',
      descriptShort: 'The Egyptian pyramids are ancient pyramid-shaped masonry structures located in Egypt.',
      geog: [29.976, 31.131]
    },{
      name: 'Kyaiktiyo Pagoda',
      country: 'Myanmar',
      image: 'https://cdn.kimkim.com/files/a/content_articles/featured_photos/4fd02853722fe9ff1228890295e3b6738450071c/big-a8fac882c5077f54c77e7ba3451e9ae5.jpg',
      descriptLong: 'Crowned with a slender gold stupa, the Rock is a huge granite boulder perched rakishly on a natural stone plinth that Burmese Buddhists believe has been held in place by a few extra-strong strands of Buddha’s hair.  Join the pilgrims’ dawn vigil amid clouds of incense and fervent prayers, or linger in the evening as the sunset throws the otherworldly scene into Technicolor and swifts swoop through the warm air.',
      descriptShort: 'Every year, between November and March, barefoot pilgrims flock to Kyaiktiyo – the Golden Rock – high in the Eastern Yoma mountains of Myanmar.',
      geog: [17.481, 97.098]
    },{
      name: 'Iguazu Falls',
      country: 'Argentina',
      image: 'https://cdn.tourradar.com/s3/tour/original/10800_4a49c9.jpg',
      descriptLong: 'One of the planet’s most awe-inspiring sights, the Iguazú Falls are simply astounding. A visit is a jaw-dropping, visceral experience, and the power and noise of the cascades – a chain of hundreds of waterfalls nearly 3km in extension – live forever in the memory. An added benefit is the setting: the falls lie split between Brazil and Argentina in a large expanse of national park, much of it rainforest teeming with unique flora and fauna. The falls are easily reached from either side of the Argentine–Brazilian border, as well as from nearby Paraguay.',
      descriptShort: 'Iguazú Falls or Iguaçu Falls are waterfalls of the Iguazu River on the border of the Argentine province of Misiones and the Brazilian state of Paraná. Together, they make up the largest waterfall system in the world.',
      geog: [-25.686, -54.444]
    },{
      name: 'Termas Geometricas',
      country: 'Chile',
      image: 'https://media.timeout.com/images/105319467/750/562/image.jpg',
      descriptLong: 'Drive for an hour on a bumpy dirt road in rural Chile for a great reward: 17 natural hot springs tucked into a narrow canyon of verdant rainforest. Japanese-inspired redwood walkways connect the steaming pools, which vary in size and temperature (there are multiple cool-down options: three plunge pools and two human-made waterfalls). The swirl of steam continuously alters your perspective as you gaze through the trees, and changing rooms have grass planted on the roofs. Be sure to visit the café pre- or post-soak, which is heated by an outdoor oven built into the wall and offers piping hot, locally grown coffee.',
      descriptShort: 'This Japanese-inspired labyrinth of hot springs is hidden in a Chilean forest. Nestled in an almost unbelievably lush forest canyon in Chile, the hot spring spa known as Termas Geometricas is a stunning maze of red planks that wind through the trees.',
      geog: [-39.500, -71.874]
    },{
      name: 'Redwood National Park',
      country: 'California, USA',
      image: 'https://icdn7.themanual.com/image/themanual/sequioa-trees-1200x675.jpg',
      descriptLong: 'Redwood National and State Parks are a string of protected forests, beaches and grasslands along Northern California’s coast. Jedediah Smith Redwoods State Park has trails through dense old-growth woods. Prairie Creek Redwoods State Park is home to Fern Canyon, with its high, plant-covered walls. Roosevelt elk frequent nearby Elk Prairie. Giant redwood clusters include Redwood National Park’s Lady Bird Johnson Grove.',
      descriptShort: 'Look up to soaring redwoods while hiking or driving through this series of stunning National and State parks.',
      geog: [41.3, -124]
    },{
      name: 'Gierangerfjord',
      country: 'Norway',
      image: 'https://disneycruiselineblog.com/wp-content/uploads/2015/02/DCL-Port-Adventures-Geiranger-Norway.jpg',
      descriptLong: 'The iconic Geirangerfjord is considered one of the most beautiful fjords in the world, and is included on the UNESCO World Heritage list together with the Nærøyfjord. The Geirangerfjord is one of Norway’s most popular natural attractions. The fjord is 260 metres deep while the surrounding mountains are 1600-1700 metres high. The fjord is also known for its spectacular waterfalls and deserted fjord farms high up on the steep cliffsides. The idyllic nature and the dramatic mountains will impress any visitor in the area. The now deserted fjord farms tell the tales of a different time and way of life. You can visit some of the farms, such as Skageflå, Knivsflå, Blomberg, Matvik, Syltevik and Westerås. You can spend the night at Westerås, sample the local food served at the outdoor restaurant, whilst enjoying the spectacular view of the fjord below.',
      descriptShort: 'The Geiranger Fjord is a fjord in the Sunnmøre region of Møre og Romsdal county, Norway',
      geog: [62.121, 7.129]
    },{
      name: 'Northern Lights',
      country: 'Iceland',
      image: 'https://s3.eu-west-2.amazonaws.com/tourhound/pages//Northern_Lights.jpg',
      descriptLong: 'Only in a handful of places in the world do you have so many opportunities to catch this incredible phenomenon. Norway, Finland, northern Canada (particularly Yellowknife) and Alaska (particularly Fairbanks) boast similar experiences, but while many of these places have longer hours of darkness in winter, they all face more challenges when it comes to cloud cover. Iceland, therefore, is an optimal destination to come to in order to tick seeing the Northern Lights off of your bucket list.The Northern Lights are the visual result of solar particles entering the earth’s magnetic field at high atmosphere, and ionising. Their intensity depends on the activity of the sun, and the acceleration speed of these particles. They appear as dancing lights high in the sky and vary in colour, usually being green, but occasionally also purple, red, pink, orange and blue. Their colours depend on the elements being ionised.',
      descriptShort: 'Icelanders are privileged when it comes to the Northern Lights. They are visible for eight months a year, from early September to the end of April and in any of these months, you are likely to see some aurora activity—it just depends on your luck, the weather and solar activity.',
      geog: [64.133, -21.933]
    },{
      name: 'Volcanoes National Park',
      country: 'Rwanda',
      image: 'http://www.adventure-travellers.com/imgs/aat-images/2-days-gorillas-rwanda.jpg',
      descriptLong: 'Volcanoes National Park lies in northwestern Rwanda and borders Virunga National Park in the Democratic Republic of Congo and Mgahinga Gorilla National Park in Uganda. The national park is known as a haven for the rare and endangered mountain gorilla and golden monkeys. A close-up encounter is practically guaranteed, but be warned – it can get tough. Any exhaustion dissipates immediately, however, when you look into the liquid brown eyes of one of the magnificent bamboo-munching beasts – these are the archetypal “gentle giants”.',
      descriptShort: 'A face-to-face encounter with a mountain gorilla in Rwanda’s Volcanoes National Park is one of the most exciting wildlife experiences Africa has to offer.',
      geog: [-1.483, 29.533]
    },{
      name: 'Mount Kilimanjaro',
      country: 'Tanzania',
      image: 'https://www.rei.com/adventures/assets/adventures/images/trip/core/africa/kil_hero',
      descriptLong: 'Kilimanjaro is also one of the world\'s highest volcanoes, and it\'s the highest free-standing mountain on earth, rising from cultivated farmland on the lower levels, through lush rainforest to alpine meadows, and finally across a lunar landscape to the twin summits of Kibo and Mawenzi. Kilimanjaro’s third volcanic cone, Shira, is on the mountain’s western side. The lower rainforest is home to many animals, including buffaloes, elephants, leopards and monkeys, and elands are occasionally seen in the saddle area between Kibo and Mawenzi.A hike up Kili lures around 25,000 trekkers each year, in part because it’s possible to walk to the summit without ropes or technical climbing experience. Non-technical, however, does not mean easy. The climb is a serious (and expensive) undertaking, and only worth doing with the right preparation.',
      descriptShort: 'Mount Kilimanjaro or just Kilimanjaro, with its three volcanic cones, "Kibo", "Mawenzi", and "Shira", is a dormant volcano in Tanzania. It is the highest mountain in Africa, about 4,900 metres from its base, and 5,895 metres above sea level.',
      geog: [-3.076, 37.353]
    },{
      name: 'Khao Sok National Park',
      country: 'Thailand',
      image: 'https://www.goway.com/media/cache/2a/7f/2a7fec8bb918dc2d1854044868e391c4.jpg',
      descriptLong: 'If you\'ve had enough of beach-bumming, venture inland to the wondrous 738-sq-km Khao Sok National Park. Many believe this lowland jungle (Thailand\'s rainiest spot) dates back 160 million years, making it one of the world\'s oldest rainforests, and it\'s interspersed by hidden waterfalls and caves.It’s home to rare species such as the giant parasitic Rafflesia flower, hornbill birds, gibbons and tigers. The park can be explored by elephant-back safari, hiking trail, and raft, canoe or kayak via the Sok river.',
      descriptShort: 'Khao Sok National Park is a nature reserve in southern Thailand containing dense virgin jungle, towerlike limestone karst formations and the man-made Cheow Lan Lake',
      geog: [8.937, 98.530]
    },{
      name: 'The Great Wall of China',
      country: 'China',
      image: 'https://images.immediate.co.uk/volatile/sites/7/2016/07/GettyImages-481614053-484c86d.jpg?quality=45&resize=620,413',
      descriptLong: 'It was constructed to protect the Chinese states and empires against the raids and invasions of the various nomadic groups of the Eurasian Steppe with an eye to expansion. Several walls were being built from as early as the 7th century BC; these were later joined together and made bigger by Qin Shi Huang (220–206 BC), the first Emperor of China. Little of that wall remains. Later on, many successive dynasties have repaired, maintained, and newly built multiple stretches of border walls. The most well-known of the walls were built during the Ming Dynasty (1368–1644).Today, the Great Wall is generally recognized as one of the most impressive architectural feats in history.',
      descriptShort: 'The Great Wall of China is a series of fortifications made of stone, brick, tamped earth, wood, and other materials, generally built along an east-to-west line across the historical northern borders of China',
      geog: [40.68, 117.23]
    }))
    .then((places) => {
      console.log(places)
      return User.create({
        username: 'admin',
        email: 'admin',
        password: 'admin',
        passwordConfirmation: 'admin',
        places: places.slice(0, 3),
        admin: true
      })
    })
    .then(user => {
      console.log(user)
      console.log('Database successfully seeded')
    })
    .catch(err => console.log(err))
    .finally(() => mongoose.connection.close())
})
