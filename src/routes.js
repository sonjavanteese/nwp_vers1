// @index(['./views/*.svelte', './views/**/*.js'], (f, _, e) => ` import ${_.pascalCase(f.name)} from '${f.path}${f.ext}';`)
 import AlbumEdit from './views/album-edit.svelte';
 import Album from './views/album.svelte';
 import LyricsEdit from './views/lyrics-edit.svelte';
 import Lyrics from './views/lyrics.svelte';
 import NotFound from './views/not-found.svelte';
 // import Songs from './views/songs.svelte';
 import Start from './views/start.svelte';
 import UserEdit from './views/user-edit.svelte';
 import User from './views/user.svelte';
// @endindex

export const routes = {
    '/': Start,
    '/lyrics': Lyrics,
    '/lyrics/:id': LyricsEdit,
    '/alben': Album,
    '/alben/:id': AlbumEdit,
    '/user': User,
    '/user/edit': UserEdit,
    '*': NotFound
}

/**
* @typedef {Object} AppNavigation
* @property {Navi[]} navi
*/
/**
* @typedef {Object} Navi
* @property {string} 0
* @property {string} 1
* @property {boolean} 2
* @property {boolean} 3
*/
export const navi = [
    ["/", "Start", true, false],
    ["/lyrics", "Lyrics", true, true],
    ["/alben", "Alben", true, true],
    ["/user", "User", true, true],
    ["/user/edit", "Edit Profil", false, true]
]

