import ERROR_CODES from './error-codes';
import { getI18nError } from './i18n-errors';

export const UNI_ERROR_FROM__CREATE = 'UNI_ERROR_FROM__CREATE';

export class UniErrorItem {
  errorKey?: string;
  message?: string;
  /**
   * format message parameters (only  for location on client)
   */
  errorParameters?: object;

  i18nMessage?: string;


  // for validations
  formField?: string;
  errorContext?: string;

  constructor(data: Partial<UniErrorItem>) {
    Object.assign(this, data);
  }
}

export default class UniError {
  readonly isUniError: boolean = true;
  readonly errorFrom: string = UNI_ERROR_FROM__CREATE;

  internalMessage: string;

  // ======================================================
  // CLIENT MULTIPLE ERRORS ITEMS
  // ======================================================
  uniErrorItems: UniErrorItem[] = [];
  get clientMessages(): string[] {
    const {
      isFromServer,
      isNotAvailable,
      uniErrorItems,
    } = this;

    const clientMessages = uniErrorItems.reduce<string[]>((result, uniErrorItem) => {
      const  {
        errorKey,
        errorParameters,
        i18nMessage,
        message,
        // field,
        // errorContext,
      } = uniErrorItem;

      const i18nMessageFinal = i18nMessage || getI18nError(errorKey, errorParameters, message);

      if (i18nMessageFinal) {
        result.push(i18nMessageFinal);
      }
      return result;
    }, []);

    if (clientMessages.length === 0) {
      // default message - errors.INTERNAL_ERROR
      clientMessages.push(
        getI18nError(
          isFromServer
            ? isNotAvailable
              ? ERROR_CODES.SERVER_NOT_AVAILABLE
              : ERROR_CODES.INTERNAL_SERVER_ERROR
            : ERROR_CODES.INTERNAL_ERROR
        )!
      );
    }
    return clientMessages;
  }
  set clientMessages(messages) {
    this.uniErrorItems = messages.map((message) => new UniErrorItem({ i18nMessage: message }));
  }
  get clientMessageKey(): string {
    const item = this.uniErrorItems[0];
    return item
      ? (item.errorKey || item.i18nMessage || item.message)!
      : ERROR_CODES.INTERNAL_ERROR;
  }
  set clientMessageKey(errorKey) {
    this.uniErrorItems = [new UniErrorItem({ errorKey })];
  }
  get clientMessage() {
    return this.clientMessages[0];
  }
  set clientMessage(msg) {
    this.clientMessages = [msg];
  }


  // ======================================================
  // UTILS properties
  // ======================================================
  /**
   * response.status code or js code
   */
  uniErrorCode?: string;

  isUnexpected?: boolean;

  isFromServer?: boolean;

  isNotAvailable?: boolean;
  isNotFound?: boolean;
  isNotAuth?: boolean;

  linkForwardTo?: string;


  // ======================================================
  // WRAPPER PROPERTIES
  // ======================================================
  stack?: any;
  originalError?: any;


  // ======================================================
  // CONSTRUCTOR
  // ======================================================
  constructor(data: Partial<UniError>) {
    const {
      internalMessage,
      ...other
    } = data;
    Object.assign(this, other);
    this.internalMessage = internalMessage || this.clientMessage;
  }
}

export type ParsingToErrorData = Error | UniError | string | Partial<UniError> | string[] | Partial<UniError>[];
export interface ParseToErrorOptions {
  withoutException: boolean,
}
export type UniErrorParserFn = (data: ParsingToErrorData, additionData?: Partial<UniError>, options?: ParseToErrorOptions) => UniError | undefined;

export class UniErrorParser {
  constructor(
    readonly id: string,
    readonly parse: UniErrorParserFn,
    readonly description?: string,
  ) {}
}

export class ThrowableUniError extends Error {
  name: string = 'ThrowableUniError';
  //@ts-ignore
  message: string;

  constructor(uniError: UniError) {
    super(uniError.clientMessage);
    Object.assign(this, uniError);

    // this.message = this.uniError.clientErrorMessage;
    // this.stack = (new Error()).stack;
    // this.stack = uniError.stack
    //   || (uniError.originalError && uniError.originalError.stack)
    //   || (new Error()).stack;
  }
}
