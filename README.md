# 🌍 Cloud Community Club (C³)

[![Discord](https://img.shields.io/discord/1316108296075218944?logo=discord)](https://discord.gg/dBNXWDKhrD)
[![CodeQL](https://github.com/prem22k/cloudcommunityclub-c3-/actions/workflows/codeql.yml/badge.svg)](https://github.com/prem22k/cloudcommunityclub-c3-/actions/workflows/codeql.yml) [![Vercel](https://img.shields.io/github/deployments/prem22k/cloudcommunityclub-c3-/production?logo=vercel&label=Vercel%20Deployment)](https://github.com/prem22k/cloudcommunityclub-c3-/deployments/activity_log?environment=Production)

Welcome to the official website repository of Cloud Community Club (C³) - a vibrant student-driven technology community at Sreenidhi Institute of Science and Technology dedicated to cloud computing, open source, research, and innovation.

### 🔗 Visit us @ [snist.cloudcommunityclub.in](https://snist.cloudcommunityclub.tech)

## 🚀 About C³

Cloud Community Club is more than just a tech club—it's a thriving ecosystem where students explore cutting-edge technologies, contribute to open-source projects, engage in research, and build real-world solutions. Our website serves as the central hub for our community, featuring:

- 🎯 **Project Schools** - Hands-on learning initiatives across various tech domains
- 📚 **Research Opportunities** - Contribute to research papers and innovative projects
- 💼 **Internship Listings** - Career opportunities and industry connections
- 🎪 **Events & Workshops** - Hackathons, seminars, and tech conferences
- 👥 **Community** - Connect with like-minded tech enthusiasts
- 🛠️ **Open Source** - Collaborative development and contributions

### ✨ Key Features

Our interactive website includes:
- 🎨 Stunning dark-themed UI with smooth animations
- ⚡ Performance-optimized with Next.js 15 and React 18
- 📱 Fully responsive design for all devices
- 🎭 Dynamic content with typing effects and transitions
- 🔊 Interactive sound effects for enhanced UX
- 🌐 Discord community integration
- 📝 Student registration and membership system

🙋‍♂️ We welcome contributions from all community members!

### 📊 Repository Contribution Activity

![Alt](https://repobeats.axiom.co/api/embed/008c9695f4c2ac65afa8d47ce629094525666935.svg 'Repobeats analytics image')

## 🔰 Quick Setup / Getting Started

> Want to contribute to our website? Setup is quick and easy!

### Prerequisites
- Node.js 18.x or higher
- npm or yarn package manager
- Git

### Installation Steps

1. **Clone the repository:**
```bash
git clone https://github.com/prem22k/cloudcommunityclub-c3-.git
cd cloudcommunityclub-c3-
```

2. **Install dependencies:**
```bash
npm install
# or
yarn install
```

3. **Start the development server:**
```bash
npm run dev
# or
yarn dev
```

4. **Open your browser:**  
Navigate to [http://localhost:3000](http://localhost:3000)

💡 The site features hot reload - changes are reflected instantly as you edit files.

### Available Scripts

- `npm run dev` - Start development server (http://localhost:3000)
- `npm run build` - Create optimized production build
- `npm start` - Run production server
- `npm run lint` - Run ESLint for code quality
- `npm run format` - Format code with Prettier

## 🗃️ Tech Stack & Resources

Our website is built with modern, cutting-edge technologies:

### Core Technologies
- **[Next.js 15.1](https://nextjs.org)** - React framework with App Router, SSR, and route-based code splitting
- **[React 18](https://react.dev)** - UI component library with concurrent features
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript for robust code

### Styling & Design
- **[Tailwind CSS 3.3](https://tailwindcss.com)** - Utility-first CSS framework
- **Custom theme** - Extended color palette and responsive breakpoints
- **Google Fonts** - Inter and Poppins for typography

### Animations & Interactions
- **[Framer Motion 10.16](https://www.framer.com/motion/)** - Declarative animations and gestures
- **[react-typed](https://github.com/ssbeefeater/react-typed)** - Typing animation effects
- **[canvas-confetti](https://www.npmjs.com/package/canvas-confetti)** - Celebration effects
- **[use-sound](https://github.com/joshwcomeau/use-sound)** - Sound effect hooks

### UI Components & Icons
- **[Lucide React](https://lucide.dev)** - Modern, customizable icon library
- **[React Icons](https://react-icons.github.io/react-icons/)** - Popular icon sets (social media, tech logos)
- **[react-scroll](https://www.npmjs.com/package/react-scroll)** - Smooth scrolling navigation

### Performance & Analytics
- **[Vercel Analytics](https://vercel.com/analytics)** - Web analytics and insights
- **[Vercel Speed Insights](https://vercel.com/docs/speed-insights)** - Performance monitoring
- **Next.js Image Optimization** - Automatic image optimization (AVIF, WebP)

### Development Tools
- **ESLint** - Code linting with Next.js configuration
- **Prettier** - Consistent code formatting
- **PostCSS & Autoprefixer** - CSS processing

### Deployment
- **[Vercel](https://vercel.com/)** - Hosting and continuous deployment

## 📚 Project Structure

```
cloudcommunityclub-c3-/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── layout.tsx          # Root layout with fonts & metadata
│   │   ├── page.tsx            # Homepage with lazy-loaded sections
│   │   ├── globals.css         # Global styles & Tailwind imports
│   │   ├── events/             # Events listing page
│   │   ├── projects/           # Project Schools page
│   │   ├── research/           # Research initiatives
│   │   ├── internships/        # Internship opportunities
│   │   └── join-us/            # Membership registration
│   ├── components/             # Reusable UI components
│   │   ├── Hero.tsx            # Animated hero section
│   │   ├── Navbar.tsx          # Navigation bar
│   │   ├── About.tsx           # About section with cards
│   │   ├── Technologies.tsx    # Tech carousel
│   │   ├── Leadership.tsx      # Team profiles
│   │   ├── Footer.tsx          # Site footer
│   │   └── ...                 # Other components
│   ├── config/                 # Configuration constants
│   ├── dispositions/           # Data files (leadership, projects)
│   └── types/                  # TypeScript type definitions
├── public/
│   ├── assets/                 # Static assets
│   │   ├── home/               # Homepage images
│   │   ├── events/             # Event photos
│   │   ├── projects/           # Project thumbnails
│   │   ├── sound_fx/           # Interaction sounds
│   │   └── ...                 # Other assets
│   ├── robots.txt              # SEO directives
│   └── site.webmanifest        # PWA manifest
├── package.json                # Dependencies & scripts
├── next.config.js              # Next.js configuration
├── tailwind.config.js          # Tailwind theming
├── tsconfig.json               # TypeScript config
└── README.md                   # This file
```

For more detailed information about the codebase architecture, see [CODEBASE_SUMMARY.md](./CODEBASE_SUMMARY.md).

For contribution guidelines and feature structure, see [GUIDE.md](./GUIDE.md).

## 🎨 Key Features & Highlights

### Performance Optimizations
- ⚡ **Dynamic Imports** - Lazy loading for optimal initial load time
- 🖼️ **Image Optimization** - Automatic WebP/AVIF conversion and responsive images
- 📦 **Code Splitting** - Route-based splitting with Next.js App Router
- 💾 **Aggressive Caching** - 1-year cache for static assets
- 🔍 **SEO Optimized** - Comprehensive metadata and OpenGraph support

### Visual Excellence
- 🎭 **Framer Motion Animations** - Smooth, performant animations throughout
- ⌨️ **Typing Effects** - Dynamic text with react-typed
- 🎨 **Custom Theme** - Extended Tailwind configuration with custom colors
- 🌓 **Dark Mode Design** - Optimized dark theme with excellent contrast
- � **Fully Responsive** - Mobile-first design with custom breakpoints

### Interactive Elements
- 🔊 **Sound Effects** - Contextual audio feedback (can be muted)
- 🎯 **Smooth Scrolling** - React Scroll for navigation
- 🎪 **Discord Integration** - Embedded community widget
- 📋 **Registration System** - Complete membership onboarding
- 🎡 **Tech Carousel** - Infinite scrolling technology showcase

### Community Features
- 👥 **Leadership Profiles** - Interactive team member cards with quotes
- 📅 **Event Gallery** - Past and upcoming events showcase
- 🔬 **Research Hub** - Academic and research initiatives
- 💼 **Internship Board** - Career opportunities listing
- 🤝 **Join Us Page** - Comprehensive membership form

## 📖 Documentation

- **[CODEBASE_SUMMARY.md](./CODEBASE_SUMMARY.md)** - Complete technical documentation
- **[GUIDE.md](./GUIDE.md)** - Development guidelines and structure
- **[CONTRIBUTING.md](./CONTRIBUTING.md)** - How to contribute
- **[SECURITY.md](./SECURITY.md)** - Security policies
- **[CREDITS.md](./CREDITS.md)** - Contributors and acknowledgments

## 🔐 Security

We take security seriously. If you discover a security vulnerability, please follow our [Security Policy](./SECURITY.md).

## �📝 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 🤝 Contributing

We welcome contributions from everyone! Here's how you can help:

1. 🍴 Fork the repository
2. 🌿 Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. 💻 Make your changes
4. ✅ Run linting and formatting (`npm run lint && npm run format`)
5. 📝 Commit your changes (`git commit -m 'Add some AmazingFeature'`)
6. 🚀 Push to the branch (`git push origin feature/AmazingFeature`)
7. 🔃 Open a Pull Request

Please read our [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed guidelines.

## 🌟 Community & Support

Connect with us:
- 💬 **Discord**: [discord.gg/dBNXWDKhrD](https://discord.gg/dBNXWDKhrD)
- 🔗 **LinkedIn**: [cloud-community-club](https://www.linkedin.com/company/cloud-community-club)
- 📷 **Instagram**: [@c3.snist](https://www.instagram.com/c3.snist/)
- 🐦 **Twitter/X**: [@C3Snist](https://x.com/C3Snist)
- 💻 **GitHub**: [@C3Snist](https://github.com/C3Snist)
- 📧 **Email**: C3@snist.cloudcommunityclub.in

## ✨ Credits

Built with 💙 by [Prem Sai](https://github.com/prem22k) and the C³ community.

See [CREDITS.md](./CREDITS.md) for a complete list of contributors and acknowledgments.

## 📊 Repository Stats

---

[![Powered by Vercel](/.github/assets/powered-by-vercel.svg)](https://vercel.com?utm_source=cloudcommunityclub&utm_campaign=oss)
