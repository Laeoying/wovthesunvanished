
import fs from 'fs'
import JSON from '@supercharge/json'

export async function readJsonFileAsync(filePath) {
    try {
        const data = await fs.promises.readFile(filePath, 'utf8');
        const parsedData = JSON.parse(data);
        return parsedData;
    } catch (error) {
        throw error;
    }
}

export async function writeJsonFileAsync(filePath, data) {
    try {
        const jsonString = JSON.stringify(data, null, 2);
        await fs.promises.writeFile(filePath, jsonString, 'utf8');
    } catch (error) {
        throw error;
    }
}

export function delay(time) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time)
    });
}

export async function login(page, credentials) {
    await page.getByText('Accept all').click();
    await page.getByText('I am 16 years').click();
    await page.getByText('I have read and agree').click();
    await page.getByText('Accept').click();
    await page.getByText('Sign in').click();
    await page.getByText('Sign in with email').click();
    await page.getByPlaceholder('Email').fill(credentials['email']);
    await page.getByPlaceholder('Password').fill(credentials['password']);
    await page.getByText('LOGIN').click();
}