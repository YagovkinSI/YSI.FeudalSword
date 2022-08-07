export interface ICurrentUser {
    id: number;
    userName: string;
    created: Date;
    lastActivity: Date;
    lockoutEnabled: boolean;
    lockoutEnd: any;
    twoFactorEnabled: boolean;
    phoneNumberConfirmed: boolean;
    phoneNumber: string;
    emailConfirmed: boolean;
    email: string;
}