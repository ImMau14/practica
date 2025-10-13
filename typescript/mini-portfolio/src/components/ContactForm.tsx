import React, { useState } from "react"

type Submission = {
	title: string
	email: string
	message: string
	ts: number
}

export const ContactForm = () => {
	const [
		title,
		setTitle,
	] =
		useState(
			""
		)
	const [
		email,
		setEmail,
	] =
		useState(
			""
		)
	const [
		message,
		setMessage,
	] =
		useState(
			""
		)
	const [
		vulnerable,
		setVulnerable,
	] =
		useState(
			false
		)
	const [
		error,
		setError,
	] =
		useState<
			| string
			| null
		>(
			null
		)

	function validateEmail(
		e: string
	) {
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
			e
		)
	}

	function handleSubmit(
		ev: React.FormEvent
	) {
		ev.preventDefault()
		setError(
			null
		)

		if (
			!title.trim() ||
			!email.trim() ||
			!message.trim()
		) {
			setError(
				"All fields are required."
			)
			return
		}
		if (
			!validateEmail(
				email
			)
		) {
			setError(
				"Invalid email"
			)
			return
		}

		const payload: Submission =
			{
				title: title.trim(),
				email: email.trim(),
				message: message,
				ts: Date.now(),
			}

		try {
			localStorage.setItem(
				"contact_submission",
				JSON.stringify(
					payload
				)
			)
		} catch (e) {
			setError(
				"Could not save to localStorage."
			)
			return
		}

		const q =
			vulnerable
				? "?vulnerable=1"
				: ""
		window.location.href = `/show-message${q}`
	}

	const inputStyles =
		"mt-1 block w-full rounded border p-2 border-gray-400/40 rounded-md"

	return (
		<form
			onSubmit={
				handleSubmit
			}
			className="flex flex-col items-center gap-4"
		>
			<h1 className="font-heading text-3xl font-semibold">
				Contact
			</h1>

			<label className="block w-full">
				<span className="block text-sm">
					Title
				</span>
				<input
					required
					value={
						title
					}
					onChange={(
						e
					) =>
						setTitle(
							e
								.target
								.value
						)
					}
					className={
						inputStyles
					}
					placeholder="Message title"
				/>
			</label>

			<label className="block w-full">
				<span className="block text-sm">
					Email
				</span>
				<input
					required
					type="email"
					value={
						email
					}
					onChange={(
						e
					) =>
						setEmail(
							e
								.target
								.value
						)
					}
					className={
						inputStyles
					}
					placeholder="your@email.com"
				/>
			</label>

			<label className="block w-full">
				<span className="block text-sm">
					Mensaje
				</span>
				<textarea
					required
					value={
						message
					}
					onChange={(
						e
					) =>
						setMessage(
							e
								.target
								.value
						)
					}
					className={`${inputStyles} min-h-[140px]`}
					placeholder="Type something..."
				/>
			</label>

			<label className="flex items-center gap-2 self-start text-sm">
				<input
					type="checkbox"
					checked={
						vulnerable
					}
					onChange={(
						e
					) =>
						setVulnerable(
							e
								.target
								.checked
						)
					}
				/>
				<span>
					Simule
					vulnerable
					page
				</span>
			</label>

			{error && (
				<div className="text-red-600">
					{
						error
					}
				</div>
			)}

			<div className="flex gap-4">
				<button
					type="button"
					onClick={() => {
						setTitle(
							""
						)
						setEmail(
							""
						)
						setMessage(
							""
						)
						setError(
							null
						)
					}}
					className="rounded-xl border-2 border-gray-400/40 bg-white px-4 py-2 hover:border-gray-500/40 hover:bg-gray-50 active:border-gray-600/40 active:bg-gray-100"
				>
					Reset
				</button>

				<button
					type="submit"
					className="rounded-xl border-2 border-gray-400/40 bg-white px-4 py-2 hover:border-gray-500/40 hover:bg-gray-50 active:border-gray-600/40 active:bg-gray-100"
				>
					Send
				</button>
			</div>
		</form>
	)
}
