# React Songwriter
Songwriting wep app built with MERN stack. I.e. MongoDB, Mongoose, Express, React, Redux, React Router, Node

I have built this project with the dual purpose of getting practice at various JS frameworks and producing the sort of app I myself would find useful! The app is meant primarily to serve songwriters, with the crux being that they are able to create new songs, write lyrics and 'paint' chords over the top of those lyrics.

With regards to those JS frameworks, it is worth bearing in mind that this is my first proper foray into server-side JS! Still, I think it's pretty solid – full-stack, here I come :raised_hands:

## Where am I with the project
On the front-end, the app currently consists of the following main React components:

* __Layout__
  * This is where the navigation and React Router stuff lives

* __SignIn/SignUp__
  * Does what it says on the tin, working front-end and back-end validation
  * Creates a session on the backend which impacts which API routes are authorised

* __Songbook__ (where users browse their/other's songs)
  * This is loosely modelled on browsing in Netflix
  * The user is presented with appropriate songs
    * I.e. A generic user can is presented public songs, a signed-in user can see their private songs as well.
  * Songs can be grouped by artist (default) or ungrouped
  * Artists/Songs can be ordered by:
    * Date Modified (default), date Created, or alphabetically
    * Each of these can be reversed
    * Clicking on an artist shows all the songs by that artist

* __Songsheet__ (for viewing/writing/editing songs)
  * Users can use 'lyrics mode' or 'chord mode'
  * In chord mode the user can write a chord via text input
  * click on lyrics to assign that chord by:
    * Line, word, or character (depending on which is selected)
    * __Note:__ This placeholder interaction is cumbersome compared to what I have in mind
  * Users can update song name or artist
  * Users can save
  * Users can toggle the song between being private and public
  * Users can rename song sections (I.e. a section could be 'Chorus' or 'Verse' or 'Awesome bit')
  * Users can move sections around within the song
  * Users can duplicate sections
    * This is very useful as all lyrics and chords are duplicated, so you could duplicate the first verse where all the chords are correct and then just alter the lyrics

* __Edit Modal__ (this is intended for generic use accross the app)
  * Used for initially giving a song a name and artist
  * Also used when renaming the song, artist, or section names within the Songsheet

On the back-end I have developed an API which the front-end makes requests to.
Essentially I have 3 Models: Artist, Song and User.
Routes primarily pertain to one of these Models, but may affect other documents.
E.g. Updating a song's author will remove the reference to that song in the old Author's songs array etc.
For non-trivial async, I have been using ES6 promises.

## A note on Redux and side-effects

During this project, I have realised (and then read prolifically) about the point of contention which is side-effects in Redux. I.e. when should they be allowed, where they should be situated in the Redux life-cycle, and which solution handles them best.

From my reading, redux-loops would be my preferred option – mostly because I would prefer my actions to be clean descriptors of what is going on my app. That said, you will no doubt notice that I am saldy using thunks, I will change this in due course, however so far I didn't want to get bogged down in rewriting my reducers and actions when I wanted to get going on the server-side stuff!

## What's next?

Now that I feel that my Controllers and Routes are fairly robust, I intend to improve interactions on the Songsheet, so that writing chords can be fluid. Within this I want to explore the idea that a user could create a custom chord 'palette', or perhaps use predefined palettes based on the key/circle of fifths.

Users should be able easily work with sections of the song that don't contain lyrics.

I also sorely need to create styling suitable for mobile.
