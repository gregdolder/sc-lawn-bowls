# Santa Cruz Lawn Bowling Club Website

A modern, responsive website for the Santa Cruz Lawn Bowling Club built with React, TypeScript, and TailwindCSS. The site integrates with Sanity CMS for content management.

## Features

- Modern, responsive design optimized for all devices
- Comprehensive information about the club and the sport of lawn bowling
- Events calendar with detailed event pages
- Content management through Sanity CMS
- Membership application system
- Contact form for inquiries

## Pages

- Home - Club introduction and highlights
- The Game - Information about lawn bowling rules and history
- Events/Calendar - Upcoming events and tournament schedule
- The Club - Club history, facilities, and membership information
- Contact - Contact form and club location information
- Join - Membership application process
- 404 - Custom page not found

## Tech Stack

- React 18
- TypeScript
- Vite
- TailwindCSS
- Framer Motion (for animations)
- React Router (for navigation)
- Sanity CMS (for content management)

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd sc-lawn-bowling
```

2. Install dependencies
```bash
cd frontend
npm install
# or
yarn install
```

3. Set up environment variables
Create a `.env` file in the `frontend` directory with the following variables:
```
VITE_SANITY_PROJECT_ID=<your-sanity-project-id>
VITE_SANITY_DATASET=<your-sanity-dataset>
VITE_SANITY_API_VERSION=<sanity-api-version>
```

4. Set up placeholder assets
```bash
./setup-assets.sh
```

5. Start the development server
```bash
npm run dev
# or
yarn dev
```

6. Open your browser and navigate to `http://localhost:5173`

## Building for Production

```bash
npm run build
# or
yarn build
```

The build files will be in the `dist` directory.

## Content Management

The website uses Sanity CMS for content management. The Sanity studio is located in the `studio` directory.

To start the Sanity studio:

```bash
cd studio
npm install
npm run dev
```

Then open your browser and navigate to `http://localhost:3333`

## License

[MIT](LICENSE)

## Acknowledgments

- Santa Cruz Lawn Bowling Club for the opportunity to create their website
- All contributors and maintainers
