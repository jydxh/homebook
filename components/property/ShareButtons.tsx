"use client";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { IoIosCopy } from "react-icons/io";
import {
	EmailShareButton,
	EmailIcon,
	FacebookShareButton,
	FacebookIcon,
	WhatsappShareButton,
	WhatsappIcon,
	TwitterShareButton,
	TwitterIcon,
	LinkedinShareButton,
	LinkedinIcon,
} from "react-share";
import { toast, useToast } from "@/hooks/use-toast";

const domineName = process.env.DOMINE_LOCAL || "http://localhost:3000";

function ShareButtons({
	title,
	category = "tourism",
}: {
	title: string;
	category?: string;
}) {
	const pathname = usePathname();
	const url = domineName + pathname;
	const handleCopyLink = async () => {
		try {
			await navigator.clipboard.writeText(url);
			toast({ description: "Copy to clipboard success!" });
		} catch (error) {
			console.error(error);
			toast({ description: "Failed to copy to clipboard!" });
		}
	};
	return (
		<>
			<StyledButton asChild={false} onClick={handleCopyLink}>
				<>
					<IoIosCopy className="w-4 h-4" />
					<span>Copy Link</span>
				</>
			</StyledButton>

			<StyledButton>
				<TwitterShareButton
					className="flex justify-start items-center gap-2"
					url={url}
					title={title}
					related={[category]}>
					<TwitterIcon className="w-5 h-5" borderRadius={10} /> Twitter
				</TwitterShareButton>
			</StyledButton>
			<StyledButton>
				<WhatsappShareButton
					className="flex justify-start items-center gap-2"
					title={title}
					url={url}>
					<WhatsappIcon className="w-5 h-5" borderRadius={10} /> Whatsapp
				</WhatsappShareButton>
			</StyledButton>

			<StyledButton>
				<LinkedinShareButton
					className="flex justify-start items-center gap-2"
					title={title}
					url={url}>
					<LinkedinIcon className="w-5 h-5" borderRadius={10} /> Linkedin
				</LinkedinShareButton>
			</StyledButton>
			<StyledButton>
				<FacebookShareButton
					className="flex justify-start items-center gap-2"
					title={title}
					url={url}>
					<FacebookIcon className="w-5 h-5" borderRadius={10} /> Facebook
				</FacebookShareButton>
			</StyledButton>
			<StyledButton>
				<EmailShareButton
					className="flex justify-start items-center gap-2"
					title={title}
					url={url}>
					<EmailIcon className="w-5 h-5" borderRadius={10} /> Email
				</EmailShareButton>
			</StyledButton>
		</>
	);
}
export default ShareButtons;

const StyledButton = ({
	children,
	asChild = true,
	...props
}: {
	children: React.ReactNode;
	asChild?: boolean;
	[key: string]: unknown;
}) => {
	return (
		<Button
			asChild={asChild}
			{...props}
			variant={"outline"}
			className="flex justify-start gap-x-2 rounded-md">
			{children}
		</Button>
	);
};
