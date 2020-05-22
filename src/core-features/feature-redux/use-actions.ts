import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';

// [key: string]: ActionCreator<A>

/**
 * hook replace for @connect
 *
 * @param actions
 * @param deps
 */
export function useActions<T extends ActionCreatorsMapObject>(actions: T, deps?: any): T {
	const dispatch = useDispatch();
	return useMemo(
		() => {
			//if (Array.isArray(actions)) {
			//	return actions.map(a => bindActionCreators(a, dispatch));
			//}
			return bindActionCreators(actions, dispatch);
		},
		[actions, dispatch]
	);
}
