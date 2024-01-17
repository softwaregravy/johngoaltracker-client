import { ConfigurationObject } from './configuration.object'

export namespace ConfigurationService {
  export function getEnvironment(): ConfigurationObject.Environment {
    const valueDefault = ConfigurationObject.Environment.DEVELOPMENT
    const value = process.env
      .NEXT_PUBLIC_NODE_ENV as ConfigurationObject.Environment

    return value ?? valueDefault
  }

  export function getApiBaseUrl(): string {
    const valueDefault = `http://localhost:3000`
    const value = process.env.NEXT_PUBLIC_API_BASE_URL
    return value ?? valueDefault
  }

  export function getGoogleClientId(): string {
    return process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
  }
}
