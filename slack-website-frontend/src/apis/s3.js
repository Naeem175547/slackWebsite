import client from '@/config/apolloClient';
import { GET_PRESIGNED_URL } from '@/graphqlApi/message/query';

// Each presigned URL is single-use and expires in 60s, so never use the cache
export const getPresignedUrl = async () => {
    const { data } = await client.query({
        query: GET_PRESIGNED_URL,
        fetchPolicy: 'no-cache',
    });
    return data?.getPresignedUrl?.data;
};

export const uploadImageToAWSpresignedUrl = async ({ url, file }) => {
    const response = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': file.type },
        body: file,
    });
    if (!response.ok) {
        throw new Error(`S3 upload failed with status ${response.status}`);
    }
    // The file's public URL is the presigned URL without its signature query
    return url.split('?')[0];
};
