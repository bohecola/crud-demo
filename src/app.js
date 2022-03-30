import { deepMerge, isFunction } from '@/utils';

export const bootstrap = that => {
  // eslint-disable-next-line
  const { conf, refresh, event, id, fn } = that;

  const app = {
    refresh(d) {
      return isFunction(d) ? d(that.params, refresh) : refresh(d);
    }
  };
}