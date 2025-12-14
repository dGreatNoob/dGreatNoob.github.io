# Portfolio Website

Personal portfolio website for Belteshazzar Marquez (@biiieem)

## 🚀 Features

- **Modern Design**: Clean, professional, and responsive design
- **Consistent UI Components**: Unified design system with reusable components
- **Smooth Animations**: Intersection Observer-based fade-in animations
- **Mobile Responsive**: Fully responsive across all device sizes
- **Smooth Scrolling**: Enhanced navigation experience
- **SEO Optimized**: Semantic HTML and meta tags

## 📁 Structure

```
.
├── index.html      # Main HTML file
├── styles.css      # All styles with design system
├── script.js       # JavaScript for interactions
└── README.md       # This file
```

## 🎨 Design System

The portfolio uses a consistent design system with:

- **CSS Variables**: Centralized color, spacing, and typography variables
- **Component-based**: Reusable components (buttons, cards, tags, etc.)
- **Responsive Breakpoints**: Mobile-first approach with consistent breakpoints

### Key Components

- Navigation bar with smooth scroll
- Hero section with social links
- About section
- Skills grid with cards
- Projects grid with cards
- Contact section
- Footer

## 🛠️ Setup for GitHub Pages

### Option 1: Automatic GitHub Pages (Recommended)

1. Push your code to the `main` branch
2. Go to your repository settings
3. Navigate to **Pages** in the left sidebar
4. Under **Source**, select `main` branch and `/ (root)` folder
5. Click **Save**
6. Your site will be available at `https://dGreatNoob.github.io`

### Option 2: Using GitHub Actions (Optional)

If you want to use a build process or other automation, you can set up GitHub Actions workflows.

## 📝 Customization

### Update Personal Information

1. **Hero Section**: Edit the hero section in `index.html`
   - Name, title, location, tagline
   - Social media links (update `href` attributes)

2. **About Section**: Update the about content in `index.html`

3. **Skills Section**: Modify skill cards with your technologies

4. **Projects Section**: Add your actual projects
   - Replace placeholder project cards
   - Add project links (GitHub, live demo)
   - Update project descriptions and tags

5. **Contact Section**: Update email link in contact section

### Color Scheme

To change the color scheme, modify CSS variables in `styles.css`:

```css
:root {
    --color-primary: #3b82f6;      /* Primary brand color */
    --color-secondary: #8b5cf6;    /* Secondary color */
    --color-accent: #10b981;       /* Accent color */
    /* ... other colors */
}
```

### Fonts

The portfolio uses Inter font from Google Fonts. To change it:

1. Update the Google Fonts link in `index.html`
2. Update `--font-family` in `styles.css`

## 🧪 Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/dGreatNoob/dGreatNoob.github.io.git
   cd dGreatNoob.github.io
   ```
   
   Or if you're organizing repos in a `repos` folder:
   ```bash
   cd repos
   git clone https://github.com/dGreatNoob/dGreatNoob.github.io.git
   cd dGreatNoob.github.io
   ```

2. Open `index.html` in your browser or use a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js (if you have http-server installed)
   npx http-server
   ```

3. Visit `http://localhost:8000` in your browser

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

This is a personal portfolio, but feel free to fork it for your own use!

---

Built with ❤️ by Belteshazzar Marquez

