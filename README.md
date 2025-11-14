# Cron Expression Visualizer

A modern Angular application for understanding and generating cron expressions and recurrence patterns.

## Features

### Part 1: Cron Expression Evaluator
- **Input Field**: Enter any valid cron expression (supports both 5 and 6 field formats)
- **Real-time Parsing**: Automatically parses and displays the six components:
  - Seconds (0-59)
  - Minutes (0-59)
  - Hours (0-23)
  - Days (1-31)
  - Month (1-12)
  - Day of Week (0-7, where 0 and 7 are Sunday)
- **Visual Feedback**: Shows which fields are active/configured
- **Format Support**: 
  - 6-field format: `seconds minutes hours day month dayOfWeek`
  - 5-field format: `minutes hours day month dayOfWeek` (seconds default to 0)

### Part 2: Recurrence Pattern Generator
- **Pattern Selection**: Choose from Daily, Weekly, or Monthly patterns
- **Dynamic Forms**: Form fields change based on selected pattern
- **Human-readable Output**: Generates clear, natural language descriptions

#### Daily Pattern
- Select time of day
- Example: "Runs every day at 08:00 AM"

#### Weekly Pattern
- Select time of day
- Choose one or more days of the week
- Example: "Runs every week on Monday and Wednesday at 09:30 AM"

#### Monthly Pattern
- Select time of day
- Choose specific day of month (1-31)
- Example: "Runs every month on the 15th at 10:00 AM"

## Technology Stack

- **Angular 20.1.0** - Latest Angular framework with standalone components
- **TypeScript** - Type-safe development
- **Angular Forms** - Two-way data binding and form handling
- **CSS Grid & Flexbox** - Modern responsive layout
- **Angular SSR** - Server-side rendering support

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm

### Installation
```bash
npm install
```

### Development Server
```bash
npm start
```
Navigate to `http://localhost:4200/` to view the application.

### Build
```bash
npm run build
```

### Testing
```bash
npm test
```

## Project Structure

```
src/
├── app/
│   ├── app.ts          # Main component with cron logic
│   ├── app.html        # Application template
│   ├── app.css         # Component styles
│   └── app.routes.ts   # Routing configuration
├── styles.css          # Global styles
└── main.ts            # Application bootstrap
```

## Key Features Implementation

### Cron Expression Parser
- Handles both 5 and 6 field cron formats
- Validates input and provides visual feedback
- Real-time parsing as user types

### Pattern Generator
- Dynamic form generation based on pattern type
- Smart time formatting (12-hour format with AM/PM)
- Ordinal number formatting (1st, 2nd, 3rd, etc.)
- Multiple day selection for weekly patterns

### User Experience
- Responsive design for all screen sizes
- Clean, modern interface
- Real-time updates
- Accessibility features (proper labels, focus management)

## Example Cron Expressions

- `0 */5 * * * *` - Every 5 minutes
- `0 0 8 * * *` - Every day at 8:00 AM
- `0 30 9 * * 1` - Every Monday at 9:30 AM
- `0 0 10 15 * *` - 15th day of every month at 10:00 AM
- `*/30 * * * * *` - Every 30 seconds

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request
