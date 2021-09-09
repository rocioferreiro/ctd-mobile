import * as SecureStore from 'expo-secure-store';

const tokenName = 'secure_token';

export async function saveToken(value) {
    await SecureStore.setItemAsync(tokenName, value);
}

export async function getToken() {
    return await SecureStore.getItemAsync(tokenName);
}
