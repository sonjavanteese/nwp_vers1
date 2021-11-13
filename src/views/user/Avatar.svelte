<script>
  import { createEventDispatcher } from "svelte";
  import {supabase} from "../../lib/supabase";

  export let path;
  export let size = "100";

  let uploading = false;
  let src;
  let files;

  const dispatch = createEventDispatcher();

  const downloadImage = async () => {
    try {
      const { data, error } = await supabase.storage
        .from("avatars")
        .download(path);
      if (error) throw error;

      src = URL.createObjectURL(data);
    } catch (error) {
      console.error("Error downloading image: ", error.message);
    }
  };

  const uploadAvatar = async () => {
    try {
      uploading = true;

      if (!files || files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      let { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      path = filePath;
      dispatch("upload");
    } catch (error) {
      alert(error.message);
    } finally {
      uploading = false;
    }
  };
</script>

<div
  class="w-full mb-4 flex flex-col items-center px-4 py-6 bg-white rounded-md text-center shadow-md tracking-wide uppercase border border-blue hover:bg-blue-200 hover:text-white text-purple-600 ease-linear transition-all duration-150"
>
  {#if path}
    <img
      use:downloadImage
      {src}
      alt="Avatar"
      class="avatar image"
      style="height: {size}; width: {size};"
    />
  {:else}
    <div class="avatar no-image" style="height: {size}; width: {size};" />
  {/if}
  <div class="p-1" />
  <div style="width: {size};">
    <label
      class="btn btn-blue cursor-pointer"
      for="single"
    >
      {uploading ? "Uploading ..." : "Upload"}
    </label>
    <input
      style="visibility: hidden; position:absolute;"
      type="file"
      id="single"
      accept="image/*"
      bind:files
      on:change={uploadAvatar}
      disabled={uploading}
    />
  </div>
</div>
