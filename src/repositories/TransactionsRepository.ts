import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionRepository {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface TransactionBalance {
  transactions: Transaction[];
  balance: Balance;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): TransactionBalance {
    const balance = this.getBalance();

    return {
      transactions: this.transactions,
      balance,
    };
  }

  public getBalance(): Balance {
    const income = this.transactions
      .filter(t => t.type === 'income')
      .reduce((acc, t) => acc + t.value, 0);
    const outcome = this.transactions
      .filter(t => t.type === 'outcome')
      .reduce((acc, t) => acc + t.value, 0);

    return {
      income,
      outcome,
      total: income - outcome,
    };
  }

  public create({ title, type, value }: TransactionRepository): Transaction {
    const transaction = new Transaction({ title, type, value });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
