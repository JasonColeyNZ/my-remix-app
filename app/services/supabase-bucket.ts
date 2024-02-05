// import { composeUploadHandlers } from "@remix-run/server-runtime/dist/formData.js";
// import { createMemoryUploadHandler } from "@remix-run/server-runtime/dist/upload/memoryUploadHandler.js";
import type { SupabaseClient, User } from "@supabase/supabase-js";
// import { ACCEPTED_IMAGE_TYPES } from "~/utils/types.ts";

export const saveImageToSupabase = async (
  supabase: SupabaseClient,
  sbUser: User,
  objectId: string,
  fieldId: string,
  file: File,
  storedFileName: string,
) => {
  if (storedFileName) {
    console.log("remove", storedFileName);
    await supabase.storage.from("entity-public").remove([`${storedFileName}`]);
  }
  const newStoredFileName = `${sbUser.app_metadata.entityId}/${objectId}/${
    fieldId + "_" + new Date().getTime().toString()
  }`;
  const { data: result, error } = await supabase.storage
    .from("entity-public")
    .upload(`${newStoredFileName}`, file, {
      upsert: true,
    });
  if (error) {
    throw error;
  }
  const url = supabase.storage.from("entity-public").getPublicUrl(result.path);
  // console.log("result", result);
  // console.log("url", url.data.publicUrl);
  //return uploadedImage.secure_url;
  return {
    // filename: __filename,
    storageKey: result.path,
    publicUrl: url.data.publicUrl,
    storedFileName: newStoredFileName,
  };
};

// export const imageUploadHandler = (
//   sbUser: User,
//   supabase: SupabaseClient,
//   objectId: string,
//   fieldId: string,
// ) =>
//   composeUploadHandlers(
//     // our custom upload handler
//     async ({ name, contentType, data, filename }) => {
//       //console.log("uploadHandler", name, contentType, data, filename);

//       if (!ACCEPTED_IMAGE_TYPES.includes(contentType)) {
//         return undefined;
//       }
//       //console.log("uploadHandler", name, contentType, data, filename);

//       const chunks = [];
//       for await (const chunk of data) chunks.push(chunk);
//       const buffer = Buffer.concat(chunks);

//       //upload image to supabase storage
//       // const response = new Response();
//       // const supabaseClient = getSupabaseServerClient(request, response);

//       const { data: result, error } = await supabase.storage
//         .from("entity-public")
//         .upload(
//           `${sbUser.app_metadata.entityId}/${objectId}/${fieldId}`,
//           buffer,
//           {
//             upsert: true,
//           },
//         );
//       if (error) {
//         throw error;
//       }
//       const url = supabase.storage
//         .from("entity-public")
//         .getPublicUrl(result.path);
//       // console.log("result", result);
//       // console.log("url", url.data.publicUrl);
//       //return uploadedImage.secure_url;
//       return JSON.stringify({
//         filename: filename,
//         storageKey: result.path,
//         publicUrl: url.data.publicUrl,
//       });
//     },
//     // fallback to memory for everything else
//     createMemoryUploadHandler(),
//   );
