Usage
```
import UniError from '../feature-uni-error/model-uni-error';
import UniErrorHelper from '../feature-uni-error/helper-uni-error';
...
const uniError: UniError = UniErrorHelper.parse(promisePayload, undefined, { withoutException: true });
```
