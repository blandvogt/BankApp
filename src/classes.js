import { userStorage, accountStorage } from './inMemoryStorage';
import { v4 as uuid } from 'uuid';

export class User {
    constructor(username, password, id) {
        this.username = username;
        this.password = password;
        this.id = id;
        this.accounts = new Map();
    }

    addAccount(name, balance) {
        // Validate input
        if (balance < 100) return 'Must be at least $100';
        if (balance > 10000) return 'Max of $10000';
        
        // Create new account and add to user
        const account = new Account(uuid(), name, balance, this.id);
        this.accounts.set(account.id, account);

        // Update storage
        userStorage.get(`${this.username}/${this.password}`).accounts.set(account.id, account);
        accountStorage.set(account.id, account);
        return 'Success';
    }

    deleteAccount(id) {
        this.accounts.delete(id);
    }
}

export class Account {
    constructor(id, name, balance, userId) {
        this.id = id;
        this.name = name;
        this.balance = balance;
        this.userId = userId;
    }

    withdraw(amount) {
        this.balance = parseInt(this.balance) - parseInt(amount);
    }

    deposit(amount) {
        this.balance = parseInt(this.balance) + parseInt(amount);
    }
}