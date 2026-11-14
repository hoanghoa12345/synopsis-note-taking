import { useEffect, useState } from "react";
import { useSettings } from "@/hooks/use-settings";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "../ui/dialog";
import { ModeToggle } from "../mode-toggle";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { appConfig } from "@/lib/config";
import { Button } from "../ui/button";

const METADATA_API_URL_KEY = "metadataApiUrl";
const METADATA_API_KEY_KEY = "metadataApiKey";

export const SettingsModal = () => {
  const settings = useSettings();
  const [metadataApiUrl, setMetadataApiUrl] = useState("");
  const [metadataApiKey, setMetadataApiKey] = useState("");

  // Load from localStorage when the modal opens
  useEffect(() => {
    if (settings.isOpen) {
      setMetadataApiUrl(localStorage.getItem(METADATA_API_URL_KEY) ?? "");
      setMetadataApiKey(localStorage.getItem(METADATA_API_KEY_KEY) ?? "");
    }
  }, [settings.isOpen]);

  const handleSave = () => {
    localStorage.setItem(METADATA_API_URL_KEY, metadataApiUrl.trim());
    localStorage.setItem(METADATA_API_KEY_KEY, metadataApiKey.trim());
    settings.onClose();
  };

  return (
    <Dialog open={settings.isOpen} onOpenChange={settings.onClose}>
      <DialogContent>
        <DialogHeader className="border-b pb-3">
          <h2 className="text-lg font-medium">My settings</h2>
        </DialogHeader>

        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-1">
            <Label>Appearance</Label>
            <span className="text-[0.8rem] text-muted-foreground">
              Customize how {appConfig.name} looks on your device
            </span>
          </div>
          <ModeToggle />
        </div>

        <div className="space-y-2">
          <Label htmlFor="metadata-api-url">Metadata API URL</Label>
          <Input
            id="metadata-api-url"
            type="url"
            placeholder="Enter your API URL"
            value={metadataApiUrl}
            onChange={(e) => setMetadataApiUrl(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="metadata-api-key">Metadata API Key</Label>
          <Input
            id="metadata-api-key"
            type="password"
            placeholder="Enter your API key"
            value={metadataApiKey}
            onChange={(e) => setMetadataApiKey(e.target.value)}
          />
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button type="button" onClick={handleSave}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};