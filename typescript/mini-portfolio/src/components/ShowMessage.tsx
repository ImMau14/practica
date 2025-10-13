import React, { useEffect, useState } from "react"

type Submission = {
	title: string
	email: string
	message: string
	ts: number
}

export default function ShowMessage() {
	const [
		data,
		setData,
	] =
		useState<Submission | null>(
			null
		)
	const [
		modeVuln,
		setModeVuln,
	] =
		useState(
			false
		)

	useEffect(() => {
		const params =
			new URLSearchParams(
				window.location.search
			)
		setModeVuln(
			params.get(
				"vulnerable"
			) ===
				"1"
		)

		const raw =
			localStorage.getItem(
				"contact_submission"
			)
		if (
			!raw
		) {
			setData(
				null
			)
			return
		}

		try {
			const parsed =
				JSON.parse(
					raw
				) as Submission
			setData(
				parsed
			)
		} catch (e) {
			setData(
				null
			)
		}

		localStorage.removeItem(
			"contact_submission"
		)
	}, [])

	if (
		!data
	) {
		return (
			<div className="mx-auto mt-8">
				<p>
					There
					is
					no
					data
					saved
					in
					localStorage.
				</p>
			</div>
		)
	}

	return (
		<div className="flex max-w-xl flex-col items-center">
			<h2 className="mb-4 font-heading text-2xl font-semibold">
				Message
				view{" "}
				{modeVuln
					? "(VULNERABLE)"
					: "(SECURE)"}
			</h2>

			<div className="mb-3 w-full">
				<span className="text-sm">
					Title
				</span>
				{modeVuln ? (
					<div
						className="mt-1 block w-full rounded rounded-md border border-gray-400/40 bg-white p-2"
						dangerouslySetInnerHTML={{
							__html: data.title,
						}}
					/>
				) : (
					<div className="mt-1 block w-full rounded rounded-md border border-gray-400/40 bg-white p-2">
						{
							data.title
						}
					</div>
				)}
			</div>

			<div className="mb-3 w-full">
				<span className="text-sm">
					Email
				</span>
				<div className="mt-1 block w-full rounded rounded-md border border-gray-400/40 bg-white p-2">
					{
						data.email
					}
				</div>
			</div>

			<div className="mb-3 w-full">
				<span className="text-sm">
					Message
				</span>
				{modeVuln ? (
					<div
						className="mt-1 block w-full rounded rounded-md border border-gray-400/40 bg-white p-2"
						dangerouslySetInnerHTML={{
							__html: data.message,
						}}
					/>
				) : (
					<div className="mt-1 block w-full whitespace-pre-wrap rounded rounded-md border border-gray-400/40 bg-white p-2">
						{
							data.message
						}
					</div>
				)}
			</div>

			<div className="mt-2 text-sm text-gray-600">
				Note:
				The
				contents
				of
				localStorage
				were
				deleted
				after
				reading.
			</div>
		</div>
	)
}
