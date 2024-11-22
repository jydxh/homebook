import { Button } from "../ui/button";

function DemoUserBtn() {
	const handleLoginVisitor = async () => {
		console.log("clicked");
		const loginVisitor = async () => {
			try {
				const res = await fetch("/api/auth/demoVisitor", { method: "POST" });
				const data = await res.json();
				if (res.ok) {
					return data.loginUrl;
				}
			} catch (error) {
				console.log(error);
			}
		};
		const loginUrl = await loginVisitor();
		if (loginUrl) {
			window.location.href = loginUrl;
		}
	};

	return (
		<div className="mt-4 flex gap-x-2 justify-center max-w-[500px] mx-auto">
			<Button className="mt-4 block  mx-auto">Sign in as Demo User</Button>
			<Button
				onClick={handleLoginVisitor}
				className="mt-4 block mx-auto"
				variant={"outline"}>
				Sign in as Visitor
			</Button>
		</div>
	);
}
export default DemoUserBtn;
