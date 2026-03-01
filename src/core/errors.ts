/**
 * Custom Error Domain hierarchy for Nexus CLI.
 * Enables granular error tracking across services and commands.
 */
export class NexusError extends Error {
  constructor(public message: string, public code: string = 'NEXUS_INTERNAL') {
    super(message);
    this.name = 'NexusError';
  }
}

export class ApiError extends NexusError {
  constructor(message: string, public status?: number) {
    super(message, 'NEXUS_API_FAILURE');
  }
}

export class ValidationError extends NexusError {
  constructor(message: string) {
    super(message, 'NEXUS_VALIDATION_ERROR');
  }
}

export class ConfigError extends NexusError {
  constructor(message: string) {
    super(message, 'NEXUS_CONFIG_INVALID');
  }
}
