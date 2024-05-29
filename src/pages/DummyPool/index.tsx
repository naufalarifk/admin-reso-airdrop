import { PoolHero } from './components/PoolHero';
import { PoolSteps } from './components/PoolSteps';

export const DummyPool = () => {
   return (
      <section className="mb-10 lg:mt-10">
         <div className="mx-auto w-full space-y-8 px-4 lg:max-w-4xl lg:px-12.5">
            <PoolHero />
            <PoolSteps />
         </div>
      </section>
   );
};
