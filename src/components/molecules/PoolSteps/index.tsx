import { Text } from "@/components"
import { useTranslation } from "react-i18next"
export const PoolSteps = ({ active }: { active: number }) => {
    const { t } = useTranslation()
    return (
        <div className="flex justify-between bg-[#181924] p-6 border-[0.5px] border-[#FFFFFF1A] w-full lg:w-3/4 mx-auto min-w-sm rounded-xl bg-card-background">
            <div className="flex flex-col items-center">
                <Text className={`${active >= 1 ? 'bg-[#F23F5D]' : 'bg-[#0E0F19]'} rounded-full w-8 h-8 relative`}><span className={`${active >= 1 ? '' : 'text-[#9F9F9F]'} absolute inset-0 flex items-center justify-center`}>1</span></Text>
                <Text className={` ${active >= 1 ? `text-white` : `text-[#90A3BF]`} text-center`}>{t('pool.steps.first.first')} <br /> {t('pool.steps.first.second')}</Text>
            </div>
            <hr className={`mt-4 ${active > 1 ? `bg-[#F23F5D] border-[#F23F5D]` : `bg-[#0E0F19] border-[#0E0F19]`} h-px border-t-2 w-4/5`} />
            <div className="flex flex-col items-center">
                <Text className={`${active >= 2 ? 'bg-[#F23F5D]' : 'bg-[#0E0F19]'} rounded-full w-8 h-8 relative`}><span className={`${active >= 2 ? '' : 'text-[#90A3BF]'} absolute inset-0 flex items-center justify-center`}>2</span></Text>
                <Text className={active >= 2 ? `text-white` : `text-[#90A3BF]`}>{t('pool.steps.second')}</Text>
            </div>
            {/* <hr className={`mt-4 ${active > 2 ? `bg-[#F23F5D] border-[#F23F5D]` : `bg-[#0E0F19] border-[#0E0F19]`} h-px border-t-2 w-2/5`} />
            <div className="flex flex-col items-center">
                <Text className={`${active >= 3 ? 'bg-[#F23F5D]' : 'bg-[#0E0F19]'} rounded-full w-8 h-8 relative`}><span className={`${active >= 3 ? '' : 'text-[#90A3BF]'} absolute inset-0 flex items-center justify-center`}>3</span></Text>
                <Text className={active >= 3 ? `text-white` : `text-[#90A3BF]`}>{t('pool.steps.third')}</Text>
            </div> */}
        </div>
    )
}