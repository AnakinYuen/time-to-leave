import { decode } from 'jsonwebtoken';
import { Mode } from 'src/types';

export interface Payload {
  id: string;
  expireAt: number;
  mode: Mode;
  period: number;
}

interface TokenResponseJson {
  auth: boolean;
  token: string;
}

interface ExpireAtResponeJson {
  expireAt: string;
}

export const decodeToken = (token: string): Payload => decode(token) as Payload;

const post = (input: string, body: string, token?: string) => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers.authorization = token;
  }
  return fetch(input, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    headers: headers,
    body,
  });
};

const handleTokenResponse = async (response: Response) => {
  const { auth, token } = (await response.json()) as TokenResponseJson;
  if (!auth) {
    throw new Error('Auth fail');
  }
  window.localStorage.setItem('token', token);
  return decodeToken(token);
};

export const register = async (
  expireAt: string,
  password: string,
  mode: Mode,
  period: number,
): Promise<Payload> => {
  const response = await post(
    `${process.env.API_ORIGIN}/dev/register`,
    JSON.stringify({ expireAt, password, mode, period }),
  );
  return handleTokenResponse(response);
};

export const login = async (id: string, password: string): Promise<Payload> => {
  const response = await post(
    `${process.env.API_ORIGIN}/dev/login`,
    JSON.stringify({ id, password }),
  );
  return handleTokenResponse(response);
};

export const get = async (id: string): Promise<string> => {
  let response: Response | null = null;
  do {
    try {
      response = await fetch(`${process.env.API_ORIGIN}/dev/get?id=${id}`);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
    } catch (err) {
      if (!(err as Error).message.includes('has been blocked by CORS policy')) {
        throw err;
      }
    }
  } while (!response);
  const { expireAt } = (await response.json()) as ExpireAtResponeJson;
  return expireAt;
};

export const update = async (expireAt: string, period: number): Promise<Payload> => {
  const token = window.localStorage.getItem('token');
  if (!token) {
    throw new Error('Missing token');
  }
  const response = await post(
    `${process.env.API_ORIGIN}/dev/update`,
    JSON.stringify({ expireAt, period }),
    token,
  );
  return handleTokenResponse(response);
};
