import type { InjectionKey, Ref } from "vue";

type TriggerClickHandler = () => void;
type OptionClickHandler = (value: string | null | undefined) => void;

export const handleTriggerClickKey = Symbol() as InjectionKey<TriggerClickHandler>;
export const isOpenKey = Symbol() as InjectionKey<Ref<boolean>>;

export const setSelectedItemKey = Symbol() as InjectionKey<OptionClickHandler>;
export const selectedItemKey = Symbol() as InjectionKey<Ref<unknown>>;
