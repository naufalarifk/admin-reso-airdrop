import BridgeHero from './components/BridgeHero';
import BridgeSteps from './components/BridgeSteps';

export const Bridge = () => {
   return (
      <section className="mb-10 lg:mt-10">
         <div className="mx-auto w-full px-4 lg:max-w-4xl lg:px-12.5">
            <BridgeHero />
            <BridgeSteps />
         </div>
      </section>
   );
};
