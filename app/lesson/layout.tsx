import { ExitModal } from "@/components/modals/exit-modal";
import { SettingsModal } from "@/components/modals/settings-modal";

type Props = {
    children: React.ReactNode;
};

const LessonLayout = ({ children }: Props) => {
    return (
        <div className="flex flex-col h-full">
            <div className="flex flex-col h-full w-full">
                <ExitModal />
                <SettingsModal />
                {children}
            </div>
        </div>
    );
};

export default LessonLayout;