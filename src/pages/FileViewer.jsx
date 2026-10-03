import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  File,
  Image as ImageIcon,
  Video,
  Music,
  FileText,
  Download,
  AlertCircle,
  Loader2,
} from "lucide-react";

import { getFileQR } from "../api/fileQR";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

function FileViewer() {
  const { fileId } = useParams();

  const [file, setFile] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    const loadFile = async () => {
      try {
        const response = await getFileQR(fileId);

        setFile(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Unable to load file.");
      } finally {
        setLoading(false);
      }
    };

    loadFile();
  }, [fileId]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950 dark:text-white">
        <Loader2 size={42} className="animate-spin text-indigo-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 dark:bg-slate-950">
        <div className="max-w-md rounded-3xl border border-red-200 bg-white p-8 text-center shadow-xl dark:border-red-900 dark:bg-slate-900">
          <AlertCircle size={48} className="mx-auto text-red-500" />

          <h1 className="mt-5 text-2xl font-black dark:text-white">
            File Unavailable
          </h1>

          <p className="mt-3 text-slate-500">{error}</p>
        </div>
      </div>
    );
  }

  const fileUrl = `${API_URL}/api/file-qr/${fileId}/download`;

  const isImage = file.mimeType.startsWith("image/");

  const isVideo = file.mimeType.startsWith("video/");

  const isAudio = file.mimeType.startsWith("audio/");

  const isPDF = file.mimeType === "application/pdf";

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10 dark:bg-slate-950">
      <div className="mx-auto max-w-4xl">
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-900">
          {/* HEADER */}

          <div className="border-b border-slate-100 p-6 dark:border-slate-800">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-600">
                {isImage ? (
                  <ImageIcon />
                ) : isVideo ? (
                  <Video />
                ) : isAudio ? (
                  <Music />
                ) : (
                  <FileText />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <h1 className="truncate text-xl font-black">
                  {file.originalName}
                </h1>

                <p className="mt-1 text-sm text-slate-400">
                  {formatBytes(file.size)}
                </p>
              </div>
            </div>
          </div>

          {/* CONTENT */}

          <div className="p-5 sm:p-8">
            {/* IMAGE */}

            {isImage && (
              <div className="overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-950">
                <img
                  src={fileUrl}
                  alt={file.originalName}
                  className="mx-auto max-h-[700px] max-w-full object-contain"
                />
              </div>
            )}

            {/* VIDEO */}

            {isVideo && (
              <video
                src={fileUrl}
                controls
                className="mx-auto max-h-[700px] w-full rounded-2xl bg-black"
              />
            )}

            {/* AUDIO */}

            {isAudio && (
              <div className="rounded-2xl bg-slate-100 p-10 text-center dark:bg-slate-950">
                <Music size={70} className="mx-auto text-indigo-500" />

                <p className="mt-5 font-bold">{file.originalName}</p>

                <audio
                  src={fileUrl}
                  controls
                  className="mx-auto mt-6 w-full max-w-xl"
                />
              </div>
            )}

            {/* PDF */}

            {isPDF && (
              <iframe
                src={fileUrl}
                title={file.originalName}
                className="h-[700px] w-full rounded-2xl border"
              />
            )}

            {/* OTHER FILES */}

            {!isImage && !isVideo && !isAudio && !isPDF && (
              <div className="rounded-2xl bg-slate-100 p-12 text-center dark:bg-slate-950">
                <File size={70} className="mx-auto text-slate-400" />

                <h2 className="mt-5 text-xl font-bold">{file.originalName}</h2>

                <p className="mt-2 text-sm text-slate-500">
                  This file cannot be previewed in the browser.
                </p>
              </div>
            )}

            {/* DOWNLOAD */}

            {file.allowDownload && (
              <a
                href={fileUrl}
                className="mx-auto mt-6 flex max-w-md items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-4 font-bold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-700"
              >
                <Download size={20} />
                Download File
              </a>
            )}
          </div>

          {/* FOOTER */}

          <div className="border-t border-slate-100 px-6 py-5 text-center dark:border-slate-800">
            <p className="text-xs text-slate-400">Powered by QuickQR</p>
          </div>
        </div>
      </div>
    </main>
  );
}

function formatBytes(bytes) {
  if (!bytes) return "0 Bytes";

  const units = ["Bytes", "KB", "MB", "GB"];

  const i = Math.floor(Math.log(bytes) / Math.log(1024));

  return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${units[i]}`;
}

export default FileViewer;
