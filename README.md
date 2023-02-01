QUICKSTART:
1. To begin, make sure your environment is setup locally: https://reactnative.dev/docs/environment-setup
2. Clone this repo: git clone git@github.com:dbarner1/rickAndMortyMobile.git
3. Navigate to the folder `cd rickAndMortyMobile`
4. Install node modules.  `npm install` from the root directory.
5. Install pods `cd ios && pod install`.
6. Navigate to the root folder `cd ..` and run the app `npm run ios`
7. To toggle to dark mode, type `CMD SHIFT A`.
8. Note: There is a list below for improvement to this app.

==============================

QUESTIONS:
1. How are you ensuring data consistency in your flatlist (e.g. not show duplicates) when dealing with paginated content?
- When we fetch any data from the RickAndMorty api we consider it suspect.  We do a reconciliation with the local state we store in async storage/CoreData.  Initially, the state is an empty array, so each item is passed in is considered new.  Once we refetch data onRefresh, we performe a check to see if the record is new.  The id of the object must not exist in our current state.  If it's new, we add it to the state.  If not, we ignore the record and js deletes it with garbage collection.  The primary key we're comparing with is the character's `id`, which we're assuming, as it isn't defined as primary in its documentation,: https://rickandmortyapi.com/documentation/#character-schema 

2. How would you ensure this flatlist remains fast with many objects to be displayed?
This is an important consideration.  Here are some things to keep in mind:
-  The `FlatList` component was used for its lazy loaded nature.  Generally speaking, if a piece of content isn't display on screen the element to render is'nt loaded in memory. (It's redux object is, to be clear, just not it's JSX element).  React Native handles loading these objects to memory when it renders on screen. 
- Similarly, content elements that've scrolled out of view are not preserved.  They're re-created based on our redux store data once they're scrolled back into view. 
- We've also provided a initialNumToRender prop to the flatlist, so it knows to only render 30 items on the first render.  This saves some milliseconds on first render of data.
- If we're showing images, we should consider FlashList from the Shopify team (https://shopify.github.io/flash-list/).  The FlatList runs on the UI thread, and gets us out of the performance bottlekneck that is the js thread.  Native for the win.
- If we have any calculations to do with the rendered item, we should wrap these suckers in a useMemo.  We don't want to recalculate them each time the view is created or destroyed by React. (on screen, off screen, as mentioned before).
- We've set the keyExtractor so React knows which cells are shown vs not.  This is especially helpful when objects are being injected or destroyed.

==============================

OTHER CODE CONSIDERATIONS (Not enough time budgeted)
Normally I'd do these things before I started coding this project, and before I pushed them to production:
1. The season breakdown couldn't be calculated given just the character's metadata.  If given about 20 min more time, I would've fetched each episode's data via https://rickandmortyapi.com/documentation/#get-multiple-episodes when performing the intial fetch of characters, and scrubbed the data to append the an array of [season: count] for consumption downstream in it's rendered item.  This would also get rid of episode calculation in the render item, even though it's memoed.
2. Move strings to a strings file for internationalization
3. Declare font sizes and weights in one place, and share style throughout the app similar to how color is currently defined.
4. Add babel module resolver
5. Configure eslint so it's useful.
6. Configure prettier so it's useful.
7. Add husky pre-commit checks
8. Add tests
9. isDarkMode should've been passed around using a context hook
10. Create ScreenWrapper component for StatusBar, SafeAreaView and to handle dark mode of container 
     and default padding on each page.
11. Header could be better designed for dark mode.
12. Code a real Splash screen
13. Code a real app icon
14. Hook up to CD
