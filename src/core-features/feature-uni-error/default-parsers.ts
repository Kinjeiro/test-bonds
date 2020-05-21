import UniError, { UniErrorParserFn } from './model-uni-error';

export const parseFromJSError: UniErrorParserFn = (
  jsError,
  additionalUniErrorData,
) => {
  if (jsError instanceof Error) {
    const {
      //code,
      message,
      stack,
    } = jsError;

    // not InternalError
    const isUnexpected =
      jsError instanceof SyntaxError
      || jsError instanceof TypeError
      // || jsError instanceof InternalError
      || jsError instanceof RangeError
      || jsError instanceof ReferenceError
    ;

    return new UniError({
      //uniErrorCode: code,
      internalMessage: message,
      stack,
      originalError: jsError,
      isUnexpected,
      ...additionalUniErrorData,
    });
  }
};
