import Client from 'ssh2-sftp-client';

export async function uploadWithSFTP(buffer, remotePath, host, user, password) {
    const client = new Client();
    try {
        await client.connect({
            host: host,
            username: user,
            password: password
        });
        await client.put(buffer, remotePath);
    } catch (error) {
        console.error('SFTP upload error:', error);
        throw error;
    } finally {
        client.end();
    }
}