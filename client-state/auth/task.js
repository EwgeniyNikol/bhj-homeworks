class AuthService {
    static async authenticate(formData) {
        const response = await fetch('https://students.netoservices.ru/nestjs-backend/auth', {
            method: 'POST',
            body: formData
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.json();
    }
}

class StorageService {
    static getUserId() {
        return localStorage.getItem('user_id');
    }
    
    static setUserId(userId) {
        localStorage.setItem('user_id', userId);
    }
    
    static clearUserId() {
        localStorage.removeItem('user_id');
    }
}

class AuthUI {
    constructor() {
        this.signinForm = document.getElementById('signin__form');
        this.signinBtn = document.getElementById('signin__btn');
        this.signinDiv = document.getElementById('signin');
        this.welcomeDiv = document.getElementById('welcome');
        this.userIdSpan = document.getElementById('user_id');
    }
    
    getFormData() {
        return new FormData(this.signinForm);
    }
    
    showWelcome(userId) {
        this.userIdSpan.textContent = userId;
        this.signinDiv.classList.remove('signin_active');
        this.welcomeDiv.classList.add('welcome_active');
        this.signinForm.reset(); 
    }
    
    showLoginForm() {
        this.welcomeDiv.classList.remove('welcome_active');
        this.signinDiv.classList.add('signin_active');
        this.signinForm.reset(); 
    }
    
    showError(message) {
        alert(message);
    }
}

class AuthController {
    constructor(ui, authService, storageService) {
        this.ui = ui;
        this.authService = authService;
        this.storageService = storageService;
    }
    
    async login() {
        try {
            const formData = this.ui.getFormData();
            
            const result = await this.authService.authenticate(formData);
            
            if (result.success) {
                this.storageService.setUserId(result.user_id);
                this.ui.showWelcome(result.user_id);
            } else {
                this.ui.showError('Неверный логин/пароль');
            }
        } catch (error) {
            console.error('Auth error:', error);
            this.ui.showError('Произошла ошибка при авторизации');
        }
    }
    
    checkStoredUser() {
        const userId = this.storageService.getUserId();
        if (userId) {
            this.ui.showWelcome(userId);
            return true;
        }
        return false;
    }
    
    logout() {
        this.storageService.clearUserId();
        this.ui.showLoginForm();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const ui = new AuthUI();
    const authController = new AuthController(ui, AuthService, StorageService);
    
    authController.checkStoredUser();
    
    ui.signinForm.addEventListener('submit', function(e) {
        e.preventDefault();
        authController.login();
    });
    
    ui.signinBtn.addEventListener('click', function(e) {
        e.preventDefault();
        authController.login();
    });
});