import fetch from 'node-fetch';
import logger from '@/lib/logger';
import { DownloadResultType } from '@/lib/types';
import { ContentDownloadError } from '@/lib/errors';

export async function downloadContent(url: string): Promise<DownloadResultType> {
  logger.info(`Downloading content from URL: ${url}`);
  const response = await fetch(url);
  if (!response.ok) {
    throw new ContentDownloadError(`Failed to download content: ${response.status} ${response.statusText}`);
  }
  const contentType = response.headers.get('content-type') || 'application/octet-stream';
  const buffer = await response.arrayBuffer().then(Buffer.from);
  logger.info(`Content downloaded. Size: ${buffer.length} bytes`);
  return { buffer, contentType };
}