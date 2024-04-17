import { MouseEventHandler } from "react"

export const IcDropdown = ({ width = '24', height = '25', onClick, className }: { width?: string, height?: string, onClick?: MouseEventHandler<SVGSVGElement>, className?: string }) => {
    return (
        <svg className={className} onClick={onClick} xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 25" fill="none">
            <path d="M11.3003 14.8L8.70026 12.2C8.38359 11.8833 8.31292 11.521 8.48826 11.113C8.66359 10.705 8.97592 10.5007 9.42526 10.5H14.5753C15.0253 10.5 15.3379 10.7043 15.5133 11.113C15.6886 11.5217 15.6176 11.884 15.3003 12.2L12.7003 14.8C12.6003 14.9 12.4919 14.975 12.3753 15.025C12.2586 15.075 12.1336 15.1 12.0003 15.1C11.8669 15.1 11.7419 15.075 11.6253 15.025C11.5086 14.975 11.4003 14.9 11.3003 14.8Z" fill="#90A3BF" />
        </svg>
    )
}