## Info

This program should work with most browsers as well with most modern Mobile devices.

## Getting Started

```bash
npm install
```

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# Requirements for FluentSubtitle Demo

## Product Description

This is just a concept site which shows an idea of what FluentSubtitle could look like as a final product. This demo has a little functionality which allows you to add and remove subtitles. But it only saves them inside indexedDB.

## Functional Requirements

- [x] Start screen with button navigation for movie list and contact information.
- [x] Recieve metadata from the movieDatabase
- [x] Listing movies with data from api.
- [x] Sub page for movie including list of subtitles.
- [x] Sign up page with a fake form.
- [x] Setup a contact page.
- [x] Redo all file directory.
- [x] Move the api to a dedicated folder.
- [x] Add light and dark mode component.
- [x] Replace tailwind with vanilla css.
- [x] Use https://flagicons.lipis.dev/ to add flag icons.
- [x] Use https://placehold.co/ to replace none existing poster images.
- [x] Replace none existing dates to (Unknown).
- [x] Responsiveness on mobile devices.
- [x] Add ability to search for movies.
- [x] Create a form for adding subtitles.
- [x] Ability to add subtitles to indexedDB. (only possible to upload info about subtitles not actual subtitles itself)
- [x] Ability to show added subtitles for specified movie.
- [x] Ability to remove subtitles from indexedDB

NOTE TO SELF: I need to convert the subtitle file to base64 before uploading it to IndexedDB.

# Analysis

I've made it so that you can just start writing the code for the search input and it should work with the actual search bar because its not only visual its actually something that got an input and a select section for languages that will return a language code if selected. So the option to continue build from that is fully possible.
</br> </br>
There are a lot of improvements that i can do with this code for example I could make the site a lot more supportive on mobile devices, because right now it's all a mess when viewed on mobile.
</br> </br>
Moreover it would be optimal to have pictures of the different languages instead of emojis because its not fully supported on chrome browsers that run on windows because windows don't have any language emojis (flag emojis). As well it will look odd on for example a samsung phone because all the emojis over there are kind of shit when it comes to flags. I was thinking about using font awesome country flags but it's behind a paywall so i decided not to go for it. But a later approach would be to actually have our own webp pictures of country flags instead.

# Analysis 2024-05-16

Currently the software has a lot more functionality than before. Right now you can search for movies. Add, remove and list upp subtitles. The website is a lot more responsive than before as well it has a lot more accessibility features, this gives a lot better of an experience for most users.
</br></br>
There are a lot of improvements that I still need to work for. For example, the possibility to upload the actual subtitle itself. This requires to convert the subtitle into base64 to be able to save it as a string. and then whenever it gets downloaded it converts back into the original srt format. Furthermore, I could always create an api which handles the subtitle upload and download. However, I'm mainly focusing on creating a client concept rather than a fully working client. Other improvements that could be made is a more clear feedback for the user. Whenever something is going wrong or something happens. For example, whenever a user goes to the subtitle list page. It will display Waiting for search / Loading... Which would be better if I instead only said one or the other depending on what state the program is in. Other Improvements are the file structure. Because I feel like it's not really the best way to structure up the website.
</br></br>
Something that I would need to work a little more on is fixing the next/Image loading for the movie posters. so that they can be loaded a lot faster than what they are currently. More features that I could fix for quality of life. Is to add a feature which automatically detects the user if it prefers dark or light mode. Currently the search bar's flag options still doesn't do anything. But I'm planning on fixing it whenever I've actually found a way to upload and download the srt files properly. (Note the idea of the feature is to only get the results of the selected language. Example, if you select English it will only give you results of english subtitles.)
