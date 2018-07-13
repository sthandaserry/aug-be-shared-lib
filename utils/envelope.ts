export interface IEnvelope {
    error?: {message: string, stack: string};
    data?: {} | Array<{}>;
    message: string;
  }

// Resource already exist
export function wrapConflict(message?: string): IEnvelope {
    return {
      message: message || 'Conflict',
    };
  }