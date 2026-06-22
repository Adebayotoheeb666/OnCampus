"use client";

import { useState, useTransition, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { submitMaintenanceRequest } from "@/modules/resident/actions";

export function MaintenanceRequestForm({ tenantId }: { tenantId: string }) {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [category, setCategory] = useState<"plumbing" | "electrical" | "structural" | "other">("plumbing");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<"low" | "normal" | "high" | "urgent">("normal");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function readFileAsBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  function handleSubmit() {
    setError(null);
    startTransition(async () => {
      let photoBase64: string | undefined;
      const file = fileRef.current?.files?.[0];
      if (file) {
        if (file.size > 5 * 1024 * 1024) {
          setError("Photo must be under 5 MB");
          return;
        }
        photoBase64 = await readFileAsBase64(file);
      }

      const result = await submitMaintenanceRequest({
        tenantId,
        category,
        description,
        priority,
        photoBase64,
      });
      if (!result.success) {
        setError(result.error);
        return;
      }
      router.push("/resident/maintenance");
      router.refresh();
    });
  }

  return (
    <div className="space-y-4">
      <select className="w-full rounded-lg border border-stone-200 px-3 py-2" value={category} onChange={(e) => setCategory(e.target.value as typeof category)}>
        <option value="plumbing">Plumbing</option>
        <option value="electrical">Electrical</option>
        <option value="structural">Structural</option>
        <option value="other">Other</option>
      </select>
      <textarea className="w-full rounded-lg border border-stone-200 px-3 py-2" rows={4} placeholder="Describe the issue…" value={description} onChange={(e) => setDescription(e.target.value)} />
      <div>
        <label className="mb-1 block text-sm font-medium text-stone-700">Photo (optional)</label>
        <input ref={fileRef} type="file" accept="image/*" capture="environment" className="w-full text-sm" />
        <p className="mt-1 text-xs text-stone-500">Uploaded to Cloudinary when configured; otherwise omitted.</p>
      </div>
      <select className="w-full rounded-lg border border-stone-200 px-3 py-2" value={priority} onChange={(e) => setPriority(e.target.value as typeof priority)}>
        <option value="low">Low priority</option>
        <option value="normal">Normal</option>
        <option value="high">High</option>
        <option value="urgent">Urgent</option>
      </select>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <Button onClick={handleSubmit} disabled={isPending} className="w-full">
        {isPending ? "Submitting…" : "Submit request"}
      </Button>
    </div>
  );
}
