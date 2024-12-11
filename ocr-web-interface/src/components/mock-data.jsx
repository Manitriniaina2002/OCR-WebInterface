// Données statiques pour le développement du frontend MANDIKA

// Utilisateurs fictifs pour les tests de connexion
export const mockUsers = [
    {
        id: 1,
        email: 'demo@mandika.com',
        password: 'demo123',
        name: 'Jean Dupont',
        role: 'utilisateur'
    },
    {
        id: 2,
        email: 'admin@mandika.com', 
        password: 'admin123',
        name: 'Marie Dubois',
        role: 'administrateur'
    }
];

// Configuration de connexion simulée
export const mockAuthConfig = {
    loginEndpoint: '/api/auth/login',
    tokenKey: 'mandika_user_token',
    defaultRedirectRoutes: {
        'utilisateur': '/acceuil',
        'administrateur': '/acceuil'
    }
};

// Exemple de messages d'erreur personnalisés
export const authErrorMessages = {
    invalidCredentials: 'Email ou mot de passe incorrect',
    accountLocked: 'Trop de tentatives. Compte temporairement verrouillé.',
    networkError: 'Problème de connexion. Veuillez réessayer.',
    serverError: 'Erreur serveur. Contactez le support.'
};

// Simulation de validation côté client (à des fins de développement)
export function validateLoginCredentials(email, password) {
    const user = mockUsers.find(u => u.email === email && u.password === password);
    return {
        isValid: !!user,
        user: user || null,
        error: user ? null : authErrorMessages.invalidCredentials
    };
}

// Fonction de simulation de token JWT
export function generateMockToken(user) {
    return `mock_token_${user.id}_${Date.now()}`;
}