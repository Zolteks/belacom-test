import Client from 'ssh2-sftp-client';

export async function uploadWithSFTP(stringData, remotePath, host, user, password) {
    console.log(`Uploading file to ${host} via SFTP...`);
    const client = new Client();
    const buffer = Buffer.from(stringData, 'utf-8');
    try {
        await client.connect({
            host: host,
            username: user,
            password: password
        });
        await client.put(buffer, remotePath)
        console.log(`File uploaded to ${remotePath} on ${host}`);
    } catch (error) {
        console.error('SFTP upload error:', error);
        throw error;
    } finally {
        client.end();
    }
}
