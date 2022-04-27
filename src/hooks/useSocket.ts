import { onBeforeUnmount, ref } from "vue";
import { isFunction } from "lodash-es";
import myWebsocket from "@/websocket/index";
export interface useSocketType {
  params: {
    type: string;
    data?: any;
  };
  formatter?: (response: any) => any;
  onUpdate?: (formatterResult: any) => void;
}
export function useSocket(config: useSocketType) {
  const data = ref<any>(null);
  const id = new Date().getTime();
  myWebsocket.subscribe({ id, ...config.params }, (response) => {
    if (isFunction(config.formatter)) {
      data.value = config.formatter(response);
    } else {
      data.value = response;
    }
    if (isFunction(config.onUpdate)) {
      config.onUpdate(data.value);
    }
  });
  const disSubscribe = () => myWebsocket.disSubscribe(config.params.type, id);
  onBeforeUnmount(() => {
    disSubscribe();
  });
  return {
    data,
    disSubscribe,
  };
}
