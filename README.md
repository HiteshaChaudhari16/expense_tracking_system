

 # Daily Expense Tracker

A simple, modern expense tracking application built with HTML, CSS, and JavaScript. This application allows multiple users to track their daily expenses with individual accounts and data separation.

## Features

- 🔐 **User Authentication**: Secure login and registration system
- 👥 **Multiple Users**: Each user has their own separate expense data
- ✅ Add new expenses with description, amount, category, and date
- 🏷️ Categorize expenses (Food, Transport, Shopping, Bills, Entertainment, Other)
- 📊 View total expenses and today's expenses
- 🗑️ Delete expenses
- 💾 Data persistence using localStorage (user-specific)
- 📱 Responsive design for mobile and desktop
- 🎨 Modern UI with smooth animations
- 🔒 Secure password hashing and user management

## Files Structure

```
expense-tracker/
├── login.html      # Login and registration page
├── index.html      # Main expense tracker dashboard
├── style.css       # CSS styling
├── auth.js         # User authentication and management
├── script.js       # Expense tracking functionality
└── README.md       # This file
```

## Setup Instructions

1. **Download/Clone** the project files to your local machine
2. **Open** `login.html` in any modern web browser
3. **Register** a new account or login with existing credentials
4. **Start tracking** your expenses immediately!

No server setup, database configuration, or installation required.

## How to Use

### First Time Setup
1. Open `login.html` in your browser
2. Click "Register here" to create a new account
3. Enter username (min 3 characters) and password (min 6 characters)
4. You'll be automatically logged in and redirected to the dashboard

### Daily Usage
1. **Login** with your username and password
2. **Add Expense**: Fill out the form with:
   - Description (e.g., "Lunch at McDonald's")
   - Amount (e.g., 12.50)
   - Category (select from dropdown)
   - Date (defaults to today)

3. **View Summary**: See your total expenses and today's spending at a glance
4. **Manage Expenses**: View all expenses in chronological order with the ability to delete entries
5. **Logout** when done to secure your data

## User Management

- **Multiple Accounts**: Each user has completely separate expense data
- **Secure Storage**: Passwords are hashed and stored locally
- **Session Management**: Automatic login persistence
- **Data Isolation**: Users cannot see each other's expenses

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Any modern browser with JavaScript enabled

## Data Storage

- All data is stored locally in your browser using localStorage
- User accounts and expenses are stored separately
- Data persists between browser sessions
- No data is sent to external servers
- Data is private and secure on your device

## Security Features

- Password hashing for secure storage
- User session management
- Automatic logout on page refresh (if not logged in)
- Separate data storage for each user

## Customization

You can easily customize the application by:
- Adding new expense categories in `index.html`
- Modifying colors and styling in `style.css`
- Adding new features in `script.js` or `auth.js`
- Changing password requirements in `auth.js`

## Troubleshooting

- **Can't login**: Ensure JavaScript is enabled and check if the account exists
- **Data not saving**: Ensure JavaScript is enabled in your browser
- **Form not working**: Check browser console for any JavaScript errors
- **Styling issues**: Make sure all CSS files are in the same directory
- **Login loop**: Clear browser localStorage and try again

## Future Enhancements

- Export data to CSV/Excel
- Expense charts and analytics
- Budget setting and tracking
- Multiple currency support
- Password recovery system
- Data backup and restore
- Expense sharing between users

---

**Note**: This is a frontend-only application. All data is stored locally in your browser and will be lost if you clear your browser data or use a different browser. Each user's data is completely separate and secure.
