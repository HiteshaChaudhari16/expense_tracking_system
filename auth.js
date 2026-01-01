// User management and authentication
class UserManager {
    constructor() {
        this.currentUser = null;
        this.users = this.loadUsers();
        this.init();
    }

    init() {
        // Check if user is already logged in
        const currentUser = localStorage.getItem('currentUser');
        if (currentUser) {
            this.currentUser = JSON.parse(currentUser);
            this.redirectToDashboard();
        }

        this.setupEventListeners();
    }

    setupEventListeners() {
        // Login form
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }

        // Register form
        const registerForm = document.getElementById('registerForm');
        if (registerForm) {
            registerForm.addEventListener('submit', (e) => this.handleRegister(e));
        }

        // Show register modal
        const showRegister = document.getElementById('showRegister');
        if (showRegister) {
            showRegister.addEventListener('click', (e) => {
                e.preventDefault();
                this.showRegisterModal();
            });
        }

        // Cancel register
        const cancelRegister = document.getElementById('cancelRegister');
        if (cancelRegister) {
            cancelRegister.addEventListener('click', () => this.hideRegisterModal());
        }
    }

    loadUsers() {
        const users = localStorage.getItem('users');
        return users ? JSON.parse(users) : {};
    }

    saveUsers() {
        localStorage.setItem('users', JSON.stringify(this.users));
    }

    handleLogin(e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (this.authenticateUser(username, password)) {
            this.currentUser = { username };
            localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
            this.redirectToDashboard();
        } else {
            this.showError('Invalid username or password');
        }
    }

    handleRegister(e) {
        e.preventDefault();
        const username = document.getElementById('regUsername').value;
        const password = document.getElementById('regPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (password !== confirmPassword) {
            this.showError('Passwords do not match');
            return;
        }

        if (username.length < 3) {
            this.showError('Username must be at least 3 characters long');
            return;
        }

        if (password.length < 6) {
            this.showError('Password must be at least 6 characters long');
            return;
        }

        if (this.users[username]) {
            this.showError('Username already exists');
            return;
        }

        // Create new user
        this.users[username] = {
            password: this.hashPassword(password),
            createdAt: new Date().toISOString()
        };
        this.saveUsers();

        // Auto-login after registration
        this.currentUser = { username };
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
        this.hideRegisterModal();
        this.redirectToDashboard();
    }

    authenticateUser(username, password) {
        const user = this.users[username];
        if (user && user.password === this.hashPassword(password)) {
            return true;
        }
        return false;
    }

    hashPassword(password) {
        // Simple hash function (in production, use proper hashing)
        let hash = 0;
        for (let i = 0; i < password.length; i++) {
            const char = password.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32-bit integer
        }
        return hash.toString();
    }

    showRegisterModal() {
        const modal = document.getElementById('registerModal');
        if (modal) {
            modal.style.display = 'block';
        }
    }

    hideRegisterModal() {
        const modal = document.getElementById('registerModal');
        if (modal) {
            modal.style.display = 'none';
            // Clear form
            document.getElementById('registerForm').reset();
        }
    }

    showError(message) {
        const errorDiv = document.getElementById('errorMessage');
        if (errorDiv) {
            errorDiv.textContent = message;
            errorDiv.style.display = 'block';
            setTimeout(() => {
                errorDiv.style.display = 'none';
            }, 3000);
        }
    }

    redirectToDashboard() {
        window.location.href = 'index.html';
    }

    logout() {
        this.currentUser = null;
        localStorage.removeItem('currentUser');
        window.location.href = 'login.html';
    }

    getCurrentUser() {
        return this.currentUser;
    }

    isLoggedIn() {
        return this.currentUser !== null;
    }
}

// Initialize user manager
const userManager = new UserManager();

// Export for use in other files
window.userManager = userManager;
