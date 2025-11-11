import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import Client from 'ssh2-sftp-client';
import { uploadWithSFTP } from '../src/sftp.js';

const mockMethods = {
  connect: vi.fn(),
  put: vi.fn(),
  end: vi.fn(),
};

vi.mock('ssh2-sftp-client', () => {
  const MockClient = vi.fn(function() {
    this.connect = mockMethods.connect;
    this.put = mockMethods.put;
    this.end = mockMethods.end;
  });

  return {
    default: MockClient,
  };
});

describe("uploadWithSFTP", () => {
    beforeEach(() => {
        mockMethods.connect.mockClear();
        mockMethods.put.mockClear();
        mockMethods.end.mockClear();
        mockMethods.connect.mockResolvedValue(undefined);
        mockMethods.put.mockResolvedValue(undefined);
        mockMethods.end.mockResolvedValue(undefined);
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it("should connect to SFTP server and upload a file", async () => {
        await uploadWithSFTP("This is just a test.", "./remote/file.csv","host", "user", "password");

        // Verify the flow
        expect(mockMethods.connect).toHaveBeenCalled();
        expect(mockMethods.put).toHaveBeenCalledWith("This is just a test.", "./remote/file.csv");
        expect(mockMethods.end).toHaveBeenCalled();
    });

    it("should handle connection failures", async () => {
        const connectionError = new Error('Connection failed');
        mockMethods.connect.mockRejectedValue(connectionError);

        await expect(uploadWithSFTP("This is just a test.", "./remote/file.csv","host", "user", "password")).rejects.toThrow('Connection failed');
    });

    it("should handle upload failures", async () => {
        const uploadError = new Error('Upload failed');
        mockMethods.put.mockRejectedValue(uploadError);

        await expect(uploadWithSFTP("This is just a test.", "./remote/file.csv","host", "user", "password")).rejects.toThrow('Upload failed');
    });
});