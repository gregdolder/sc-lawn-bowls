import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Link } from 'react-router-dom';

const GameGlossary: React.FC = () => {
  // Animation controls
  const controls = useAnimation();
  
  // Start animations as soon as component mounts
  useEffect(() => {
    controls.start('visible');
  }, [controls]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: 0.05,
        duration: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.2 }
    }
  };

  // State for active letter filter
  const [activeLetter, setActiveLetter] = useState<string>('All');
  // Track previous letter for transition effects
  const [isFiltering, setIsFiltering] = useState(false);

  // Reset and restart animations when active letter changes
  useEffect(() => {
    // Set filtering state to show loading state
    setIsFiltering(true);
    
    // Reset animation state
    controls.set('hidden');
    
    // Use a shorter timeout for a more responsive feel
    const timer = setTimeout(() => {
      controls.start('visible');
      setIsFiltering(false);
    }, 30);
    
    return () => clearTimeout(timer);
  }, [activeLetter, controls]);

  // All available letters
  const letters = ['All', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'R', 'S', 'T', 'U', 'V', 'W', 'Y', 'Z'];

  // Glossary terms
  const glossaryTerms = [
    {
      term: 'Aiming Line',
      definition: 'The path a player intends their bowl to travel.',
      letter: 'A'
    },
    {
      term: 'Back Bowl',
      definition: 'A bowl that comes to rest beyond the jack.',
      letter: 'B'
    },
    {
      term: 'Backhand',
      definition: 'A delivery in which the bowl curves from right to left for right-handed players, or left to right for left-handed players.',
      letter: 'B'
    },
    {
      term: 'Bias',
      definition: 'The asymmetrical shape of the bowl that causes it to curve during its trajectory.',
      letter: 'B'
    },
    {
      term: 'Block',
      definition: 'A defensive shot intended to prevent the opposition from accessing a certain area of the rink.',
      letter: 'B'
    },
    {
      term: 'Center Line',
      definition: 'An imaginary line that runs down the middle of the rink.',
      letter: 'C'
    },
    {
      term: 'Dead Bowl',
      definition: 'A bowl that has come to rest outside the boundaries of the rink or has been touched by a player.',
      letter: 'D'
    },
    {
      term: 'Dead End',
      definition: 'An end that must be replayed due to a violation of the rules or other specific circumstances.',
      letter: 'D'
    },
    {
      term: 'Delivery',
      definition: 'The action of rolling the bowl down the green.',
      letter: 'D'
    },
    {
      term: 'Ditch',
      definition: 'The area surrounding the green where bowls go out of play.',
      letter: 'D'
    },
    {
      term: 'Draw',
      definition: 'A shot designed to finish close to the jack, or a specific target.',
      letter: 'D'
    },
    {
      term: 'Drive',
      definition: 'A fast, forceful shot aimed at removing an opponent\'s bowl or repositioning the jack.',
      letter: 'D'
    },
    {
      term: 'End',
      definition: 'A round of play in which all players deliver their bowls from one end of the rink to the other.',
      letter: 'E'
    },
    {
      term: 'Foot Fault',
      definition: 'A violation where a player\'s foot is not on or above the mat during delivery.',
      letter: 'F'
    },
    {
      term: 'Forehand',
      definition: 'A delivery in which the bowl curves from left to right for right-handed players, or right to left for left-handed players.',
      letter: 'F'
    },
    {
      term: 'Green',
      definition: 'The playing surface on which the game is played.',
      letter: 'G'
    },
    {
      term: 'Hand',
      definition: 'The term used to describe the direction in which the bowl will curve (forehand or backhand).',
      letter: 'H'
    },
    {
      term: 'Head',
      definition: 'The collection of bowls that have come to rest within the vicinity of the jack.',
      letter: 'H'
    },
    {
      term: 'Heavy Shot',
      definition: 'A shot that travels beyond its intended target.',
      letter: 'H'
    },
    {
      term: 'Jack',
      definition: 'The small white or yellow ball that serves as the target.',
      letter: 'J'
    },
    {
      term: 'Jack High',
      definition: 'A bowl that has come to rest at the same distance as the jack from the mat line.',
      letter: 'J'
    },
    {
      term: 'Killed End',
      definition: 'An end that is declared void and must be replayed, usually because the jack has been knocked out of bounds.',
      letter: 'K'
    },
    {
      term: 'Lead',
      definition: 'The player who plays first in a team game.',
      letter: 'L'
    },
    {
      term: 'Line',
      definition: 'The direction or path in which a bowl is aimed.',
      letter: 'L'
    },
    {
      term: 'Mat',
      definition: 'The rectangular rubber mat from which players must deliver their bowls.',
      letter: 'M'
    },
    {
      term: 'Measure',
      definition: 'To determine which bowl is closer to the jack, often using a specific measuring device.',
      letter: 'M'
    },
    {
      term: 'Narrow Bowl',
      definition: 'A bowl that hasn\'t been given enough bias and fails to curve as expected.',
      letter: 'N'
    },
    {
      term: 'Nominated Skip',
      definition: 'The player designated to make decisions on behalf of the team in certain situations.',
      letter: 'N'
    },
    {
      term: 'On the Jack',
      definition: 'A bowl that comes to rest touching the jack.',
      letter: 'O'
    },
    {
      term: 'Pace',
      definition: 'The speed at which a green plays, influenced by factors such as grass length and moisture.',
      letter: 'P'
    },
    {
      term: 'Pairs',
      definition: 'A format of the game with two players on each team.',
      letter: 'P'
    },
    {
      term: 'Rink',
      definition: 'The defined area within which a game is played, or a team of players.',
      letter: 'R'
    },
    {
      term: 'Second',
      definition: 'The player who plays second in a team of three or four players.',
      letter: 'S'
    },
    {
      term: 'Shot Bowl',
      definition: 'The bowl that is closest to the jack.',
      letter: 'S'
    },
    {
      term: 'Skip',
      definition: 'The captain of a team, usually the last player to deliver their bowls.',
      letter: 'S'
    },
    {
      term: 'Toucher',
      definition: 'A bowl that touches the jack during its original course and remains in play even if it ends up in the ditch.',
      letter: 'T'
    },
    {
      term: 'Trial End',
      definition: 'A practice end played at the beginning of a game to familiarize players with the green.',
      letter: 'T'
    },
    {
      term: 'Triples',
      definition: 'A format of the game with three players on each team.',
      letter: 'T'
    },
    {
      term: 'Umpire',
      definition: 'An official who enforces the rules and resolves disputes during a game.',
      letter: 'U'
    },
    {
      term: 'Vice Skip',
      definition: 'The player who plays third in a team of four, acting as the skip\'s deputy.',
      letter: 'V'
    },
    {
      term: 'Weight',
      definition: 'The amount of force used in delivering a bowl to ensure it reaches its intended target.',
      letter: 'W'
    },
    {
      term: 'Wick',
      definition: 'A shot that changes direction after making contact with another bowl.',
      letter: 'W'
    },
    {
      term: 'Wide Bowl',
      definition: 'A bowl that has been given too much bias, causing it to curve more than intended.',
      letter: 'W'
    },
    {
      term: 'Yard On',
      definition: 'A request from the skip for a player to deliver their bowl with enough weight to travel approximately one yard beyond the target.',
      letter: 'Y'
    },
    {
      term: 'Zero Tolerance',
      definition: 'A rule that forbids any movement or distraction by players not involved in the current delivery.',
      letter: 'Z'
    }
  ];

  // Filter terms based on active letter
  const filteredTerms = activeLetter === 'All' 
    ? glossaryTerms 
    : glossaryTerms.filter(term => term.letter === activeLetter);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-cover bg-center" style={{ backgroundImage: "url('/images/lawn-bowls-general.jpg')" }}>
        <div className="absolute inset-0 bg-primary bg-opacity-70"></div>
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center text-white"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Lawn Bowls Glossary</h1>
            <p className="text-xl max-w-3xl mx-auto mb-8">
              Understanding the terminology and language of the game
            </p>
          </motion.div>
        </div>
      </section>

      {/* Introduction - Modified for faster loading */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">Speaking the Language of Lawn Bowls</h2>
            <p className="text-lg text-gray-700 mb-8">
              Like many sports, lawn bowls has its own unique vocabulary that can be confusing to newcomers. 
              Whether you're just getting started or looking to refresh your knowledge, this glossary will help 
              you understand the terminology used on and around the green.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Alphabet Filter */}
      <section className="py-6 bg-background-light">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {letters.map((letter) => (
              <motion.button
                key={letter}
                onClick={() => {
                  // Only update if different letter is selected
                  if (activeLetter !== letter) {
                    setActiveLetter(letter);
                  }
                }}
                className={`px-3 py-2 rounded-md text-lg font-medium transition-colors ${
                  activeLetter === letter 
                    ? 'bg-primary text-white' 
                    : 'bg-white text-primary hover:bg-primary hover:text-white'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={{ 
                  scale: activeLetter === letter ? 1.05 : 1,
                  transition: { duration: 0.2 }
                }}
              >
                {letter}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Glossary Terms */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container-custom">
          {/* Loading indicator */}
          {isFiltering && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              transition={{ duration: 0.15 }}
              className="flex justify-center mb-6"
            >
              <div className="inline-flex items-center px-4 py-2 bg-background-light rounded-full">
                <div className="w-4 h-4 rounded-full bg-primary animate-pulse mr-3"></div>
                <span className="text-primary font-medium">Loading terms...</span>
              </div>
            </motion.div>
          )}
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            key={`glossary-container-${activeLetter}`} // Force re-render on filter change
          >
            {filteredTerms.map((item, index) => (
              <motion.div
                key={`${item.term}-${activeLetter}`} // Include activeLetter in key to force re-render
                variants={itemVariants}
                className="bg-background-light p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-bold text-primary mb-2">{item.term}</h3>
                <p className="text-gray-700">{item.definition}</p>
              </motion.div>
            ))}
          </motion.div>

          {filteredTerms.length === 0 && !isFiltering && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="text-center py-12"
            >
              <p className="text-xl text-gray-700">No terms found for this letter.</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Common Phrases Section */}
      <section className="py-16 md:py-20 bg-background-light">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">Common Phrases You'll Hear on the Green</h2>
            <p className="text-lg max-w-3xl mx-auto">
              Beyond individual terms, you'll often hear these phrases during a game
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <h3 className="text-xl font-bold text-primary mb-4">Game Play Phrases</h3>
              <ul className="space-y-4">
                <li>
                  <strong className="text-primary">"Add another to the count"</strong> - 
                  <span className="ml-2">Instruction to a player to deliver a bowl that will increase the team's score.</span>
                </li>
                <li>
                  <strong className="text-primary">"Build the head"</strong> - 
                  <span className="ml-2">Strategy to position bowls around the jack to create a favorable situation.</span>
                </li>
                <li>
                  <strong className="text-primary">"Cover the draw"</strong> - 
                  <span className="ml-2">Request to place a bowl in a position that blocks the opponent's potential path to the jack.</span>
                </li>
                <li>
                  <strong className="text-primary">"Draw to the jack"</strong> - 
                  <span className="ml-2">Instruction to aim directly for the jack.</span>
                </li>
                <li>
                  <strong className="text-primary">"Give it some grass"</strong> - 
                  <span className="ml-2">Request to aim wider to account for the bowl's curve.</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <h3 className="text-xl font-bold text-primary mb-4">Strategic Phrases</h3>
              <ul className="space-y-4">
                <li>
                  <strong className="text-primary">"Played the wrong bias"</strong> - 
                  <span className="ml-2">When a player delivers their bowl on the wrong hand, causing it to curve away from the target.</span>
                </li>
                <li>
                  <strong className="text-primary">"Put in a position bowl"</strong> - 
                  <span className="ml-2">Instruction to place a bowl strategically, not necessarily close to the jack.</span>
                </li>
                <li>
                  <strong className="text-primary">"Save the end"</strong> - 
                  <span className="ml-2">Request to deliver a bowl that minimizes point loss in a difficult situation.</span>
                </li>
                <li>
                  <strong className="text-primary">"Sit on that bowl"</strong> - 
                  <span className="ml-2">Instruction to deliver a bowl that will rest against another specific bowl.</span>
                </li>
                <li>
                  <strong className="text-primary">"Trail the jack"</strong> - 
                  <span className="ml-2">Request to deliver a bowl that will move the jack to a new position when it makes contact.</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Learning Resources */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="lg:col-span-2"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
                Learning the Language of Lawn Bowls
              </h2>
              <p className="text-lg mb-6">
                Becoming familiar with lawn bowls terminology is an important step in learning the game. 
                Understanding these terms will not only help you communicate with other players more effectively 
                but also deepen your appreciation for the strategy and nuances of the sport.
              </p>
              <p className="text-lg mb-6">
                Remember that while this glossary covers many common terms, local variations and slang may 
                exist at different clubs. Don't hesitate to ask for clarification if you hear a term that's 
                unfamiliar to you.
              </p>
              <p className="text-lg">
                As you spend more time on the green, these terms will become second nature, and you'll find 
                yourself using them without even thinking about it!
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="lg:col-span-1"
            >
              <div className="bg-background-light p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold text-primary mb-4">Additional Resources</h3>
                <p className="text-lg mb-6">
                  Want to expand your lawn bowls vocabulary even further? Check out these resources:
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="text-primary mr-2 mt-1">
                      <i className="fas fa-book"></i>
                    </span>
                    <a 
                      href="https://www.worldbowls.com/equipment/glossary-of-terms/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-lg text-primary hover:text-accent transition-colors"
                    >
                      World Bowls Glossary
                    </a>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2 mt-1">
                      <i className="fas fa-video"></i>
                    </span>
                    <a 
                      href="https://www.youtube.com/results?search_query=lawn+bowls+terminology" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-lg text-primary hover:text-accent transition-colors"
                    >
                      Video Tutorials on YouTube
                    </a>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2 mt-1">
                      <i className="fas fa-users"></i>
                    </span>
                    <Link 
                      to="/contact" 
                      className="text-lg text-primary hover:text-accent transition-colors"
                    >
                      Ask Our Club Members
                    </Link>
                  </li>
                </ul>
                
                <div className="mt-8 p-4 bg-accent bg-opacity-10 rounded-lg">
                  <h4 className="text-lg font-bold text-primary mb-2">Join a Practice Session</h4>
                  <p className="mb-4">
                    The best way to learn lawn bowls terminology is to hear it used in context during a game.
                  </p>
                  <Link to="/contact" className="btn btn-primary inline-block">
                    Schedule a Visit
                  </Link>
                </div>
              </div>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Put These Terms into Practice?</h2>
            <p className="text-xl max-w-3xl mx-auto mb-8">
              Join us on the green and experience lawn bowls firsthand!
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

export default GameGlossary; 