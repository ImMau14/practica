import type { ReactNode } from "react"
import BgWebm from "@assets/bg.webm"

interface AnimatedBackgroundProps {
	children: ReactNode
	className?: string
}

export const AnimatedBackground = ({ children, className = "" }: AnimatedBackgroundProps) => {
	return (
		<div className={` ${className} relative overflow-hidden`}>
			<video
				autoPlay
				muted
				loop
				className="-z-1 absolute h-full w-auto object-cover opacity-40 md:h-auto md:w-full"
				aria-hidden="true"
			>
				<source src={BgWebm} type="video/webm" />
			</video>

			<div className="relative z-0">{children}</div>
		</div>
	)
}
