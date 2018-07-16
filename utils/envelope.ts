export interface IEnvelope {
  error?: { message: string, stack: string };
  data?: {} | Array<{}>;
  message: string;
}

export function wrapSuccess(data: {} | Array<{}>, message?: string): IEnvelope {
  return {
    data,
    message: message || 'No message provided.',
  };
}

// Resource already exist
export function wrapConflict(message?: string): IEnvelope {
  return {
    message: message || 'Conflict',
  };
}