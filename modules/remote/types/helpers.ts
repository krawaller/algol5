export type Listener<Data> = (data: Data) => void;

export type Unsubscriber = () => void;

export type SubscriberOpts<Data> = { listener: Listener<Data> };

export type Subscriber<
  Data,
  Opts extends Record<string, unknown> = Record<string, never>
> = (opts: SubscriberOpts<Data> & Opts) => Unsubscriber;
