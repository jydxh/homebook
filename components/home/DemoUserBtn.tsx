import { Button } from "../ui/button";

function DemoUserBtn() {
	return (
		<div className="mt-4 flex gap-x-2 justify-center max-w-[500px] mx-auto">
			<Button className="mt-4 block  mx-auto">Sign in as Demo User</Button>
			<Button className="mt-4 block mx-auto" variant={"outline"}>
				Sign in as Visitor
			</Button>
		</div>
	);
}
export default DemoUserBtn;
