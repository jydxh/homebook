import { Button } from "../ui/button";

function DemoUserBtn() {
	const handleLoginDemo = async (endPoint: "demoVendor" | "demoVisitor") => {
		const loginVisitor = async () => {
			try {
				const res = await fetch(`/api/auth/${endPoint}`, { method: "POST" });
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
			<Button
				onClick={() => handleLoginDemo("demoVendor")}
				className="mt-4 block  mx-auto">
				Sign in as Demo Vendor
			</Button>
			<Button
				onClick={() => handleLoginDemo("demoVisitor")}
				className="mt-4 block mx-auto"
				variant={"outline"}>
				Sign in as Visitor
			</Button>
		</div>
	);
}
export default DemoUserBtn;
