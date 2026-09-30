export default function combineContext(...providers) {
  return ({ children }) => {
    return providers.reduceRight((ac, CurrentProvider) => {
      return <CurrentProvider>{ac}</CurrentProvider>;
    }, children);
  };
}
