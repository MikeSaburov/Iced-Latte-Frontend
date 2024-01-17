import { ErrorResponse } from '@/models/ErrorResponse'
import { handleResponse } from '@/utils/handleResponse'

type SuccessResponse = {
  token: string
}

type LoginCredentials = {
  email: string
  password: string
}

type RegisterCredentials = {
  firstName: string
  lastName: string
  email: string
  password: string
}

interface ConfirmEmailResponse {
  token: {
    token: string
  }
  httpStatusCode: number
}

export async function apiConfirmEmail(
  token: string | null,
): Promise<ConfirmEmailResponse> {
  try {
    if (!token) {
      throw new Error('Token is null or undefined')
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_HOST_REMOTE}/auth/confirm`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: token }),
      },
    )

    const responseData: ConfirmEmailResponse = {
      token: await response.json(),
      httpStatusCode: response.status,
    }

    return responseData
  } catch (error) {
    console.error('confirm email:', error)
    throw error
  }
}

export async function apiRegisterUser(credentials: RegisterCredentials) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_HOST_REMOTE}/auth/register`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      },
    )

    if (!response.ok) {
      const errorMessage = await response.text()

      throw new Error(`Registration failed: ${errorMessage}`)
    }
    const registerData = await response.text()

    return registerData
  } catch (error) {
    console.error('Registration failed:', error)
    throw error
  }
}

export async function apiLoginUser(
  credentials: LoginCredentials,
): Promise<SuccessResponse> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_HOST_REMOTE}/auth/authenticate`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      },
    )

    return handleResponse<SuccessResponse, ErrorResponse>(response)
  } catch (error) {
    console.error('Login failed:', error)
    throw error
  }
}

export class ServerError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ServerError'
  }
}
