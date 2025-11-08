# Nirvana Chai - World's Elite Teas

![Nirvana Chai Logo](public/favicon.ico)

A premium e-commerce website for luxury teas, offering the world's rarest and most exquisite tea collections sourced from legendary gardens and crafted by masters with centuries-old traditions.

## 🌟 Features

- **Premium Tea Collection**: Curated selection of rare teas from India, China, and beyond
- **Interactive Shopping Experience**: Modern, responsive design with smooth animations
- **Shopping Cart**: Add, remove, and manage items with persistent cart state
- **User Authentication**: Registration, login, and account management
- **Contact & Support**: Contact forms, newsletter subscription, and customer support
- **Order Management**: Complete order placement with shipping information
- **Multi-language Support**: English and other language options
- **Currency Conversion**: Support for multiple currencies
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Performance Optimized**: Fast loading with image optimization and code splitting

## 🛠️ Tech Stack

### Frontend

- **React 18** - Modern React with hooks and concurrent features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful, accessible UI components
- **Zustand** - Lightweight state management
- **React Router** - Client-side routing
- **Framer Motion** - Smooth animations and transitions

### Backend

- **Express.js** - Fast, unopinionated web framework
- **Node.js** - JavaScript runtime
- **TypeScript** - Server-side type safety

### Development & Testing

- **Vitest** - Fast unit testing framework
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Husky** - Git hooks for code quality

## 🚀 Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Madhavk005/Nirvana-Chai.git
   cd nirvana-chai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   EMAIL_PASS=your_email_password
   # Add other environment variables as needed
   ```

4. **Development**
   ```bash
   # Start development server
   npm run dev

   # Or start with SSR
   npm run start
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 🌐 Deployment

### GitHub Pages (Recommended for Frontend)

The project is configured for easy deployment to GitHub Pages:

1. **Enable GitHub Pages** in your repository settings:
   - Go to Settings → Pages
   - Select "Deploy from a branch"
   - Choose `gh-pages` branch (will be created automatically)

2. **Deploy to GitHub Pages**
   ```bash
   npm run deploy
   ```

3. **Access your site** at: `https://[username].github.io/Nirvana-Chai/`

### Netlify (Alternative)

1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build:client`
3. Set publish directory: `dist/spa`
4. Add environment variables in Netlify dashboard

### Manual Deployment

```bash
npm run build:client
# Serve the dist/spa directory with any static server
```

## 📖 Usage

### Development Server

```bash
npm run dev
```

Access the application at `http://localhost:5173`

### Production Server

```bash
npm run build
npm run start
```

Access the application at `http://localhost:3000`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run test` - Run tests
- `npm run typecheck` - Run TypeScript type checking
- `npm run format` - Format code with Prettier
- `npm run lint` - Lint code with ESLint

## 🔌 API Endpoints

The backend provides the following API endpoints:

### Health & Demo

- `GET /health` - Health check endpoint
- `GET /api/ping` - Simple ping response
- `GET /api/demo` - Demo message from server

### Forms

- `POST /api/forms/newsletter` - Newsletter subscription
- `POST /api/forms/contact` - Contact form submission
- `POST /api/forms/order` - Order placement
- `POST /api/forms/register` - User registration
- `POST /api/forms/login-attempt` - Login attempt logging

### Request Examples

**Newsletter Subscription:**

```bash
curl -X POST http://localhost:3000/api/forms/newsletter \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com"}'
```

**Order Placement:**

```bash
curl -X POST http://localhost:3000/api/forms/order \
  -H "Content-Type: application/json" \
  -d '{
    "shippingInfo": {
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com"
    },
    "cartItems": [
      {
        "name": "Green Tea",
        "quantity": 2,
        "price": 25.99
      }
    ],
    "orderTotal": 51.98
  }'
```

## 🏗️ Project Structure

```
nirvana-chai/
├── client/                 # React frontend
│   ├── components/         # Reusable UI components
│   ├── pages/             # Page components
│   ├── contexts/          # React contexts
│   ├── hooks/             # Custom React hooks
│   ├── stores/            # Zustand stores
│   ├── utils/             # Utility functions
│   └── data/              # Static data
├── server/                # Express backend
│   ├── routes/            # API routes
│   └── index.ts           # Server entry point
├── shared/                # Shared types/utilities
├── public/                # Static assets
├── dist/                  # Build output
└── package.json           # Dependencies and scripts
```

## 🌐 Deployment

### Netlify (Recommended)

1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist/spa`
4. Add environment variables in Netlify dashboard

### Manual Deployment

```bash
npm run build
# Serve the dist/ directory with any static server
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Write tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting PR

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

- Website: [Nirvana Chai](https://nirvana-chai.netlify.app)
- Repository: [GitHub](https://github.com/Madhavk005/Nirvana-Chai)
- Email: contact@nirvanachai.com

## 🙏 Acknowledgments

- Tea product images sourced from Unsplash and Pexels
- UI components built with shadcn/ui
- Icons from Lucide React
- Special thanks to the tea masters and farmers who make this possible

---

_Experience the world's finest teas, one sip at a time._ 🍵
