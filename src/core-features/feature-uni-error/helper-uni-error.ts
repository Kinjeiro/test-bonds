import UniError, { ParseToErrorOptions, ParsingToErrorData, UniErrorParser, ThrowableUniError } from './model-uni-error';
import { parseFromJSError } from './default-parsers';
import ERROR_CODES from './error-codes';

class UniErrorHelper {
  /**
   * Mutable static array
   */
  static PARSERS: UniErrorParser[];

  /**
   * Add to begin of array.
   * For other case - use UniErrorHelper.PARSERS
   * @param parsers
   */
  static addParsers(...parsers: UniErrorParser[]) {
    UniErrorHelper.PARSERS.unshift(...parsers);
  }

  static create(
    anyErrorData: ParsingToErrorData,
    additionalData?: Partial<UniError>,
    options?: ParseToErrorOptions,
  ) : UniError {
    if (typeof anyErrorData === 'string') {
      return new UniError({
        clientMessage: anyErrorData,
      })
    }

    // if can't parse, throwable will occurs - so use "!" symbol
    return UniErrorHelper.parse(anyErrorData, additionalData, options)!;
  }

  static parse(
    anyErrorData: ParsingToErrorData,
    additionalData?: Partial<UniError>,
    options?: ParseToErrorOptions,
  ) : UniError | undefined {
    const {
      withoutException,
    } = options || {};

    let parsedUniError : UniError | undefined;

    if (!anyErrorData) {
      return parsedUniError;
    }
    if (anyErrorData instanceof UniError) {
      return anyErrorData as UniError;
    }

    UniErrorHelper.PARSERS.some((parser) => {
      parsedUniError = parser.parse(
        anyErrorData,
        {
          errorFrom: parser.id,
          ...additionalData,
        },
        options,
      );
      return !!parsedUniError;
    });

    if (!parsedUniError && !withoutException) {
      throw UniErrorHelper.createThrowableUniError({
        internalMessage: ERROR_CODES.CANT_CREATE_UNI_ERROR,
        // todo @ANKU @LOW - may be add key and description for internal
      })
    }

    return parsedUniError;
  }

  static createThrowableUniError(anyErrorData: ParsingToErrorData, additionalData?: Partial<UniError>) {
    return new ThrowableUniError(
      UniErrorHelper.create(anyErrorData, additionalData),
    );
  }
}

UniErrorHelper.addParsers(
  { id: 'FROM_JS_ERROR', parse: parseFromJSError },
);

export default UniErrorHelper;

