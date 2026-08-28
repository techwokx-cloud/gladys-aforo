"use client";

import { useRef, useState } from "react";
import { UploadCloud, Send, Loader2, CheckCircle2, X, FileText } from "lucide-react";
import { supportRequestOptions } from "@/lib/site";

export default function SupportRequestForm() {
  const [files, setFiles] = useState<File[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function addFiles(list: FileList | null) {
    if (!list) return;
    const incoming = Array.from(list);
    setFiles((prev) => [...prev, ...incoming].slice(0, 5));
  }

  function removeFile(name: string) {
    setFiles((prev) => prev.filter((f) => f.name !== name));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!confirmed) {
      setError("Please confirm the information provided is accurate.");
      return;
    }
    setError(null);
    setStatus("loading");

    const formData = new FormData(e.currentTarget);
    files.forEach((f) => formData.append("attachments", f));

    try {
      const res = await fetch("/api/support-request", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Something went wrong. Please try again.");
      setStatus("sent");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="flex flex-col items-center gap-3 rounded-xl border border-gold-500/30 bg-cream-200 px-6 py-16 text-center">
        <CheckCircle2 className="h-10 w-10 text-forest-700" />
        <h3 className="font-display text-xl font-semibold text-forest-950">Request submitted</h3>
        <p className="max-w-md text-sm text-forest-800/80">
          Thank you for reaching out on behalf of this family. Our team will review your request
          promptly and follow up with you directly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gold-600">
          Requestor Information
        </h4>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Full Name" required>
            <input name="fullName" required placeholder="Enter your full name" className={inputClass} />
          </Field>
          <Field label="Role" required>
            <select name="role" required defaultValue="" className={inputClass}>
              <option value="" disabled>
                Select your role
              </option>
              {supportRequestOptions.roles.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Phone Number" required>
            <input name="phone" required placeholder="e.g. 0555 296 706" className={inputClass} />
          </Field>
          <Field label="Email Address" required>
            <input
              name="email"
              type="email"
              required
              placeholder="e.g. name@example.com"
              className={inputClass}
            />
          </Field>
          <Field label="Facility / Organization">
            <input name="facility" placeholder="Enter your facility or organization" className={inputClass} />
          </Field>
          <Field label="Location / District" required>
            <select name="district" required defaultValue="" className={inputClass}>
              <option value="" disabled>
                Select your district
              </option>
              {supportRequestOptions.districts.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </Field>
        </div>
      </div>

      <div>
        <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gold-600">
          About the Family in Need
        </h4>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Name of Family Head / Patient" required>
            <input name="familyHeadName" required placeholder="Enter name" className={inputClass} />
          </Field>
          <Field label="Number of Dependents" required>
            <input name="dependents" type="number" min={0} required placeholder="e.g. 4" className={inputClass} />
          </Field>
        </div>
        <Field label="Brief Description of the Family's Situation" required className="mt-4">
          <textarea
            name="situation"
            required
            rows={4}
            placeholder="Please describe their current situation and why support is needed."
            className={inputClass}
          />
        </Field>
      </div>

      <div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Type of Support Requested" required>
            <select name="supportType" required defaultValue="" className={inputClass}>
              <option value="" disabled>
                Select type of support
              </option>
              {supportRequestOptions.supportTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Estimated Amount (GHS)" required>
            <input
              name="estimatedAmount"
              type="number"
              min={0}
              required
              placeholder="e.g. 500"
              className={inputClass}
            />
          </Field>
        </div>
        <Field label="Urgency Level" required className="mt-4 sm:w-1/2 sm:pr-2">
          <select name="urgency" required defaultValue="" className={inputClass}>
            <option value="" disabled>
              Select urgency level
            </option>
            {supportRequestOptions.urgencyLevels.map((u) => (
              <option key={u} value={u}>
                {u}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div>
        <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gold-600">
          Additional Information
        </h4>
        <Field label="Any other information that may help us assess this request">
          <textarea
            name="additionalInfo"
            rows={3}
            placeholder="Provide any additional details, documents or notes."
            className={inputClass}
          />
        </Field>

        <div className="mt-4">
          <label className="mb-1 block text-sm font-semibold text-forest-950">
            Upload Supporting Documents (Optional)
          </label>
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragOver(false);
              addFiles(e.dataTransfer.files);
            }}
            onClick={() => fileInputRef.current?.click()}
            className={`flex cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed px-4 py-8 text-center transition-colors ${
              dragOver ? "border-gold-500 bg-gold-500/5" : "border-forest-900/15 bg-cream-100"
            }`}
          >
            <UploadCloud className="h-6 w-6 text-forest-800/50" />
            <p className="text-sm text-forest-800/70">
              Drag &amp; drop files here or <span className="text-gold-600 underline">click to browse</span>
            </p>
            <p className="text-xs text-forest-800/50">PDF, JPG, PNG (Max 5MB each)</p>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept=".pdf,.jpg,.jpeg,.png"
              className="hidden"
              onChange={(e) => addFiles(e.target.files)}
            />
          </div>
          {files.length > 0 && (
            <ul className="mt-2 space-y-1.5">
              {files.map((f) => (
                <li
                  key={f.name}
                  className="flex items-center justify-between rounded-md border border-forest-900/10 bg-white px-3 py-2 text-xs text-forest-800/80"
                >
                  <span className="flex items-center gap-2 truncate">
                    <FileText className="h-3.5 w-3.5 shrink-0 text-gold-600" />
                    <span className="truncate">{f.name}</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => removeFile(f.name)}
                    className="shrink-0 text-forest-800/50 hover:text-red-600"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <label className="flex items-start gap-2 text-sm text-forest-800/80">
        <input
          type="checkbox"
          checked={confirmed}
          onChange={(e) => setConfirmed(e.target.checked)}
          className="mt-0.5 h-4 w-4 rounded border-forest-900/30 text-forest-900 focus:ring-gold-500"
        />
        I confirm that the information provided is true and accurate to the best of my knowledge.
      </label>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={status === "loading"}
        className="flex w-full items-center justify-center gap-2 rounded-md bg-forest-900 py-3.5 font-semibold text-white transition-colors hover:bg-forest-800 disabled:opacity-70"
      >
        {status === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        Submit Request
      </button>
      <p className="text-center text-xs text-forest-800/50">
        Your information is secure and will be kept confidential.
      </p>
    </form>
  );
}

const inputClass =
  "w-full rounded-md border border-forest-900/15 bg-cream-100 px-3 py-2.5 text-sm placeholder:text-forest-800/40 focus:border-gold-500 focus:outline-none";

function Field({
  label,
  required,
  children,
  className = "",
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="mb-1 block text-sm font-semibold text-forest-950">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
    </div>
  );
}
