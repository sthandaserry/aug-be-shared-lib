export interface IEnvelope {
  statusCode?: number;
  error?: { message: string, stack: string };
  data?: {} | Array<{}>;
  message: string;
}

export function wrapSuccess(data: {} | Array<{}>, message?: string): IEnvelope {
  return {
    statusCode: 200,
    data,
    message: message || 'No message provided.',
  };
}

export function wrapNocontent(message?: string): IEnvelope {
  return {
    statusCode: 204,
    message: message || 'No content.',
  };
}

// Resource already exist
export function wrapConflict(message?: string): IEnvelope {
  return {
    statusCode: 409,
    message: message || 'Conflict.',
  };
}

export function wrapBadrequest(message?: string): IEnvelope {
  return {
    statusCode: 400,
    message: message || 'Bad request.',
  };
}