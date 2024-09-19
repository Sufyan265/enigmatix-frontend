export const createAccount = async (account) => {
    const response = await fetch('/api/accounts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(account)
    });
    const data = await response.json();
    return data;
};

export const getAccounts = async () => {
    const response = await fetch('/api/accounts');
    const data = await response.json();
    return data;
};