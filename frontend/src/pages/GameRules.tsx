import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Link } from 'react-router-dom';

const GameRules: React.FC = () => {
  // Add animation controls
  const controls = useAnimation();
  
  // Start animations as soon as component mounts
  useEffect(() => {
    controls.start('visible');
  }, [controls]);

  // Variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-cover bg-center" style={{ backgroundImage: "url('/images/aerial-view-sc-bowls-lawn.jpg')" }}>
        <div className="absolute inset-0 bg-primary bg-opacity-70"></div>
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center text-white"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Rules of Lawn Bowls</h1>
            <p className="text-xl max-w-3xl mx-auto mb-8">
              Understanding the official regulations and how to play the game properly
            </p>
          </motion.div>
        </div>
      </section>

      {/* Basic Rules Overview - Modified for faster loading */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-12 text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">Basic Rules Overview</h2>
              <p className="text-lg text-gray-700">
                Lawn bowls is governed by a set of rules established by World Bowls, the international governing body.
                Below are the fundamental rules of the game that all players should understand.
              </p>
            </motion.div>

            <motion.div 
              className="space-y-10"
              variants={containerVariants}
              initial="hidden"
              animate={controls}
            >
              <motion.div
                variants={itemVariants}
                className="bg-gradient-to-br from-background-light to-white p-8 rounded-lg shadow-md border-l-4 border-primary"
              >
                <div className="flex items-start">
                  <div className="text-primary text-3xl mr-4 mt-1">
                    <i className="fas fa-bullseye"></i>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-primary mb-4">The Objective</h3>
                    <div className="text-left">
                      <p className="text-lg mb-4">
                        The aim of lawn bowls is to roll your bowls so they come to rest closer to the small white ball (the jack) than your opponent's bowls.
                      </p>
                      <p className="text-lg">
                        One point is awarded for each bowl that is closer to the jack than the nearest bowl of the opponent. The player or team with the most points at the conclusion of play is the winner.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="bg-gradient-to-br from-background-light to-white p-8 rounded-lg shadow-md border-l-4 border-accent"
              >
                <div className="flex items-start">
                  <div className="text-accent text-3xl mr-4 mt-1">
                    <i className="fas fa-play-circle"></i>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-primary mb-4">Starting the Game</h3>
                    <div className="text-left">
                      <ol className="text-lg space-y-3 list-decimal pl-5">
                        <li className="pl-2">A coin toss determines which team begins.</li>
                        <li className="pl-2">The first player places the mat on the center line of the rink.</li>
                        <li className="pl-2">The player then delivers the jack down the green.</li>
                        <li className="pl-2">The jack must travel at least 23 meters from the mat and remain within the boundaries of the rink.</li>
                        <li className="pl-2">Once the jack is centered, play begins with the first player delivering their bowl.</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="bg-gradient-to-br from-background-light to-white p-8 rounded-lg shadow-md border-l-4 border-green-500"
              >
                <div className="flex items-start">
                  <div className="text-green-500 text-3xl mr-4 mt-1">
                    <i className="fas fa-dice"></i>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-primary mb-4">Playing the Game</h3>
                    <div className="text-left">
                      <ol className="text-lg space-y-3 list-decimal pl-5">
                        <li className="pl-2">Players take turns rolling their bowls toward the jack.</li>
                        <li className="pl-2">Players must keep one foot on or above the mat when delivering a bowl.</li>
                        <li className="pl-2">A bowl that stops within the boundaries of the rink is "live" even if it has previously gone outside the boundaries.</li>
                        <li className="pl-2">If the jack is knocked out of bounds, it is placed at a predefined spot on the rink and play continues.</li>
                        <li className="pl-2">An "end" is complete when all players have delivered all their bowls.</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="bg-gradient-to-br from-background-light to-white p-8 rounded-lg shadow-md border-l-4 border-yellow-500"
              >
                <div className="flex items-start">
                  <div className="text-yellow-500 text-3xl mr-4 mt-1">
                    <i className="fas fa-trophy"></i>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-primary mb-4">Scoring</h3>
                    <div className="text-left">
                      <p className="text-lg mb-4">
                        After all bowls have been played, the team with the bowl closest to the jack wins that "end" and scores one point for each of their bowls that is closer to the jack than the opponent's closest bowl.
                      </p>
                      <p className="text-lg mb-4">
                        For example, if Team A has 3 bowls closer to the jack than any of Team B's bowls, Team A scores 3 points for that end.
                      </p>
                      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md">
                        <p className="text-lg font-medium">
                          The total score is accumulated over all the ends played in the game.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Game Formats and Rules */}
      <section className="py-16 md:py-20 bg-background-light">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">Game Formats and Specific Rules</h2>
            <p className="text-lg max-w-3xl mx-auto">
              Lawn bowls can be played in several formats, each with specific rules
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-16 h-16 bg-primary bg-opacity-10 rounded-bl-full -mr-8 -mt-8 group-hover:bg-primary group-hover:bg-opacity-20 transition-all"></div>
              <h3 className="text-xl font-bold text-primary mb-4 flex items-center">
                <span className="bg-primary text-white w-10 h-10 rounded-full inline-flex items-center justify-center mr-3">
                  <i className="fas fa-user"></i>
                </span>
                Singles
              </h3>
              <div className="text-left">
                <ul className="text-lg space-y-2 list-disc pl-5">
                  <li>Two players compete against each other</li>
                  <li>Each player uses four bowls</li>
                  <li>First to reach 21 points (or predetermined score) wins</li>
                  <li>Players alternate delivering all four of their bowls</li>
                  <li>The winner of an end delivers the jack in the next end</li>
                </ul>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-16 h-16 bg-primary bg-opacity-10 rounded-bl-full -mr-8 -mt-8 group-hover:bg-primary group-hover:bg-opacity-20 transition-all"></div>
              <h3 className="text-xl font-bold text-primary mb-4 flex items-center">
                <span className="bg-primary text-white w-10 h-10 rounded-full inline-flex items-center justify-center mr-3">
                  <i className="fas fa-user-friends"></i>
                </span>
                Pairs
              </h3>
              <div className="text-left">
                <ul className="text-lg space-y-2 list-disc pl-5">
                  <li>Teams of two compete against each other</li>
                  <li>Each player typically uses four bowls</li>
                  <li>The lead plays first, followed by the skip (captain)</li>
                  <li>Games are typically 18 ends</li>
                  <li>The leads deliver all their bowls, then the skips</li>
                  <li>The skip directs strategy and makes tactical decisions</li>
                </ul>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-16 h-16 bg-primary bg-opacity-10 rounded-bl-full -mr-8 -mt-8 group-hover:bg-primary group-hover:bg-opacity-20 transition-all"></div>
              <h3 className="text-xl font-bold text-primary mb-4 flex items-center">
                <span className="bg-primary text-white w-10 h-10 rounded-full inline-flex items-center justify-center mr-3">
                  <i className="fas fa-users"></i>
                </span>
                Triples
              </h3>
              <div className="text-left">
                <ul className="text-lg space-y-2 list-disc pl-5">
                  <li>Teams of three compete against each other</li>
                  <li>Each player typically uses three bowls</li>
                  <li>The playing positions are: lead, second, and skip</li>
                  <li>Games are typically 18 ends</li>
                  <li>Players deliver all their bowls in order of play</li>
                  <li>The second may be called upon to measure disputed shots</li>
                </ul>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-16 h-16 bg-primary bg-opacity-10 rounded-bl-full -mr-8 -mt-8 group-hover:bg-primary group-hover:bg-opacity-20 transition-all"></div>
              <h3 className="text-xl font-bold text-primary mb-4 flex items-center">
                <span className="bg-primary text-white w-10 h-10 rounded-full inline-flex items-center justify-center mr-3">
                  <i className="fas fa-users"></i>
                </span>
                Fours
              </h3>
              <div className="text-left">
                <ul className="text-lg space-y-2 list-disc pl-5">
                  <li>Teams of four compete against each other</li>
                  <li>Each player uses two bowls</li>
                  <li>The playing positions are: lead, second, third, and skip</li>
                  <li>Games are typically 21 ends</li>
                  <li>The lead and second focus on drawing close to the jack</li>
                  <li>The third acts as the measurer and supports the skip</li>
                  <li>The skip directs play and is the final decision maker</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Official Rules and Regulations */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="lg:col-span-2"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
                Official Rules and Regulations
              </h2>
              <div className="space-y-8">
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-400">
                  <div className="flex items-start">
                    <div className="text-red-400 text-3xl mr-4 mt-1">
                      <i className="fas fa-exclamation-triangle"></i>
                    </div>
                    <div className="text-left">
                      <h3 className="text-xl font-bold text-primary mb-3">Violations and Penalties</h3>
                      <p className="text-lg mb-0">
                        Various infractions can occur during play, including foot faults (stepping off the mat before releasing the bowl), 
                        playing out of turn, or improper behavior. Penalties range from warnings to disqualification in serious cases.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-400">
                  <div className="flex items-start">
                    <div className="text-blue-400 text-3xl mr-4 mt-1">
                      <i className="fas fa-ruler"></i>
                    </div>
                    <div className="text-left">
                      <h3 className="text-xl font-bold text-primary mb-3">Measuring Disputed Shots</h3>
                      <p className="text-lg mb-0">
                        When it's difficult to determine which bowl is closer to the jack, players use special measuring devices. 
                        The process must be conducted carefully, without disturbing any bowls. In tournament play, an umpire may be called to make the measurement.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-400">
                  <div className="flex items-start">
                    <div className="text-purple-400 text-3xl mr-4 mt-1">
                      <i className="fas fa-tshirt"></i>
                    </div>
                    <div className="text-left">
                      <h3 className="text-xl font-bold text-primary mb-3">Dress Code</h3>
                      <p className="text-lg mb-0">
                        Official competitions typically require players to wear white or matching team colors. Flat-soled shoes are mandatory to protect the green.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-400">
                  <div className="flex items-start">
                    <div className="text-green-400 text-3xl mr-4 mt-1">
                      <i className="fas fa-handshake"></i>
                    </div>
                    <div className="text-left">
                      <h3 className="text-xl font-bold text-primary mb-3">Etiquette</h3>
                      <p className="text-lg mb-4">
                        While not strictly rules, there are important etiquette guidelines:
                      </p>
                      <ul className="text-lg list-disc pl-5 space-y-2">
                        <li>Don't distract players during their delivery</li>
                        <li>Avoid standing where your shadow falls across the jack</li>
                        <li>Don't walk across neighboring rinks when play is in progress</li>
                        <li>Compliment good shots by either side</li>
                        <li>Be ready to play when it's your turn</li>
                        <li>Thank your opponents and shake hands after the game</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="lg:col-span-1"
            >
              <div className="bg-gradient-to-br from-background-light to-white p-8 rounded-lg shadow-lg sticky top-24">
                <h3 className="text-xl font-bold text-primary mb-4 flex items-center">
                  <span className="text-primary mr-2">
                    <i className="fas fa-book-open text-2xl"></i>
                  </span>
                  Resources for Rules
                </h3>
                <p className="text-lg mb-6 text-left">
                  For the complete official rules and regulations of lawn bowls, refer to these resources:
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <span className="text-primary mr-2 mt-1">
                      <i className="fas fa-external-link-alt"></i>
                    </span>
                    <a 
                      href="https://www.worldbowls.com/wp-content/uploads/2020/01/Laws_of_the_Sport_v3.2.pdf" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-lg text-primary hover:text-accent transition-colors"
                    >
                      World Bowls - Laws of the Sport
                    </a>
                  </li>
                  <li className="flex items-start bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <span className="text-primary mr-2 mt-1">
                      <i className="fas fa-external-link-alt"></i>
                    </span>
                    <a 
                      href="https://www.bowlsusa.us/rules-regulations" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-lg text-primary hover:text-accent transition-colors"
                    >
                      Bowls USA - Rules and Regulations
                    </a>
                  </li>
                  <li className="flex items-start bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <span className="text-primary mr-2 mt-1">
                      <i className="fas fa-external-link-alt"></i>
                    </span>
                    <a 
                      href="https://www.bowls.com.au/get-involved/laws-rules-policies/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-lg text-primary hover:text-accent transition-colors"
                    >
                      Bowls Australia - Laws and Rules
                    </a>
                  </li>
                </ul>
                
                <div className="mt-8 p-6 bg-primary bg-opacity-10 rounded-lg border-l-4 border-accent">
                  <h4 className="text-lg font-bold text-primary mb-2">Need Help Understanding the Rules?</h4>
                  <p className="mb-4 text-left">
                    Our club members are always happy to explain the rules and help newcomers learn the game.
                  </p>
                  <Link to="/contact" className="btn btn-primary inline-block w-full text-center">
                    Contact Us
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Interactive Rules Quiz - A new addition to make the page more engaging */}
      {/* <section className="py-16 md:py-20 bg-background-light">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="text-center mb-8"
            >
              <div className="inline-block text-4xl text-primary mb-6">
                <i className="fas fa-question-circle"></i>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Test Your Knowledge</h2>
              <p className="text-lg max-w-3xl mx-auto">
                Ready to test your understanding of lawn bowls rules? Visit our interactive quiz page!
              </p>
            </motion.div>
            
            <div className="text-center">
              <Link 
                to="/the-game"
                className="inline-flex items-center justify-center px-6 py-3 bg-accent text-white rounded-lg shadow-lg hover:bg-accent-dark transition-all transform hover:scale-105"
              >
                <span className="mr-2">
                  <i className="fas fa-play-circle"></i>
                </span>
                Try the Rules Quiz
              </Link>
            </div>
          </div>
        </div>
      </section> */}

      {/* Call to Action */}
      <section className="py-16 md:py-20 bg-primary text-white" style={{ backgroundImage: "url('/images/pattern-bg.png')", backgroundSize: "cover", backgroundBlendMode: "overlay" }}>
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Roll?</h2>
            <p className="text-xl max-w-3xl mx-auto mb-8">
              Rules are best learned through practice. Join us for a free introductory session to experience the game firsthand!
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Link to="/join" className="btn bg-white text-primary hover:bg-gray-100 hover:text-primary transform hover:scale-105 transition-transform">
                <span className="mr-2">
                  <i className="fas fa-user-plus"></i>
                </span>
                Become a Member
              </Link>
              <Link to="/the-game" className="btn btn-accent transform hover:scale-105 transition-transform">
                <span className="mr-2">
                  <i className="fas fa-arrow-left"></i>
                </span>
                Learn More About the Game
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default GameRules; 