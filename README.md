# Portfolio Website

A modern, interactive portfolio website showcasing projects, career timeline, and visitor map tracking.

## Features

- **Hero Section**: Eye-catching introduction with call-to-action
- **Career Timeline**: Visual representation of professional experience
- **Project Showcase**: Highlight your best work with interactive cards
- **Visitor Map**: Real-time visitor tracking with geolocation
- **Contact Section**: Easy way for visitors to get in touch
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Error Handling**: Graceful error boundaries and fallback states

## Technology Stack

- **Vite**: Fast build tool and dev server
- **React 18**: UI library
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first styling
- **shadcn/ui**: High-quality component library
- **react-simple-maps**: Interactive world map visualization
- **Lucide React**: Icon library

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or bun

### Installation

```sh
# Clone the repository
git clone <repository-url>

# Navigate to the project directory
cd siddarthnilol.github.io

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:8080`

### Development with API

To run with the visitor tracking API:

```sh
npm run dev:full
```

This runs both the Vite dev server and the API server concurrently.

### Build for Production

```sh
npm run build
```

The optimized build will be generated in the `dist/` directory.

## Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # shadcn/ui components
│   ├── Hero.tsx        # Hero section
│   ├── CareerTimeline.tsx
│   ├── ProjectShowcase.tsx
│   ├── VisitorMap.tsx
│   ├── Contact.tsx
│   └── ErrorBoundary.tsx
├── pages/              # Page components
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── App.tsx             # Main app component
└── main.tsx            # Entry point
api/
├── visitors.js         # Visitor tracking serverless function
└── api-server.js       # Local API server for development
```

## API Endpoints

### GET /api/visitors
Returns an array of the last 100 visitor records with geolocation data.

### POST /api/visitors
Accepts visitor data in JSON format:
```json
{
  "lat": 40.7128,
  "lon": -74.0060,
  "country": "United States",
  "city": "New York",
  "ts": "2026-01-19T10:30:00Z"
}
```

## License

This project is open source and available under the MIT License.
