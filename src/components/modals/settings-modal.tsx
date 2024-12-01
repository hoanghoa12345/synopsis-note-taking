import { useSettings } from "@/hooks/use-settings";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";
import { ModeToggle } from "../mode-toggle";
import { Label } from "../ui/label";
import { appConfig } from "@/lib/config";

export const SettingsModal = () => {
  const settings = useSettings();

  return (
    <Dialog open={settings.isOpen} onOpenChange={settings.onClose}>
      <DialogContent>
        <DialogHeader className="border-b pb-3">
          <h2 className="text-lg font-medium">
            My settings
          </h2>
        </DialogHeader>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-1">
            <Label>
              Appearance
            </Label>
            <span className="text-[0.8rem] text-muted-foreground">
              Customize how {appConfig.name} looks on your device
            </span>
          </div>
          <ModeToggle />
        </div>
      </DialogContent>
    </Dialog>
  );
};