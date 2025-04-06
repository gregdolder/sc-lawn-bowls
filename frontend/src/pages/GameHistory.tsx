import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const GameHistory: React.FC = () => {
  // Timeline data
  const timelineEvents = [
    {
      era: "Ancient Origins",
      year: "5000 BCE - 100 CE",
      title: "Early Ball Games",
      description: "Archaeological evidence suggests ball rolling games were played in ancient Egypt as early as 5000 BCE. Similar games were later documented in ancient Greece and Rome.",
      highlight: "Artifacts from ancient Egypt show images of figures playing games similar to modern bowling."
    },
    {
      era: "Medieval Period",
      year: "13th Century",
      title: "Formalization in England",
      description: "The modern form of lawn bowls began to take shape in England. The oldest bowling green still in use today is in Southampton, England, established in 1299.",
      highlight: "In 1366, King Edward III allegedly banned 'bowls' to ensure that his troops focused on archery practice instead."
    },
    {
      era: "Renaissance",
      year: "16th Century",
      title: "Royal Disapproval and Growth",
      description: "Despite periodic bans by various English monarchs (concerned that it interfered with archery practice), the game continued to grow in popularity among all classes.",
      highlight: "Sir Francis Drake famously insisted on finishing his game of bowls before engaging the Spanish Armada in 1588."
    },
    {
      era: "Colonial Era",
      year: "17th - 18th Century",
      title: "Global Expansion",
      description: "British colonists brought the game to North America, Australia, New Zealand, and South Africa, where it quickly took root and developed local variations.",
      highlight: "The oldest lawn bowling club in North America, the Bowling Green Club of New York, was established in 1732."
    },
    {
      era: "Modern Era",
      year: "19th Century",
      title: "Rules Standardization",
      description: "The 19th century saw the standardization of rules and the formation of national bowling associations, starting with the Scottish Bowling Association in 1892.",
      highlight: "The introduction of standardized biased bowls revolutionized the game's strategy and technique."
    },
    {
      era: "Contemporary",
      year: "20th Century",
      title: "International Competition",
      description: "The 20th century saw the establishment of international competitions and the formation of the International Bowling Board (later World Bowls) in 1905.",
      highlight: "Lawn bowls became part of the Commonwealth Games in 1930 and has been featured in every games since."
    },
    {
      era: "Modern Day",
      year: "21st Century",
      title: "Modern Evolution",
      description: "Today, lawn bowls is enjoyed by millions worldwide, with professional competitions, technological advances in equipment, and efforts to attract younger players to the sport.",
      highlight: "Modern synthetic playing surfaces have made the game accessible in regions where maintaining grass greens is challenging."
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-cover bg-center" style={{ backgroundImage: "url('/images/lawn-bowling-historical-1.jpg')" }}>
        <div className="absolute inset-0 bg-primary bg-opacity-70"></div>
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center text-white"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">The Rich History of Lawn Bowls</h1>
            <p className="text-xl max-w-3xl mx-auto mb-8">
              Explore the fascinating evolution of one of the world's oldest sports
            </p>
          </motion.div>
        </div>
      </section>

      {/* Introduction Section - Modified for faster loading */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">A Game Spanning Millennia</h2>
            <p className="text-lg text-gray-700">
              Lawn bowls has one of the longest and most fascinating histories of any sport still played today. 
              From ancient civilizations to modern international competition, the game has evolved while maintaining 
              its core essence - a test of skill, strategy, and precision.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className="text-2xl md:text-3xl font-bold text-primary mb-4">Ancient Beginnings</h3>
              <p className="text-lg mb-4">
                The origins of lawn bowls can be traced back to ancient civilizations. Archaeological evidence suggests 
                that a form of the game was played in Egypt as early as 5000 BCE. Stone balls have been found in ancient 
                Egyptian tombs, indicating that a game similar to bowls was played by the ancient Egyptians.
              </p>
              <p className="text-lg mb-4">
                The Romans introduced a game called "Bocce," a variant of which is still played today. This game spread 
                throughout the Roman Empire and laid the groundwork for various bowling games throughout Europe.
              </p>
              <p className="text-lg">
                As the game evolved, it became more structured and organized, particularly in medieval England, where 
                it gained significant popularity despite occasional attempts by monarchs to ban it.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="rounded-lg overflow-hidden shadow-xl"
            >
              <img 
                src="/images/lawn-bowling-historical-3.jpg" 
                alt="Historical image of lawn bowls" 
                className="w-full h-auto object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Historical Timeline */}
      <section className="py-16 md:py-20 bg-background-light">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">The Evolution of Lawn Bowls</h2>
            <p className="text-lg max-w-3xl mx-auto">
              Follow the timeline of how lawn bowls developed from ancient games to the modern sport we know today
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary bg-opacity-30"></div>

            {/* Timeline events */}
            <div className="space-y-12">
              {timelineEvents.map((event, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.07 + 0.2 }}
                  className={`flex flex-col md:flex-row ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center`}
                >
                  {/* Timeline dot */}
                  <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-5 h-5 rounded-full bg-primary border-4 border-white"></div>
                  
                  {/* Content */}
                  <div className="md:w-1/2 md:px-10">
                    <div className={`bg-white p-6 rounded-lg shadow-md ${index % 2 === 0 ? 'md:mr-6' : 'md:ml-6'}`}>
                      <div className="text-sm text-accent font-bold mb-1">{event.era}</div>
                      <div className="text-xl font-bold text-primary mb-2">{event.year}</div>
                      <h3 className="text-2xl font-bold mb-3">{event.title}</h3>
                      <p className="text-lg mb-4">{event.description}</p>
                      <div className="bg-accent bg-opacity-10 p-3 rounded-lg">
                        <p className="text-primary font-bold italic">{event.highlight}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Spacer div for alternating layout */}
                  <div className="md:w-1/2"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Notable Figures */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">Notable Figures in Lawn Bowls History</h2>
            <p className="text-lg max-w-3xl mx-auto">
              Throughout history, many influential individuals have contributed to the development and popularity of lawn bowls
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="bg-background-light p-6 rounded-lg shadow-md"
            >
              <h3 className="text-xl font-bold text-primary mb-3">Sir Francis Drake</h3>
              <p className="text-lg mb-4">
                Perhaps the most famous story in lawn bowls history involves Sir Francis Drake, who allegedly insisted on finishing 
                his game before fighting the Spanish Armada in 1588. While likely embellished, this tale illustrates the popularity 
                of the game among the English nobility of the time.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="bg-background-light p-6 rounded-lg shadow-md"
            >
              <h3 className="text-xl font-bold text-primary mb-3">King Henry VIII</h3>
              <p className="text-lg mb-4">
                King Henry VIII was an avid bowls player, but ironically he banned the game for the lower classes, fearing it distracted 
                them from archery practice, which was considered essential for national defense. The ban was only enforced for those who 
                earned less than 100 pounds per year, allowing the wealthy and nobility to continue playing.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="bg-background-light p-6 rounded-lg shadow-md"
            >
              <h3 className="text-xl font-bold text-primary mb-3">W.W. Mitchell</h3>
              <p className="text-lg mb-4">
                In the 19th century, W.W. Mitchell revolutionized the game by standardizing the bias in bowls. Before his innovation, 
                bowls had natural irregularities that made them curve unpredictably. Mitchell's innovation of creating bowls with 
                consistent bias transformed lawn bowls into a game of precision and skill.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Lawn Bowls in America */}
      <section className="py-16 md:py-20 bg-background-light">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="rounded-lg overflow-hidden shadow-xl order-1 md:order-2"
            >
              <img 
                src="/images/lawn-bowling-historical-2.png" 
                alt="Lawn bowls in America" 
                className="w-full h-auto object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="order-2 md:order-1"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
                Lawn Bowls in America
              </h2>
              <p className="text-lg mb-4">
                Lawn bowls was introduced to America by British colonists in the 17th century. The first documented bowling green 
                in America was established in Williamsburg, Virginia, in 1632.
              </p>
              <p className="text-lg mb-4">
                In 1732, the Bowling Green Club was established in New York City. In fact, the area in Lower Manhattan known as 
                "Bowling Green" derives its name from the fact that it was used for lawn bowls by early Dutch and British settlers.
              </p>
              <p className="text-lg mb-4">
                The sport experienced a decline in the United States during the 19th century but saw a resurgence in the early 
                20th century, particularly in California and Florida, where climate conditions were ideal for the game.
              </p>
              <p className="text-lg">
                Today, lawn bowls continues to grow in popularity across the United States, with clubs established in most states 
                and national championships held annually.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Modern Evolution */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">The Modern Evolution of Lawn Bowls</h2>
            <p className="text-lg max-w-3xl mx-auto">
              How the sport has changed and developed in recent decades
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="bg-background-light p-6 rounded-lg shadow-md"
            >
              <div className="text-primary text-4xl mb-4">
                <i className="fas fa-trophy"></i>
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">International Competition</h3>
              <p className="text-lg">
                The establishment of World Bowls in 1905 (originally the International Bowling Board) marked a significant milestone 
                in the sport's history. Today, international competitions such as the World Bowls Championship and the Commonwealth 
                Games feature lawn bowls as a premier event, attracting top players from around the globe.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="bg-background-light p-6 rounded-lg shadow-md"
            >
              <div className="text-primary text-4xl mb-4">
                <i className="fas fa-cogs"></i>
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">Equipment Evolution</h3>
              <p className="text-lg">
                Modern lawn bowls equipment has evolved significantly from the wooden bowls of the past. Today's bowls are made 
                from hard plastic compounds, precisely engineered to provide consistent bias and performance. Technological 
                advances have also led to improvements in measuring devices, footwear, and apparel designed specifically for the sport.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="bg-background-light p-6 rounded-lg shadow-md"
            >
              <div className="text-primary text-4xl mb-4">
                <i className="fas fa-users"></i>
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">Diversification and Inclusion</h3>
              <p className="text-lg">
                While lawn bowls has traditionally been associated with older players, the modern game is making concerted efforts 
                to attract younger participants and increase diversity. Many clubs now offer programs specifically for youth and 
                families, and the sport's accessibility to players of all abilities, including those with physical disabilities, 
                has helped broaden its appeal.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 md:py-20 bg-primary text-white">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Become Part of Lawn Bowls History</h2>
            <p className="text-xl max-w-3xl mx-auto mb-8">
              Join our club today and add your chapter to the rich history of this timeless sport!
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Link to="/join" className="btn bg-white text-primary hover:bg-gray-100 hover:text-primary">
                Become a Member
              </Link>
              <Link to="/the-game" className="btn btn-accent">
                Learn More About the Game
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default GameHistory; 