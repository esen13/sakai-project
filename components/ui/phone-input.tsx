'use client'

import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import {
	defaultCountries,
	FlagImage,
	parseCountry,
	usePhoneInput
} from 'react-international-phone'
import 'react-international-phone/style.css'

interface PhoneInputProps {
	value: string
	onChange: (value: string) => void
	className?: string
}

export function PhoneInput({ className, value, onChange }: PhoneInputProps) {
	const { phone, handlePhoneValueChange, inputRef, country, setCountry } =
		usePhoneInput({
			value,
			onChange: data => {
				onChange(data.phone)
			},
			defaultCountry: 'kg',
			countries: defaultCountries
		})

	return (
		<div className="flex">
			<div className="relative flex items-center">
				{/* <Select>
					<SelectTrigger className="w-[280px]">
						<SelectValue placeholder="Select a timezone" />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectLabel>North America</SelectLabel>
							<SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
							<SelectItem value="cst">Central Standard Time (CST)</SelectItem>
							<SelectItem value="mst">Mountain Standard Time (MST)</SelectItem>
							<SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
							<SelectItem value="akst">Alaska Standard Time (AKST)</SelectItem>
							<SelectItem value="hst">Hawaii Standard Time (HST)</SelectItem>
						</SelectGroup>
					</SelectContent>
				</Select> */}
				<select
					className="h-10 w-[35px] appearance-none rounded-l-md border-r-0 bg-background pl-[30px] pr-2 py-2 text-sm  focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-1"
					value={country.iso2}
					onChange={e => setCountry(e.target.value)}
				>
					{defaultCountries.map(c => {
						const country = parseCountry(c)
						return (
							<option
								key={country.iso2}
								value={country.iso2}
								className="flex gap-2 items-center"
							>
								{country.name.toUpperCase()}
							</option>
						)
					})}
				</select>
				<div className="pointer-events-none absolute left-2">
					<FlagImage iso2={country.iso2} />
				</div>
			</div>
			<Input
				className={cn('rounded-l-none border-white', className)}
				type="tel"
				ref={inputRef}
				value={phone}
				onChange={handlePhoneValueChange}
			/>
		</div>
	)
}
