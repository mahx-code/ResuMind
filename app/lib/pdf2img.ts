import * as pdfjs from "pdfjs-dist";

// Set the worker source for pdfjs-dist
if (typeof window !== "undefined") {
  pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
}

/**
 * Converts a PDF file to an image (Blob)
 * @param pdf The PDF file or blob to convert
 * @returns A Promise that resolves to a Blob (image/png)
 */
export async function convertPdfToImage(pdf: File | Blob): Promise<Blob> {
  if (typeof window === "undefined") {
    throw new Error(
      "convertPdfToImage can only be used in the browser environment"
    );
  }

  const arrayBuffer = await pdf.arrayBuffer();
  const loadingTask = pdfjs.getDocument({ data: arrayBuffer });
  const pdfDoc = await loadingTask.promise;

  // We convert the first page of the PDF to an image
  const page = await pdfDoc.getPage(1);
  const viewport = page.getViewport({ scale: 2 }); // Scale 2 for better quality

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("Failed to get canvas context");
  }

  canvas.height = viewport.height;
  canvas.width = viewport.width;

  const renderContext = {
    canvasContext: context,
    viewport: viewport,
    canvas: canvas, // Required in newer pdfjs-dist versions
  };

  await page.render(renderContext).promise;

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
      } else {
        reject(new Error("Failed to convert canvas to blob"));
      }
    }, "image/png");
  });
}
