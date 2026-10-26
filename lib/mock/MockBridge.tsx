'use client';

import axios, { AxiosError, AxiosHeaders, type InternalAxiosRequestConfig } from 'axios';
import { useLayoutEffect } from 'react';
import { isMockMode, isRemoteApiUrl, toMockUrl } from './url';

let installed = false;

function headerRecord(config: InternalAxiosRequestConfig): Record<string, string> {
    const raw = AxiosHeaders.from(config.headers ?? {}).toJSON();
    const headers: Record<string, string> = {};
    Object.entries(raw).forEach(([key, value]) => {
        if (value == null) return;
        if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
            headers[key] = String(value);
        }
    });
    return headers;
}

export function installClientMock() {
    if (installed || !isMockMode() || typeof window === 'undefined') return;
    installed = true;
    const originalFetch = window.fetch.bind(window);
    const nativeAdapter = axios.getAdapter(axios.defaults.adapter || 'xhr');

    window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
        const url = typeof input === 'string' ? input : input instanceof URL ? input.href : input.url;
        if (!isRemoteApiUrl(url)) return originalFetch(input, init);
        return originalFetch(toMockUrl(url), init);
    };

    axios.defaults.adapter = async (config) => {
        const rawUrl = config.baseURL ? new URL(config.url || '', config.baseURL).toString() : String(config.url || '');
        if (!isRemoteApiUrl(rawUrl)) return nativeAdapter(config);
        const url = new URL(rawUrl);
        if (config.params && typeof config.params === 'object') {
            Object.entries(config.params as Record<string, unknown>).forEach(([key, value]) => {
                if (value != null) url.searchParams.set(key, String(value));
            });
        }
        const method = (config.method || 'get').toUpperCase();
        const headers = headerRecord(config);
        let body: BodyInit | undefined;
        if (typeof FormData !== 'undefined' && config.data instanceof FormData) {
            delete headers['Content-Type'];
            delete headers['content-type'];
            body = config.data;
        } else if (config.data != null && method !== 'GET' && method !== 'HEAD') {
            body = typeof config.data === 'string' ? config.data : JSON.stringify(config.data);
            if (!headers['Content-Type'] && !headers['content-type']) {
                headers['Content-Type'] = 'application/json';
            }
        }
        const response = await originalFetch(toMockUrl(url.toString()), { method, headers, body });
        const text = await response.text();
        let data: unknown = {};
        if (text) {
            try {
                data = JSON.parse(text) as unknown;
            } catch {
                data = { message: text };
            }
        }
        const axiosResponse = {
            data,
            status: response.status,
            statusText: response.statusText,
            headers: {},
            config,
        };
        if (response.status >= 400) {
            const message = data && typeof data === 'object' && 'message' in data && typeof data.message === 'string'
                ? data.message
                : 'Request failed';
            throw new AxiosError(message, String(response.status), config, null, axiosResponse);
        }
        return axiosResponse;
    };
}

if (typeof window !== 'undefined') {
    installClientMock();
}

export function MockBridge() {
    useLayoutEffect(() => {
        installClientMock();
    }, []);
    return null;
}
