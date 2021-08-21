// Type definitions for Google API Client
// Reference: https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md

declare namespace gapi {
  type LoadCallback = (...args: unknown[]) => void;
  type LoadConfig = {
    callback: LoadCallback;
    onerror?: () => void | undefined;
    timeout?: number | undefined;
    ontimeout?: () => void | undefined;
  };
  type CallbackOrConfig = LoadConfig | LoadCallback;

  /**
   * Pragmatically initialize gapi class member.
   * Reference: https://developers.google.com/api-client-library/javascript/reference/referencedocs#gapiloadlibraries-callbackorconfig
   */
  export function load(apiName: string, callback: CallbackOrConfig): void;
}

declare namespace gapi.client {
  /**
   * Initializes the JavaScript client with API key, OAuth client ID, scope, and API discovery document(s).
   * If OAuth client ID and scope are provided, this function will load the gapi.auth2 module to perform OAuth.
   * The gapi.client.init function can be run multiple times, such as to set up more APIs, to change API key, or initialize OAuth lazily.
   */
  export function init(args: {
    /**
     * The API Key to use.
     */
    apiKey?: string | undefined;
  }): Promise<void>;

  /**
   * Loads the client library interface to a particular API. If a callback is not provided, a promise is returned.
   * @param urlOrObject The urlOrObject of the API to load.
   * @return promise The promise that get's resolved after the request is finished.
   */
  export function load(
    urlOrObject: string | Record<string, unknown>
  ): Promise<void>;
}

declare namespace gapi.client.calendar.events {
  interface ListParams {
    calendarId: string;
    maxResults: number;
  }

  /**
   * Returns a list of Google Calendar events
   * @param listParams Object containing the Google calendarId and max number of events to return
   * @return GCalResponse The promise returns a GCalResponse
   */
  export function list<T>(listParams: ListParams): Promise<T>;
}
