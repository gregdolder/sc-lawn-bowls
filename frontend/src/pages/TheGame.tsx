import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Link } from 'react-router-dom';

const TheGame: React.FC = () => {
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
        staggerChildren: 0.1,
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

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
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">The Game of Lawn Bowls</h1>
            <p className="text-xl max-w-3xl mx-auto mb-8">
              Learn about the history, rules, and terminology of this classic sport
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick Navigation - Modified for faster loading */}
      <section className="py-12 bg-background-light">
        <div className="container-custom">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate={controls}
          >
            <motion.div
              variants={cardVariants}
              className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center"
            >
              <div className="text-primary text-4xl mb-4">
                <i className="fas fa-book"></i>
              </div>
              <h3 className="text-2xl font-bold mb-3">Rules of the Game</h3>
              <p className="text-gray-600 mb-4">
                Learn the official rules and scoring system of lawn bowls
              </p>
              <Link to="/the-game/rules" className="btn btn-primary">
                View Rules
              </Link>
            </motion.div>
            <motion.div
              variants={cardVariants}
              className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center"
            >
              <div className="text-primary text-4xl mb-4">
                <i className="fas fa-landmark"></i>
              </div>
              <h3 className="text-2xl font-bold mb-3">History</h3>
              <p className="text-gray-600 mb-4">
                Explore the rich history and evolution of lawn bowls
              </p>
              <Link to="/the-game/history" className="btn btn-primary">
                Learn History
              </Link>
            </motion.div>
            <motion.div
              variants={cardVariants}
              className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center"
            >
              <div className="text-primary text-4xl mb-4">
                <i className="fas fa-language"></i>
              </div>
              <h3 className="text-2xl font-bold mb-3">Glossary</h3>
              <p className="text-gray-600 mb-4">
                Understand the unique terminology used in lawn bowls
              </p>
              <Link to="/the-game/glossary" className="btn btn-primary">
                View Glossary
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
                An Ancient Sport with Modern Appeal
              </h2>
              <p className="text-lg mb-4">
                Lawn bowling (or "bowls") is one of the oldest lawn games, dating back to ancient Egypt and Rome. 
                The modern form of the game traces its roots to 13th century England, and today it's played around 
                the world in countries like Australia, New Zealand, South Africa, Canada, and the United States.
              </p>
              <p className="text-lg mb-4">
                The objective is simple but the execution requires skill and strategy. Players roll asymmetrically 
                shaped balls (called "bowls") toward a smaller white ball (the "jack"). The player or team whose 
                bowls are closest to the jack wins the round.
              </p>
              <p className="text-lg">
                Despite its simple concept, lawn bowls is a sport that offers endless challenge and enjoyment 
                for players of all ages and abilities.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="rounded-lg overflow-hidden shadow-xl"
            >
              <img 
                src="/images/lawn-bowling-historical-1.jpg" 
                alt="Players enjoying a game of lawn bowls" 
                className="w-full h-auto object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* How to Play Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">How to Play</h2>
              <p className="text-lg max-w-3xl mx-auto">
                A basic guide to understanding and playing the game of lawn bowls
              </p>
            </motion.div>
          </div>

          <div className="space-y-16">
            {/* The Basics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="order-2 md:order-1"
              >
                <h3 className="text-2xl md:text-3xl font-bold text-primary mb-4">The Basics</h3>
                <p className="text-lg mb-4">
                  Lawn bowls is played on a flat, closely-mown grass surface called a "green." The green is divided into 
                  playing areas called "rinks."
                </p>
                <p className="text-lg mb-4">
                  The game begins with a player rolling the small white ball (the jack) down the green. After the jack is 
                  positioned, players take turns rolling their bowls toward it, trying to get as close as possible.
                </p>
                <p className="text-lg">
                  The challenge comes from the fact that the bowls are not perfectly round - they're biased to curve as they 
                  roll. Players must account for this bias when aiming.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="order-1 md:order-2 rounded-lg overflow-hidden shadow-xl"
              >
                <img 
                  src="/images/warmups.jpg" 
                  alt="The basics of lawn bowls" 
                  className="w-full h-auto object-cover"
                />
              </motion.div>
            </div>

            {/* Equipment */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="rounded-lg overflow-hidden shadow-xl"
              >
                <img 
                  src="/images/lawn-bowls-equipment.jpg" 
                  alt="Lawn bowls equipment" 
                  className="w-full h-auto object-cover"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <h3 className="text-2xl md:text-3xl font-bold text-primary mb-4">Equipment</h3>
                <p className="text-lg mb-4">
                  <strong>Bowls:</strong> These are asymmetrically shaped balls that weigh between 3-4 pounds. They come in various 
                  sizes to fit different hand sizes and are marked with unique symbols to identify a player's bowls.
                </p>
                <p className="text-lg mb-4">
                  <strong>Jack:</strong> The small white target ball that players aim for.
                </p>
                <p className="text-lg mb-4">
                  <strong>Mat:</strong> A rectangular rubber mat that players stand on when delivering the bowl.
                </p>
                <p className="text-lg">
                  <strong>Footwear:</strong> Flat-soled shoes are required to protect the green.
                </p>
              </motion.div>
            </div>

            {/* Scoring */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="order-2 md:order-1"
              >
                <h3 className="text-2xl md:text-3xl font-bold text-primary mb-4">Scoring</h3>
                <p className="text-lg mb-4">
                  After all bowls have been played, the team with the bowl closest to the jack wins that "end" and scores a point 
                  for each of their bowls that is closer to the jack than the opponent's closest bowl.
                </p>
                <p className="text-lg mb-4">
                  A game typically consists of a predetermined number of ends (usually 18 or 21 in competitive play), and the 
                  player or team with the highest total score at the conclusion of all ends is the winner.
                </p>
                <p className="text-lg">
                  In tournament play, games may also be played to a set number of points rather than ends.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="order-1 md:order-2 rounded-lg overflow-hidden shadow-xl"
              >
                <img 
                  src="/images/scorecard.jpg" 
                  alt="Scoring in lawn bowls" 
                  className="w-full h-auto object-cover"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Game Formats */}
      <section className="py-16 md:py-20 bg-background-light">
        <div className="container-custom">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Game Formats</h2>
              <p className="text-lg max-w-3xl mx-auto">
                Lawn bowls can be played in several different formats
              </p>
            </motion.div>
          </div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={controls}
          >
            <motion.div
              variants={cardVariants}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="text-primary text-4xl mb-4">
                <i className="fas fa-user"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">Singles</h3>
              <p className="text-gray-600">
                One player against another, each using four bowls. The first to reach 21 points (or another agreed-upon total) 
                is the winner.
              </p>
            </motion.div>
            <motion.div
              variants={cardVariants}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="text-primary text-4xl mb-4">
                <i className="fas fa-user-friends"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">Pairs</h3>
              <p className="text-gray-600">
                Two players per team, with each player using four bowls. The "skip" (team captain) plays last while the "lead" 
                plays first.
              </p>
            </motion.div>
            <motion.div
              variants={cardVariants}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="text-primary text-4xl mb-4">
                <i className="fas fa-users"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">Triples</h3>
              <p className="text-gray-600">
                Three players per team, with each player using three bowls. The roles are lead, second, and skip.
              </p>
            </motion.div>
            <motion.div
              variants={cardVariants}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="text-primary text-4xl mb-4">
                <i className="fas fa-users"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">Fours</h3>
              <p className="text-gray-600">
                Four players per team, with each player using two bowls. The roles are lead, second, third, and skip.
              </p>
            </motion.div>
            <motion.div
              variants={cardVariants}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="text-primary text-4xl mb-4">
                <i className="fas fa-random"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">Australian Pairs</h3>
              <p className="text-gray-600">
                A variation of pairs where players change positions after each end, with the lead becoming the skip and vice versa.
              </p>
            </motion.div>
            <motion.div
              variants={cardVariants}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="text-primary text-4xl mb-4">
                <i className="fas fa-trophy"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">Tournaments</h3>
              <p className="text-gray-600">
                Various tournament formats exist, from club championships to international competitions, often featuring multiple 
                game formats.
              </p>
            </motion.div>
          </motion.div>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Give It a Try?</h2>
            <p className="text-xl max-w-3xl mx-auto mb-8">
              The best way to learn lawn bowls is to experience it firsthand. Join us for an introductory session where 
              we'll provide the equipment and instruction you need to get started.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Link to="/contact" className="btn bg-white text-primary hover:bg-gray-100">
                Contact Us
              </Link>
              <Link to="/events" className="btn btn-accent">
                Upcoming Events
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default TheGame; 