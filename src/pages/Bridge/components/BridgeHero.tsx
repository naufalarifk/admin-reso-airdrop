import { useTranslation } from 'react-i18next';
import { Text } from '@/components';

export default function BridgeHero() {
   const { t } = useTranslation();

   return (
      <>
         <Text
            weight="semiBold"
            className="text-center text-2xl lg:text-5xl">
            {t('bridge.title.supertitle')}
            <span className="text-primary">{t('bridge.title.subtitle')}</span>
         </Text>
         <Text
            className="mb-12 mt-4 text-center text-sm lg:text-2xl"
            textColor="lighGray">
            Our bridge feature lets you easily move assets between different blockchains, providing
            greater flexibility and access to more opportunities.
            {/* {t('bridge.subtitle.supertitle')} <br /> {t('bridge.subtitle.subtitle')} */}
         </Text>
      </>
   );
}
