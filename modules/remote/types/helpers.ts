export type Listener<Data> = (data: Data) => void;

export type Unsubscriber = () => void;

export type SubscriberOpts<Data> = { listener: Listener<Data> };

export type Subscriber<
  Data,
  Opts extends SubscriberOpts<Data> = SubscriberOpts<Data>
> = (opts: Opts) => Unsubscriber;
