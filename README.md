## Info
For the best experience i recommend using Firefox browser because chromium browsers relies on that the computer have enough emojis which makes some emojis not display correctly. In a final product we will actually be using images instead of emojis.

## Getting Started

```bash
npm install
```

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

# Requirements for FluentSubtitle Demo

## Product Description
This is just a consept site which shows an idea of what FluentSubtitle could look like as a final product. This demo doesn't have any real functionality and is intended for viewing only. But feel free to modify the code in your own fork if you so please.

## Functional Requirements

- [X] Start screen with button navigation for movie list and contact information.
- [X] Recieve metadata from the movieDatabase
- [X] Listing movies with data from api.
- [X] Sub page for movie including list of subtitles.
- [X] Sign up page with a fake form.
- [X] Setup a contact page.


# Analysis
I've made it so that you can just start writing the code for the search input and it should work with the actual search bar because its not only visual its actually something that got an input and a select section for languages that will return a language code if selected. So the option to continue build from that is fully possible.
</br> </br>
There are a lot of improvements that i can do with this code for example I could make the site a lot more supportive on mobile devices, because right now it's all a mess when viewed on mobile. 
</br> </br>
Moreover it would be optimal to have pictures of the different languages instead of emojis because its not fully supported on chrome browsers that run on windows because windows don't have any language emojis (flag emojis). As well it will look odd on for example a samsung phone because all the emojis over there are kind of shit when it comes to flags. I was thinking about using font awesome country flags but it's behind a paywall so i decided not to go for it. But a later approach would be to actually have our own webp pictures of country flags instead.
