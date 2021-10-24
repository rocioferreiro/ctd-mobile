import * as SecureStore from 'expo-secure-store';

const tokenName = 'secure_token';
const refreshTokenName = 'secure_refresh_token';
const userId = 'user_id';

export async function saveToken(value) {
    await SecureStore.setItemAsync(tokenName, value);
}

export async function getToken() {
    return await SecureStore.getItemAsync(tokenName);
}

export async function deleteToken() {
    return await SecureStore.deleteItemAsync(tokenName);
}

export async function saveUserId(value) {
    await SecureStore.setItemAsync(userId, value);
}

export async function getUserId() {
    return await SecureStore.getItemAsync(userId);
}

export async function deleteUserId() {
    return await SecureStore.deleteItemAsync(userId);
}

export async function getTokenAndUserId() {
    let token = await SecureStore.getItemAsync(tokenName);
    let id = await SecureStore.getItemAsync(userId);
    return {token, id}
}

export async function saveRefreshToken(value) {
    await SecureStore.setItemAsync(refreshTokenName, value);
}

export async function getRefreshToken() {
    return await SecureStore.getItemAsync(refreshTokenName);
}

export async function deleteRefreshToken() {
    return await SecureStore.deleteItemAsync(refreshTokenName);
}
