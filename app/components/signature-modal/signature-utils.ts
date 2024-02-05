// //github.com/embiem/react-canvas-draw/issues/62

// export const combineDrawing = (canvasRef: any) => {
//   if (!canvasRef || !canvasRef.current) return;

//   const width = canvasRef.current.props.canvasWidth;
//   const height = canvasRef.current.props.canvasHeight;
//   const background = canvasRef.current.canvasContainer.children[3];
//   const drawing = canvasRef.current.canvasContainer.children[1];
//   const canvas = document.createElement("canvas");
//   canvas.width = width;
//   canvas.height = height;

//   // composite now
//   const ctx = canvas.getContext("2d");
//   if (!ctx) return;
//   ctx.drawImage(background, 0, 0);
//   ctx.globalAlpha = 1.0;
//   ctx.drawImage(drawing, 0, 0);

//   const dataUri = canvas.toDataURL("image/jpeg", 1.0);
//   const data = dataUri.split(",")[1];
//   const mimeType = dataUri.split(";")[0].slice(5);

//   const bytes = window.atob(data);
//   const buf = new ArrayBuffer(bytes.length);
//   const arr = new Uint8Array(buf);

//   for (let i = 0; i < bytes.length; i++) {
//     arr[i] = bytes.charCodeAt(i);
//   }

//   const blob = new Blob([arr], { type: mimeType });
//   return { blob: blob, dataUri: dataUri };
// };

// export const saveImage = (blob: Blob, filename: string) => {
//   const a = document.createElement("a");
//   document.body.appendChild(a);
//   a.setAttribute("style", "display: none");

//   const url = window.URL.createObjectURL(blob);
//   a.href = url;
//   a.download = filename;
//   a.click();
//   window.URL.revokeObjectURL(url);
// };

// // const { blob } = combineDrawing(canvasRef);
// // saveImage(blob, "test.jpg");

// //Thanks for this function is really helpful, only change I had to make was change the background image index from 3 to 0, so its
// // const background = canvasRef.current.canvasContainer.children[0];
