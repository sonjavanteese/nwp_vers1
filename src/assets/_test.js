let titel = '';
let interpret = '';
let album = '';
let jahr = '';
let img_url = '';
let file_url = '';
let pdata = {
  "titel": "LA LA LAND",
  "interpret": "Haiyti",
  "album": "Sui Sui",
  "jahr": 2020,
  "lyrics": "[Songtext zu „LA LA LAND“]\n\n[Hook]\nFür dich würd' ich auf die Gangster schießen, pah, pau, pau\nWenn es sein muss, stürme ich für dich in eine Bank\nTrage den Diamantring an der Hand\nFahre den Fluchtwagen ins La La Land\n\n[Post-Hook]\nLa La Land\nLa La Land\nLa La Land\n\n[Part 1]\nDein ganzes Outfit ist von Louis\nDoch ich mag dich auch im No-Name-Hoodie\nWir treffen uns auf meiner Show\nDoch du bist kein Groupie\nKomme aus der Bahn, wenn ich an dich denk'\nBaby, ich will dich und keinen anderen\nIch schlafe ein in deinem Hemd\nGlaub mir, es ist mehr als nur ein One-Night-Stand\nEs spiegeln sich Hochhausfassaden\nWir rasen in einem gestohlenen Wagen\nIm Spiegel die blau-roten Farben\nWir wissen, sie haben uns grade verraten",
  "id": 3,
  "img_url": "https://nwp-cgn.de/img/poser/haiyti-wall1.jpg",
  "file_url": "https://nwp-cgn.de/archiv/audio/haiyti_la_la_land.mp3"
}

const set = {
  titel = pdata.titel;
  interpret = pdata.interpret;
  album = pdata.album;
  jahr = pdata.jahr;
  img_url = pdata.img_url;
  file_url = pdata.file_url;
  id = pdata.id;
}


const {
  data,
  error
} = await supabase
  .from('lyric_db')
  .update({
    titel: titel,
    interpret: interpret,
    album: album,
    jahr: jahr,
    img_url: img_url,
    file_url: file_url,
    id: id,
  }).eq('id', '0')


let {
  data: lyric_db,
  error
} = await supabase
  .from('lyric_db')
  .select(`titel, interpret, album, jahr, img_url, file_url, id`)

let t = `
<div class="mb-4">
 <input bind:value={***titel***} class="input" type="text" placeholder="titel"/>
</div>
<div class="mb-4">
 <input bind:value={***interpret***} class="input" type="text" placeholder="interpret"/>
</div>
<div class="mb-4">
 <input bind:value={***album***} class="input" type="text" placeholder="album"/>
</div>
<div class="mb-4">
 <input bind:value={***jahr***} class="input" type="text" placeholder="jahr"/>
</div>
<div class="mb-4">
 <input bind:value={***img_url***} class="input" type="text" placeholder="img_url"/>
</div>
<div class="mb-4">
 <input bind:value={***file_url***} class="input" type="text" placeholder="file_url"/>
</div>
<div class="mb-4">
 <input bind:value={***id***} class="input" type="text" placeholder="id"/>
</div>



<div class="mb-4">
<label for="x_titel" class="label">titel</label>
 <input bind:value={***titel***} class="input" type="text" placeholder="titel" id="x_titel" />
</div>
<div class="mb-4">
<label for="x_interpret" class="label">interpret</label>
 <input bind:value={***interpret***} class="input" type="text" placeholder="interpret" id="x_interpret" />
</div>
<div class="mb-4">
<label for="x_album" class="label">album</label>
 <input bind:value={***album***} class="input" type="text" placeholder="album" id="x_album" />
</div>
<div class="mb-4">
<label for="x_jahr" class="label">jahr</label>
 <input bind:value={***jahr***} class="input" type="text" placeholder="jahr" id="x_jahr" />
</div>
<div class="mb-4">
<label for="x_img_url" class="label">img_url</label>
 <input bind:value={***img_url***} class="input" type="text" placeholder="img_url" id="x_img_url" />
</div>
<div class="mb-4">
<label for="x_file_url" class="label">file_url</label>
 <input bind:value={***file_url***} class="input" type="text" placeholder="file_url" id="x_file_url" />
</div>
<div class="mb-4">
<label for="x_lyrics" class="label">lyrics</label>
 <input bind:value={***lyrics***} class="input" type="text" placeholder="lyrics" id="x_lyrics" />
</div>
 `;


const updates = {
  titel,
  interpret,
  album,
  jahr,
  img_url,
  file_url,
  id,
};

let {
  error
} = await supabase.from("lyric_db").upsert(updates, {
  returning: "minimal", // Don't return the value after inserting
});



  /*
  let titel = '';
  let interpret = '';
  let album = '';
  let jahr = '';
  let id = '';
  let img_url = '';
  let file_url = '';
  */

const getProfile = async () => {
  try {
    loading = true;
    const user = supabase.auth.user();

    let {
      data,
      error,
      status
    } = await supabase
      .from("profiles")
      .select(`username, website, avatar_url, img_url`)
      .eq("id", user.id)
      .single();

    if (error && status !== 406) throw error;

    if (data) {
      username = data.username;
      website = data.website;
      avatar_url = data.avatar_url;
      img_url = data.img_url;
      nwp_profil.set(data);
    }
  } catch (error) {
    alert(error.message);
  } finally {
    loading = false;
  }
};

const updateProfile = async () => {
  try {
    loading = true;
    const user = supabase.auth.user();

    const updates = {
      id: user.id,
      username,
      website,
      avatar_url,
      updated_at: new Date(),
    };

    let {
      error
    } = await supabase.from("profiles").upsert(updates, {
      returning: "minimal", // Don't return the value after inserting
    });

    if (error) throw error;
  } catch (error) {
    // setAlert(`Error Update: ${error.message}`, 1)
    alert(`Error Update: ${error.message}`, 1);
  } finally {
    loading = false;
  }
};