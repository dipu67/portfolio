# Portfolio CMS

A modern, dynamic portfolio website with an integrated Content Management System (CMS) built with Next.js, TypeScript, and Tailwind CSS.

## Features

### 🎨 **Dynamic Content Management**
- **Real-time editing**: Update your portfolio content instantly
- **Admin panel**: Easy-to-use interface for content management
- **Auto-save**: Changes are saved automatically
- **Live preview**: See changes reflected immediately on your portfolio

### 📱 **Modern Design**
- **Responsive design**: Looks great on all devices
- **Dark mode support**: Toggle between light and dark themes
- **Smooth animations**: Powered by Framer Motion
- **Professional layout**: Clean, modern, and engaging design

### 🔧 **Content Types**
- **Personal Information**: Name, title, contact details, social links
- **About Section**: Bio, highlights, and professional summary
- **Skills & Technologies**: Categorized with progress bars and descriptions
- **Projects**: Complete project showcase with features, technologies, and links
- **Statistics**: Achievement counters and metrics
- **Testimonials**: Client reviews and ratings

### 🔐 **Security**
- **Password-protected admin panel**
- **Secure API endpoints**
- **Authentication checks**

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   - Portfolio: `http://localhost:3000`
   - Admin panel: `http://localhost:3000/admin/login`

### Admin Access
- **URL**: `/admin/login`
- **Default password**: `admin123`
- **Note**: Change this password in production!

## Usage

### Updating Your Portfolio

1. **Access the Admin Panel**
   - Go to `/admin/login`
   - Enter the admin password
   - Click "Access Admin Panel"

2. **Edit Content**
   - Use the sidebar to navigate between sections
   - Edit text fields, update information
   - Add/remove projects
   - Modify skills and technologies

3. **Save Changes**
   - Click "Save Changes" to persist your updates
   - Changes appear immediately on your portfolio

### Content Structure

The portfolio data is stored in `/data/portfolio.json` with the following structure:

```json
{
  "personal": {
    "name": "Your Name",
    "title": "Your Title",
    "email": "your@email.com",
    "profileImage": "/profile.png",
    // ... more personal info
  },
  "about": {
    "title": "Section Title",
    "description": ["Paragraph 1", "Paragraph 2"],
    // ... more about info
  },
  "skills": [
    {
      "category": "Frontend Development",
      "icon": "Globe",
      "color": "blue",
      "technologies": [
        {
          "name": "React.js",
          "level": 95,
          "description": "Component-based UI development"
        }
      ]
    }
  ],
  "projects": [
    {
      "title": "Project Name",
      "description": "Project description...",
      "technologies": ["React", "Node.js"],
      "github": "https://github.com/...",
      "live": "https://demo.com"
    }
  ]
}
```

## Customization

### Adding New Content Types

1. **Update the data structure** in `/data/portfolio.json`
2. **Add form fields** in `/app/admin/page.tsx`
3. **Update the display** in `/app/page.tsx`

### Styling
- Customize colors in Tailwind classes
- Modify animations in Framer Motion components
- Update gradients and effects as needed

### Security (Production)
1. **Change the admin password**
   - Update the password check in `/app/admin/login/page.tsx`
   - Consider implementing proper authentication (JWT, sessions, etc.)

2. **Secure the API**
   - Add rate limiting
   - Implement proper authentication
   - Add input validation

## File Structure

```
portfolio/
├── app/
│   ├── admin/
│   │   ├── login/
│   │   │   └── page.tsx          # Admin login page
│   │   └── page.tsx              # Admin panel
│   ├── api/
│   │   └── portfolio/
│   │       └── route.ts          # API for reading/writing data
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Main portfolio page
├── data/
│   └── portfolio.json            # Portfolio content data
├── public/
│   └── profile.png               # Profile image
├── package.json
└── README.md
```

## Technologies Used

- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library
- **Lucide React**: Icon library
- **File-based storage**: JSON for content management

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms
- Netlify
- AWS Amplify
- DigitalOcean App Platform

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - feel free to use this for your own portfolio!

## Support

If you need help or have questions:
- Create an issue in the repository
- Check the documentation
- Review the code comments

---

**Happy portfolio building!** 🚀
